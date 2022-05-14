const esClient = require("./connection.ts");
const fs = require("fs");
import path from "path";
//const split = require("split2");
import split from "split2";
//const Data = require("../bulk.json");

const insertData = async () => {
  const datasetPath = path.join(
    __dirname,
    "..",
    "fixtures",
    "words-bulk.ndjson"
  );
  const datasource = fs.createReadStream(datasetPath).pipe(split());
  console.log("datasetPath=", datasetPath);
  console.log("datasource=", datasource);

  const result = await esClient.helpers.bulk({
    datasource,
    onDocument() {
      return {
        index: { _index: "words" },
      };
    },
  });
  console.log("result=", result);
};

export { insertData };

// const insertData = async () => {
//   try {
//     await esClient.index({
//       index: "words",
//       id: 1,
//       body: {
//         right_words: "베개",
//         wrong_words: ["배게", "배개", "베게"],
//         Description: "베개에 대한 설명",
//         Helpful_info: "쉽게 외우는 방법",
//         Related: 2,
//         Created_At: date_data,
//         Updated_At: date_data,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// const insertData = async () => {
//   try {
//     await esClient.index({
//       index: "words",
//       id: 2,
//       body: {
//         right_words: "왠지",
//         wrong_words: ["웬지"],
//         Description: "왠지에 대한 설명",
//         Helpful_info: "쉽게 외우는 방법",
//         Related: 3,
//         Created_At: date_data,
//         Updated_At: date_data,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// const insertData = async () => {
//   try {
//     await esClient.bulk({
//       index: "words",
//       body: Data,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = insertData;
