import logging
import json
import sys
import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class JsonFormatter(logging.Formatter):
    """
    Formatter that outputs JSON strings after parsing the LogRecord.
    """

    def format(self, record: logging.LogRecord) -> str:
        log_record = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
            "path": record.pathname,
            "line": record.lineno,
        }

        # Add extra fields if available
        if hasattr(record, "props") and isinstance(record.props, dict):
            log_record.update(record.props)

        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_record)


def setup_logger(
    name: str = "antigravity", level: str = "INFO", json_format: bool = True
) -> logging.Logger:
    """
    Sets up a logger with standard configuration.

    Args:
        name: Logger name.
        level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL).
        json_format: Whether to use JSON formatting (preferred for prod).
    """
    logger = logging.getLogger(name)
    logger.setLevel(os.getenv("LOG_LEVEL", level).upper())

    # Prevent duplicate handlers
    if logger.handlers:
        return logger

    handler = logging.StreamHandler(sys.stdout)

    if json_format or os.getenv("LOG_FORMAT", "text").lower() == "json":
        handler.setFormatter(JsonFormatter())
    else:
        handler.setFormatter(
            logging.Formatter(
                "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s"
            )
        )

    logger.addHandler(handler)
    return logger


# Example Usage
# logger = setup_logger()
# logger.info("Agent started", extra={"props": {"audit_id": "123"}})
