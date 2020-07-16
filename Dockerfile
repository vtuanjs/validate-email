FROM node:12.16.1-alpine
WORKDIR /usr/src/app
COPY ["package.json", "./"]
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install --production \
    && apk del build-dependencies
COPY . .
EXPOSE 3000
CMD node main.js