export = {};
const esClient = require("./connection.ts");

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let date_data = year + "-" + month + "-" + date;

const insertData = async () => {
  try {
    await esClient.index({
      index: "words",
      id: 1,
      body: {
        right_words: "베개",
        wrong_words: ["배게", "배개", "베게"],
        Description: "베개에 대한 설명",
        Helpful_info: "쉽게 외우는 방법",
        Related: 2,
        Created_At: date_data,
        Updated_At: date_data,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = insertData;
