FROM node

RUN mkdir /app

WORKDIR /app
CMD npm run serve:docker
