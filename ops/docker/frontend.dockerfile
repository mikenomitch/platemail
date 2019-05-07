# Dockerfile
FROM node:8.16.0-alpine

WORKDIR /usr/src/app

# COPY ./frontend/package*.json ./
COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 4000

# TODO: build it and change "start_prod" to "start"

CMD ["npm", "run", "start_prod"]
