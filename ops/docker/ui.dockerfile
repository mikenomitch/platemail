# Dockerfile
FROM node:10.16.0-alpine

# Puppeteer deps required for server side rendering (see react-snap docs)
RUN apk update && apk upgrade && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk add --no-cache \
  chromium@edge=~73.0.3683.103 \
  nss@edge \
  freetype@edge \
  freetype-dev@edge \
  harfbuzz@edge \
  ttf-freefont@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install -g puppeteer@1.12.2

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build
RUN npm run pre_render

EXPOSE 4000

CMD ["node", "app.js"]
