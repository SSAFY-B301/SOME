FROM bmltenabled/uvicorn-gunicorn-fastapi:python3.10-slim

WORKDIR /app

ENV APP_MODULE app.app:app

COPY requirements.txt /app

RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt
COPY ./ /app