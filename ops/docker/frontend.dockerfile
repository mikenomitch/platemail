# Dockerfile
FROM node:8.16.0-alpine

WORKDIR /usr/src/app

# COPY ./frontend/package*.json ./
COPY ./package*.json ./
RUN npm install

# COPY ./frontend ./
COPY ./ ./

# do this in prod!
RUN npm run build

EXPOSE 4000

CMD ["node", "app.js"]
