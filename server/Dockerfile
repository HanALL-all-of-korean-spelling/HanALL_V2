FROM node:14

WORKDIR /app

COPY ./package.json ./

RUN npm install

ENV NODE_PATH /app/node_modules/

COPY . .

ENTRYPOINT ["npm"]

CMD ["run", "start"]

