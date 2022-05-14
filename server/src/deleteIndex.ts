const esClient = require("./connection.ts");

const deleteWordsIndex = async () => {
  const index: String = "words";
  try {
    await esClient.indices.delete({
      index: index,
    });
    console.log(`Deleted ${index} index`);
  } catch (err) {
    console.error(err);
  }
};

const deleteUsersIndex = async () => {
  const index: String = "users";
  try {
    await esClient.indices.delete({
      index: index,
    });
    console.log(`Deleted ${index} index`);
  } catch (err) {
    console.error(err);
  }
};

const deleteBoardIndex = async () => {
  const index: String = "board";
  try {
    await esClient.indices.delete({
      index: index,
    });
    console.log(`Deleted ${index} index`);
  } catch (err) {
    console.error(err);
  }
};

export { deleteWordsIndex, deleteUsersIndex, deleteBoardIndex };
