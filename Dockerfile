# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

RUN pip install fastapi
RUN pip install "uvicorn[standard]"
RUN pip install python-multipart
RUN pip install opencv-python

# Expose port 8000 for the FastAPI server
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "fast:app", "--host", "0.0.0.0", "--port", "8000"]
