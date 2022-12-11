FROM node:18.6-alpine

EXPOSE 8080

WORKDIR /app

COPY ./package.json ./

RUN npm install

ENV NODE_PATH /app/node_modules/

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]