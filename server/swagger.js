const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "HanALL API",
      verssion: "1.0.0",
      description: "HanALL API with express",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./swagger/*"],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
