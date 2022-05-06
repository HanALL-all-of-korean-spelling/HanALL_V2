export = {};
const esClient = require("./connection.ts");

let index = "words";

const createIndex = async (index: String) => {
  try {
    await esClient.indices.create({ index });
    console.log(`Created  ${index} `);
  } catch (err) {
    console.log(`Creating ${index} error`);
    console.error(err);
  }
};

module.exports = createIndex;
