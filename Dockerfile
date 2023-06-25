FROM node:16.20.0-alpine AS build
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build:prod

FROM node:16.20.0-alpine AS node_modules
COPY package.json yarn.lock ./

RUN yarn install --prod

FROM node:16.20.0-alpine

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=build build /usr/src/app/build
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "node", "build/main.js" ]
