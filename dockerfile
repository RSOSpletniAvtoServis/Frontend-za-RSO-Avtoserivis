FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install mysql-connector-python
RUN pip install argon2-cffi
RUN pip install ariadne
RUN pip install graphene
RUN pip install grpcio grpcio-tools
RUN pip install requests
RUN pip install httpx

# Copy requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt