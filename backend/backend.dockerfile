FROM openjdk:8-jdk-alpine

WORKDIR /usr/src/app

COPY ./backend .
COPY wait-for-it.sh .

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Instalar las dependencias de Python
RUN apk add --no-cache python3-dev \
    && pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
# port where the Django app runs
EXPOSE 8000
# start server
CMD ["python3", "manage.py", "runserver"]








