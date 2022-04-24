// export = {};
// const esClient = require("./connection.ts");

// const searchData = async () => {
//   const result = await esClient.search({
//     index: "words",
//     body: {
//       query: {
//         match: {
//           wrong_words: "베개 배게",
//         },
//       },
//     },
//   });
//   console.log("Search result:", result.body.hits.hits[0]._source);
//   //return result.body.hits.hits[0]._source;
//   return result;
// };

// module.exports = searchData();
