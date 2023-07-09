
#Definir archivo dockerfile para el servicio api_subscriber correspondiente a una aplicación de python
#Se define la imagen base
FROM python:3.7

#Se define el directorio de trabajo
WORKDIR /usr/src/app

#Se copia el archivo api_subscriber.py al directorio de trabajo
COPY ./api_subscriber/api_subscriber.py .

# Instalar ably==2.0.0b6
RUN pip install ably==2.0.0b6
# Instalar kafka-python
RUN pip install kafka-python

#Ejecutar el archivo api_subscriber.py
CMD ["python","-u", "./api_subscriber.py"]

