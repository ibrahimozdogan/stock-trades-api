FROM node:16-alpine

WORKDIR /stock-trades-api

COPY ./package.json .
COPY yarn.lock ./

RUN yarn

COPY . ./

EXPOSE 3333

CMD [ "yarn", "dev" ]
