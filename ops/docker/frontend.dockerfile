# Dockerfile
FROM node:10.15.3-alpine

WORKDIR /usr/src/app

# COPY ./frontend/package*.json ./
COPY ./package*.json ./
RUN npm install

COPY ./ ./

# TODO: make it slightly less aggressive
RUN chmod 777 ./build_and_launch.sh

EXPOSE 4000

CMD ["npm", "run", "start_prod"]
