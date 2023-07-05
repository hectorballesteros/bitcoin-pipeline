#Definir archivo dockerfile para el servicio api_subscriber correspondiente a una aplicación de python
#Se define la imagen base
FROM python:3.7

#Se define el directorio de trabajo
WORKDIR /usr/src/app

#Se copia el archivo api_subscriber.py al directorio de trabajo
COPY ./load_data/load_data.py .

RUN pip install kafka-python

CMD ["python", "./load_data.py"]