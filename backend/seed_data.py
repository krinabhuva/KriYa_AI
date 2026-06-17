import random
from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app import models, security

def seed():
    print("Dropping all existing database tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        print("Seeding users...")
        admin_user = models.User(
            email="admin@kriya.ai",
            username="admin",
            full_name="Admin User",
            hashed_password=security.hash_password("Admin1234!"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.admin,
        )
        
        analyst_user = models.User(
            email="analyst@kriya.ai",
            username="analyst",
            full_name="Analyst User",
            hashed_password=security.hash_password("Analyst1234!"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.analyst,
        )
        
        viewer_user = models.User(
            email="viewer@kriya.ai",
            username="viewer",
            full_name="Viewer User",
            hashed_password=security.hash_password("Viewer1234!"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.viewer,
        )
        
        db.add_all([admin_user, analyst_user, viewer_user])
        db.commit()
        db.refresh(admin_user)
        db.refresh(analyst_user)
        
        print("Seeding 20 inventory items across 5 categories...")
        categories = ["Electronics", "Apparel", "Food", "Tools", "Beauty"]
        item_details = {
            "Electronics": [
                ("Quantum Laptop", 1200.0, 800.0),
                ("Pro Screen 32", 450.0, 300.0),
                ("ANC Headphones", 180.0, 100.0),
                ("Smart Watch v5", 250.0, 150.0)
            ],
            "Apparel": [
                ("Flex Fit Jacket", 89.99, 40.0),
                ("Slim Denim Jeans", 59.99, 25.0),
                ("Activewear Tee", 29.99, 12.0),
                ("Woolen Scarf", 19.99, 8.0)
            ],
            "Food": [
                ("Organic Coffee Beans", 14.99, 6.0),
                ("Matcha Green Tea", 24.99, 10.0),
                ("Artisanal Chocolate", 9.99, 4.0),
                ("Gluten-Free Granola", 7.99, 3.0)
            ],
            "Tools": [
                ("Precision Screwdriver Set", 34.99, 15.0),
                ("Cordless Power Drill", 119.99, 65.0),
                ("Laser Measure Tool", 49.99, 25.0),
                ("Heavy Duty Toolbag", 39.99, 18.0)
            ],
            "Beauty": [
                ("Hydrating Face Serum", 45.0, 20.0),
                ("Clay Detox Mask", 28.0, 12.0),
                ("SPF 50 Sunscreen", 22.0, 9.0),
                ("Organic Lip Balm", 8.0, 3.0)
            ]
        }
        
        inventory_items = []
        sku_counter = 1
        for cat in categories:
            for name, price, cost in item_details[cat]:
                sku = f"SKU-{sku_counter:03d}"
                sku_counter += 1
                qty = random.randint(15, 150)
                reorder = random.randint(10, 25)
                
                item = models.InventoryItem(
                    sku=sku,
                    name=name,
                    description=f"Premium high-quality {name} in {cat} department.",
                    category=cat,
                    quantity=qty,
                    price=price,
                    cost=cost,
                    reorder_level=reorder,
                    supplier="Global Suppliers Inc.",
                    location=f"Aisle {random.randint(1, 15)}-Shelf {random.randint(1, 5)}",
                    created_by=analyst_user.id
                )
                db.add(item)
                inventory_items.append(item)
        db.commit()
        
        print("Seeding 90 days of sales records for each SKU with seasonality...")
        start_date = datetime.utcnow() - timedelta(days=90)
        sales_records = []
        for item in inventory_items:
            for day_offset in range(90):
                date = start_date + timedelta(days=day_offset)
                weekday = date.weekday()
                
                # Seasonality: weekends (5, 6) have higher demand
                if weekday in [5, 6]:
                    seasonality_factor = random.uniform(1.3, 1.8)
                else:
                    seasonality_factor = random.uniform(0.8, 1.2)
                
                base_qty = random.randint(1, 8)
                qty_sold = int(base_qty * seasonality_factor)
                if qty_sold == 0:
                    qty_sold = 1
                revenue = qty_sold * item.price
                
                record = models.SalesRecord(
                    date=date,
                    product_sku=item.sku,
                    quantity_sold=qty_sold,
                    revenue=revenue,
                    region=random.choice(["NA", "EMEA", "APAC", "LATAM"]),
                    channel=random.choice(["Direct", "Online", "Partner"])
                )
                sales_records.append(record)
        
        db.bulk_save_objects(sales_records)
        db.commit()
        
        print("Seeding 3 prediction models...")
        predictions = [
            models.Prediction(
                name="Sales Prediction Engine",
                model_type="LinearRegression",
                description="Core trend forecasting using linear regression.",
                target_variable="revenue",
                features=["date_ordinal"],
                accuracy=0.89,
                status="active",
                created_by=analyst_user.id
            ),
            models.Prediction(
                name="Seasonality Analyzer",
                model_type="ARIMA",
                description="Auto-regressive integrated moving average model for time-series forecasting.",
                target_variable="quantity_sold",
                features=["lag_1", "lag_7"],
                accuracy=0.82,
                status="active",
                created_by=analyst_user.id
            ),
            models.Prediction(
                name="Multi-factor Demand Predictor",
                model_type="XGBoost",
                description="Gradient boosted trees model for advanced demand prediction.",
                target_variable="quantity_sold",
                features=["price", "category", "channel", "day_of_week"],
                accuracy=0.94,
                status="draft",
                created_by=analyst_user.id
            )
        ]
        db.add_all(predictions)
        db.commit()
        
        print("Seeding 5 analytics reports...")
        reports = [
            models.Analytics(
                name="Q2 Sales Performance",
                description="Consolidated sales review for Q2",
                data_type="sales",
                metrics={"total_sales": 245000.0, "total_quantity": 4120, "average_order_value": 59.46},
                filters_applied={"region": "All"},
                period="monthly",
                start_date=datetime.utcnow() - timedelta(days=90),
                end_date=datetime.utcnow() - timedelta(days=60),
                created_by=analyst_user.id
            ),
            models.Analytics(
                name="Inventory Health & Valuation",
                description="Valuation and stock levels review",
                data_type="inventory",
                metrics={"total_valuation": 125430.0, "low_stock_count": 4, "healthy_items_pct": 80.0},
                filters_applied={"category": "All"},
                period="weekly",
                start_date=datetime.utcnow() - timedelta(days=7),
                end_date=datetime.utcnow(),
                created_by=analyst_user.id
            ),
            models.Analytics(
                name="APAC Channel Breakdown",
                description="Sales performance in APAC by channel",
                data_type="performance",
                metrics={"online_revenue": 42100.0, "partner_revenue": 18200.0, "direct_revenue": 12400.0},
                filters_applied={"region": "APAC"},
                period="monthly",
                start_date=datetime.utcnow() - timedelta(days=30),
                end_date=datetime.utcnow(),
                created_by=analyst_user.id
            ),
            models.Analytics(
                name="Electronics Reorder Report",
                description="Stock level warning report for Electronics",
                data_type="inventory",
                metrics={"critical_items": 2, "avg_days_to_stockout": 12},
                filters_applied={"category": "Electronics"},
                period="daily",
                start_date=datetime.utcnow() - timedelta(days=1),
                end_date=datetime.utcnow(),
                created_by=analyst_user.id
            ),
            models.Analytics(
                name="Year-to-Date Revenue Forecast",
                description="Projections for future revenue trends",
                data_type="performance",
                metrics={"projected_growth_pct": 14.5, "forecasted_year_end_rev": 1240000.0},
                filters_applied={},
                period="yearly",
                start_date=datetime.utcnow(),
                end_date=datetime.utcnow() + timedelta(days=180),
                created_by=analyst_user.id
            )
        ]
        db.add_all(reports)
        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()

if __name__ == "__main__":
    seed()
