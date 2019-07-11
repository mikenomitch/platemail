# Dockerfile
FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend ./

RUN npm run build

EXPOSE 4000

# TODO: build it and change "start_prod" to "start"

CMD ["npm", "run", "start_prod"]
