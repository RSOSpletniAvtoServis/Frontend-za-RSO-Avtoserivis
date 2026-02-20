FROM mangart1995/rsosceleton:latest

WORKDIR /app
COPY requirements.txt .
RUN pip install grpcio-health-checking prometheus-client