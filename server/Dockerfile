FROM node:14

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm"]

CMD ["run", "start"]

