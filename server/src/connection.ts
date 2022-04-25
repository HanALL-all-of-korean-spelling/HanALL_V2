const { Client } = require("@elastic/elasticsearch");

const esHost = process.env.ES_HOST || "localhost";
const esUrl = "http://" + esHost + ":9200";

const esClient = new Client({ node: esUrl });

module.exports = esClient;
