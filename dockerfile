FROM mangart1995/rsosceleton:latest

WORKDIR /app
RUN pip install grpcio-health-checking prometheus-client