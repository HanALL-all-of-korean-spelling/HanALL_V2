export = {};
const esClient = require("./connection.ts");

let index = "words";

const deleteIndex = async (index: String) => {
  try {
    await esClient.indices.delete({ index });
    console.log(`Deleted ${index}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteIndex;
