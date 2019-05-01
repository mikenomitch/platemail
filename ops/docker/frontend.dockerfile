# Dockerfile
FROM node:10.15.3-alpine

WORKDIR /usr/src/app

# COPY ./frontend/package*.json ./
COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "start_prod"]
