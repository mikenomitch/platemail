# Dockerfile
FROM node:10.16.0-alpine

RUN apk update && apk upgrade && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk add --no-cache \
  chromium \
  nss@edge \
  freetype@edge \
  harfbuzz@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install -g puppeteer@1.4

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 4000

CMD ["node", "app.js"]
