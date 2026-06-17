from sqlalchemy.orm import Session
from datetime import datetime
import json

def log_audit_event(db: Session, user_id: int, action: str, resource_type: str, resource_id: int = None, changes: dict = None):
    """Log an audit event to the database"""
    from app import models
    try:
        audit_log = models.AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            changes=changes or {},
            created_at=datetime.utcnow()
        )
        db.add(audit_log)
        db.commit()
    except Exception as e:
        print(f"Failed to log audit event: {e}")
        db.rollback()
