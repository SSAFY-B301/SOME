# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update
RUN apt-get update && apt-get install -y python3-pip
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the FastAPI server
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "fast:app", "--host", "0.0.0.0", "--port", "8000"]
