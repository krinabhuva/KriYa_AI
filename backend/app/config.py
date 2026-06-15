import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings and configuration"""

    # App info
    app_name: str = "KriyaAI"
    app_version: str = "1.0.0"
    debug: bool = os.getenv("DEBUG", "True").lower() == "true"

    # Server
    server_host: str = os.getenv("SERVER_HOST", "127.0.0.1")
    server_port: int = int(os.getenv("SERVER_PORT", 8000))

    # Database
    database_url: str = os.getenv(
        "DATABASE_URL", "sqlite:///./kriya_ai.db"
    )
    db_echo: bool = os.getenv("DB_ECHO", "False").lower() == "true"

    # JWT/Auth
    secret_key: str = os.getenv(
        "SECRET_KEY", "your-secret-key-change-in-production-please-change-this"
    )
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    # CORS
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
    ]
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ["*"]
    cors_allow_headers: list[str] = ["*"]

    # File upload
    upload_dir: str = os.getenv("UPLOAD_DIR", "./uploads")
    max_upload_size: int = 50 * 1024 * 1024  # 50 MB

    # Pagination
    default_page_size: int = 20
    max_page_size: int = 100

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
