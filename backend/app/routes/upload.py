from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
import pandas as pd
import io
from datetime import datetime

from app.database import get_db
from app import models, schemas, security
from app.audit import log_audit_event

router = APIRouter(prefix="/api/upload", tags=["upload"])


@router.post("/sales-csv")
async def upload_sales_csv(
    file: UploadFile = File(...),
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db)
):
    """Upload sales time-series data from a CSV file"""
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Only CSV files are allowed."
        )

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error reading CSV file: {str(e)}"
        )

    required_cols = {"date", "product_sku", "quantity_sold", "revenue"}
    missing_cols = required_cols - set(df.columns)
    if missing_cols:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Missing required columns: {', '.join(missing_cols)}"
        )

    # Validate that SKUs exist
    existing_skus = set(sku[0] for sku in db.query(models.InventoryItem.sku).all())

    inserted = 0
    skipped = 0
    errors = []
    sales_records = []

    for index, row in df.iterrows():
        sku = str(row["product_sku"]).strip()
        if sku not in existing_skus:
            skipped += 1
            errors.append(f"Row {index+2}: SKU '{sku}' does not exist in inventory.")
            continue

        raw_date = row["date"]
        try:
            parsed_date = pd.to_datetime(raw_date).to_pydatetime()
        except Exception:
            skipped += 1
            errors.append(f"Row {index+2}: Invalid date format '{raw_date}'.")
            continue

        try:
            qty = int(row["quantity_sold"])
            rev = float(row["revenue"])
            if qty < 0 or rev < 0:
                raise ValueError("Quantity and revenue must be non-negative.")
        except Exception as e:
            skipped += 1
            errors.append(f"Row {index+2}: Invalid numeric quantity or revenue: {str(e)}")
            continue

        region = str(row["region"]).strip() if "region" in df.columns and not pd.isna(row["region"]) else "Global"
        channel = str(row["channel"]).strip() if "channel" in df.columns and not pd.isna(row["channel"]) else "Direct"

        record = models.SalesRecord(
            date=parsed_date,
            product_sku=sku,
            quantity_sold=qty,
            revenue=rev,
            region=region,
            channel=channel
        )
        sales_records.append(record)

    if sales_records:
        try:
            db.bulk_save_objects(sales_records)
            db.commit()
            inserted = len(sales_records)
            log_audit_event(
                db=db,
                user_id=current_user.id,
                action="UPLOAD_SALES_CSV",
                resource_type="sales_records",
                resource_id=None,
                changes={"inserted": inserted, "skipped": skipped, "errors_count": len(errors)}
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database insertion failed: {str(e)}"
            )

    return {
        "inserted": inserted,
        "skipped": skipped,
        "errors": errors
    }
