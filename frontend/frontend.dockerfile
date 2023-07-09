FROM node:18.16

WORKDIR /usr/src/app

COPY ./frontend .

# Instalar las dependencias del proyecto
RUN npm install


# Iniciar la aplicación al iniciar el contenedor
CMD ["npm", "run", "start"]
