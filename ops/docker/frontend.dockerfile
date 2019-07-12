# Dockerfile
FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 4000

CMD ["node", "app.js"]
