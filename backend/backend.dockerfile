FROM openjdk:8-jdk-alpine

WORKDIR /usr/src/app

COPY ./bitcoin_pipeline_backend .

# Instalar las dependencias de Python
RUN apk add --no-cache python3-dev \
    && pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN python3 ./manage.py sync_cassandra




CMD ["python3", "./manage.py", "sync_cassandra"]
CMD ["python3", "./manage.py", "runserver"]






