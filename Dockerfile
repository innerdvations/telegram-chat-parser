FROM node:15-alpine

WORKDIR /usr/src/app

ADD package.json /usr/src/app

ADD yarn.lock /usr/src/app

ADD . /usr/src/app 

RUN yarn install --frozen-lockfile 

CMD [ "yarn", "run", "dev-watch-poll"]
