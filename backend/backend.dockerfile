FROM openjdk:17-alpine
COPY --from=python:3.8.10 / /


WORKDIR /usr/src/app

COPY ./backend .

# Instalar las dependencias de Python
RUN pip install -r requirements.txt
# port where the Django app runs
EXPOSE 8000
# start server
CMD ["python3", "manage.py", "runserver"]








