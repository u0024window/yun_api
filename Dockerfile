FROM node:18

WORKDIR /test_api

COPY ./* /test_api

RUN npm install

EXPOSE 8090

CMD ["node","./backend/router.mjs"]

