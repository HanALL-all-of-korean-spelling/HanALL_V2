const esClient = require("./connection.ts");

const nori = {
  analysis: {
    analyzer: {
      nori: {
        tokenizer: "nori_mixed",
      },
    },
    tokenizer: {
      nori_mixed: {
        type: "nori_tokenizer",
        decompound_mode: "mixed",
        user_dictionary_rules: ["왠", "웬"],
      },
    },
  },
};

const words_schema = {
  type: {
    type: "keyword",
  },
  right_words: {
    type: "text",
    analyzer: "nori",
  },
  wrong_words: {
    type: "text",
    analyzer: "nori",
  },
  title: { type: "text" },
  description: {
    type: "text",
  },
  helpful_info: {
    type: "text",
  },
  related: {
    properties: {
      id: {
        type: "keyword",
      },
      title: {
        type: "text",
      },
    },
  },
  hits: {
    type: "integer",
  },
  scraps: {
    type: "integer",
  },
  created_at: {
    type: "date",
  },
};

const users_schema = {
  email: {
    type: "keyword",
  },
  password: {
    type: "keyword",
  },
  nickname: {
    type: "keyword",
  },
  rank: {
    type: "keyword",
  },
  scraps: {
    properties: {
      spelling: {
        type: "keyword",
      },
      spacing: {
        type: "keyword",
      },
    },
  },
};

const questions_schema = {
  title: {
    type: "text",
  },
  question: {
    type: "text",
  },
  nickname: {
    type: "text",
  },
  user_id: {
    type: "text",
  },
  created_at: {
    type: "date",
  },
  answer_flag: {
    type: "boolean",
  },
};

const answers_schema = {
  answer: {
    type: "text",
  },
  question_id: {
    type: "text",
  },
};

const createWordsIndex = async () => {
  const index: String = "words";
  try {
    await esClient.indices.create({
      index: index,
      body: {
        settings: nori,
        mappings: {
          dynamic: true,
          properties: words_schema,
        },
      },
    });
    console.log(`Created ${index} index`);
  } catch (err) {
    console.log(`Creating ${index} index error`);
    console.error(err);
  }
};

const createUsersIndex = async () => {
  const index: String = "users";
  try {
    await esClient.indices.create({
      index: index,
      body: {
        mappings: {
          dynamic: true,
          properties: users_schema,
        },
      },
    });
    console.log(`Created ${index} index`);
  } catch (err) {
    console.log(`Creating ${index} index error`);
    console.error(err);
  }
};

const createQuestionsIndex = async () => {
  const index: String = "questions";
  try {
    await esClient.indices.create({
      index: index,
      body: {
        mappings: {
          dynamic: true,
          properties: questions_schema,
        },
      },
    });
    console.log(`Created ${index} index`);
  } catch (err) {
    console.log(`Creating ${index} index error`);
    console.error(err);
  }
};

const createAnswersIndex = async () => {
  const index: String = "answers";
  try {
    await esClient.indices.create({
      index: index,
      body: {
        mappings: {
          dynamic: true,
          properties: answers_schema,
        },
      },
    });
    console.log(`Created ${index} index`);
  } catch (err) {
    console.log(`Creating ${index} index error`);
    console.error(err);
  }
};

export {
  createQuestionsIndex,
  createAnswersIndex,
  createUsersIndex,
  createWordsIndex,
};
