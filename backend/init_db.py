"""
Database initialization script.
Run this to initialize the database with sample data.
"""
import sys
from app.database import SessionLocal, engine, Base
from app import models, security

def init_database():
    """Initialize database and create tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created")

def add_sample_data():
    """Add sample data to the database"""
    db = SessionLocal()
    
    try:
        # Check if admin user exists
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        if admin:
            print("✓ Sample data already exists")
            return
        
        print("Adding sample data...")
        
        # Create users
        admin_user = models.User(
            email="admin@kriya.ai",
            username="admin",
            full_name="Admin User",
            hashed_password=security.hash_password("admin123"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.admin,
        )
        
        analyst_user = models.User(
            email="analyst@kriya.ai",
            username="analyst",
            full_name="Analyst User",
            hashed_password=security.hash_password("analyst123"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.analyst,
        )
        
        viewer_user = models.User(
            email="viewer@kriya.ai",
            username="viewer",
            full_name="Viewer User",
            hashed_password=security.hash_password("viewer123"),
            is_active=True,
            is_verified=True,
            role=models.UserRole.viewer,
        )
        
        db.add(admin_user)
        db.add(analyst_user)
        db.add(viewer_user)
        db.commit()
        
        print(f"✓ Added users:")
        print(f"  - admin (admin123)")
        print(f"  - analyst (analyst123)")
        print(f"  - viewer (viewer123)")
        
        # Create sample inventory items
        items = [
            models.InventoryItem(
                sku="SKU001",
                name="Product A",
                description="Premium product A",
                category="Electronics",
                quantity=150,
                price=99.99,
                cost=50.00,
                reorder_level=20,
                supplier="Supplier A",
                location="Warehouse A",
                created_by=analyst_user.id,
            ),
            models.InventoryItem(
                sku="SKU002",
                name="Product B",
                description="Standard product B",
                category="Electronics",
                quantity=5,
                price=49.99,
                cost=25.00,
                reorder_level=30,
                supplier="Supplier B",
                location="Warehouse B",
                created_by=analyst_user.id,
            ),
            models.InventoryItem(
                sku="SKU003",
                name="Product C",
                description="Economy product C",
                category="Accessories",
                quantity=500,
                price=19.99,
                cost=8.00,
                reorder_level=100,
                supplier="Supplier C",
                location="Warehouse A",
                created_by=analyst_user.id,
            ),
        ]
        
        for item in items:
            db.add(item)
        db.commit()
        
        print(f"✓ Added {len(items)} inventory items")
        
        # Create sample predictions
        predictions = [
            models.Prediction(
                name="Sales Forecast",
                model_type="arima",
                description="Forecast sales for next month",
                target_variable="sales",
                features=["month", "day_of_week", "promotion", "price"],
                accuracy=0.87,
                status="active",
                created_by=analyst_user.id,
            ),
            models.Prediction(
                name="Demand Prediction",
                model_type="linear_regression",
                description="Predict demand based on historical data",
                target_variable="demand",
                features=["price", "competitor_price", "marketing_spend"],
                accuracy=0.82,
                status="draft",
                created_by=analyst_user.id,
            ),
        ]
        
        for pred in predictions:
            db.add(pred)
        db.commit()
        
        print(f"✓ Added {len(predictions)} prediction models")
        
        print("\n✅ Database initialization complete!")
        print("\nLogin credentials:")
        print("  Admin:    admin / admin123")
        print("  Analyst:  analyst / analyst123")
        print("  Viewer:   viewer / viewer123")
        
    except Exception as e:
        print(f"❌ Error adding sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    try:
        init_database()
        add_sample_data()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
