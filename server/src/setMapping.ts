export = {};
const esClient = require("./connection.ts");

let index = "words";

const setMapping = async () => {
  try {
    const schema = {
      right_words: {
        type: "text",
      },
      wrong_words: {
        type: "text",
      },
      Description: {
        type: "text",
      },
      Helpful_info: {
        type: "text",
      },
      Related: {
        type: "integer",
      },
      Created_At: {
        type: "date",
        format: "yyyy-MM-dd||yyyy/MM/dd||epoch_millis",
      },
      Updated_At: {
        type: "date",
        format: "yyyy-MM-dd||yyyy/MM/dd||epoch_millis",
      },
    };

    await esClient.indices.putMapping({
      index: index,
      type: index,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log("Mapping created successfully");
  } catch (err) {
    console.log("Mapping error");
    console.error(err);
  }
};

module.exports = setMapping;
