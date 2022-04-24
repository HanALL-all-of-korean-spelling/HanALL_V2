const { Client } = require("@elastic/elasticsearch");

const esHost = process.env.ES_HOST || "localhost";
const esUrl = "http://" + esHost + ":9200";

const esClient = new Client({ node: esUrl });

// let isConnected = false;
//   while (!isConnected) {
//     try {
//       const info = client.info();
//       console.log("Elasticsearch Connection Success");
//       // console.log("info=", info);
//       isConnected = true;
//     } catch (err) {
//       console.log("Elasticsearch Connection failed", err);
//     }
//   }

module.exports = esClient;

// const run = async () => {
//   let isConnected = false;
//   while (!isConnected) {
//     try {
//       //console.log("Connecting to Elasticsearch");
//       const info = await client.info();
//       console.log("Elasticsearch Connection Success");
//       // console.log("info=", info);
//       isConnected = true;
//     } catch (err) {
//       console.log("Connection failed", err);
//     }
//   }
// };

// run();

// const deleteIndex = async () => {
//   try {
//     await client.indices.delete({
//       index: "words",
//     });
//     console.log("Deleted index");
//   } catch (err) {
//     console.error(err);
//   }
// };

// deleteIndex();

// let index = "words";

// const createIndex = async (index: String) => {
//   try {
//     await client.indices.create({ index });
//     console.log(`Created  ${index} `);
//   } catch (err) {
//     console.log(`Creating ${index} error`);
//     console.error(err);
//   }
// };

//createIndex(index);

// const setMapping = async () => {
//   try {
//     const schema = {
//       right_words: {
//         type: "text",
//       },
//       wrong_words: {
//         type: "text",
//       },
//       Description: {
//         type: "text",
//       },
//       Helpful_info: {
//         type: "text",
//       },
//       Related: {
//         type: "integer",
//       },
//       Created_At: {
//         type: "date",
//         format: "yyyy-MM-dd||yyyy/MM/dd||epoch_millis",
//       },
//       Updated_At: {
//         type: "date",
//         format: "yyyy-MM-dd||yyyy/MM/dd||epoch_millis",
//       },
//     };

//     await client.indices.putMapping({
//       index: index,
//       type: index,
//       include_type_name: true,
//       body: {
//         properties: schema,
//       },
//     });

//     console.log("Mapping created successfully");
//   } catch (err) {
//     console.log("Mapping error");
//     console.error(err);
//   }
// };

//setMapping();

// let today = new Date();
// let year = today.getFullYear();
// let month = today.getMonth();
// let date = today.getDate();
// let date_data = year + "-" + month + "-" + date;

// const insertData = async () => {
//   try {
//     await client.index({
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

//insertData();

// const result = client.search({
//   index: "words",
//   body: {
//     query: {
//       match: {
//         wrong_words: "베개 배게",
//       },
//     },
//   },
// });

// console.log("Search result:", result);

// const Search = async () => {
//   const result = await client.search({
//     index: "words",
//     body: {
//       query: {
//         match: {
//           wrong_words: "베개 배게",
//         },
//       },
//     },
//   });

//   //console.log("Search result:", result.body.hits.hits);
//   console.log("Search result:", result.body.hits.hits[0]._source);
// };

//Search();

// app.get("/api/search", async (req: Request, res: Response) => {
//   try {
//     const result = await client.search({
//       index: "words",
//       body: {
//         query: {
//           match: {
//             wrong_words: "베개 배게",
//           },
//         },
//       },
//     });
//     res.json(result);
//     console.log("/api/search 성공");
//   } catch (err) {
//     console.error(err);
//     //next(err);
//   }
// });
