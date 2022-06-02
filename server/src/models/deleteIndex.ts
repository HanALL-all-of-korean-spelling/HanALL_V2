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

const deleteQuestionsIndex = async () => {
  const index: String = "questions";
  try {
    await esClient.indices.delete({
      index: index,
    });
    console.log(`Deleted ${index} index`);
  } catch (err) {
    console.error(err);
  }
};

const deleteAnswersIndex = async () => {
  const index: String = "answers";
  try {
    await esClient.indices.delete({
      index: index,
    });
    console.log(`Deleted ${index} index`);
  } catch (err) {
    console.error(err);
  }
};

export {
  deleteWordsIndex,
  deleteUsersIndex,
  deleteQuestionsIndex,
  deleteAnswersIndex,
};
