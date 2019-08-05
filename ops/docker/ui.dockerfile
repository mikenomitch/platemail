# Dockerfile
FROM node:10.16.0-alpine

# Installs latest Chromium (73) package.
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

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

# Puppeteer v1.12.2 works with Chromium 73.
RUN npm install -g puppeteer@1.12.2

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

# Run everything after as non-privileged user.
USER pptruser

RUN npm run build

EXPOSE 4000

CMD ["node", "app.js"]
