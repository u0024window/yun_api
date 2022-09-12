FROM node:18

WORKDIR /test_api

#COPY ./* /test_api
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8090

CMD ["node","./backend/router.mjs"]

