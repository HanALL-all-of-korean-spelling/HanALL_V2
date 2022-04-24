export = {};
const esClient = require("./connection.ts");

const conCheck = () => {
  let isConnected: Boolean = false;
  while (!isConnected) {
    try {
      const info = esClient.info();
      console.log("Elasticsearch Connection Success");
      // console.log("info=", info);
      isConnected = true;
    } catch (err) {
      console.log("Elasticsearch Connection failed", err);
    }
  }
};

module.exports = conCheck();
