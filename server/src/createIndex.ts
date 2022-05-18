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
    type: "integer",
  },
  hits: {
    type: "integer",
  },
  scraps: {
    type: "integer",
  },
  created_at: {
    type: "date",
    format: "yyyy-MM-dd",
  },
};

const users_schema = {
  email: {
    type: "keyword",
  },
  pw: {
    type: "keyword",
  },

  nickname: {
    type: "keyword",
  },
  rank: {
    type: "keyword",
  },
  scraps: {
    type: "keyword",
  },
};

const board_schema = {
  title: {
    type: "text",
  },
  question: {
    type: "text",
  },
  answer: {
    type: "text",
  },
  name: {
    type: "text",
  },
  created_at: {
    type: "date",
    format: "yyyy-MM-dd",
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

const createBoardIndex = async () => {
  const index: String = "board";
  try {
    const index: String = "board";
    await esClient.indices.create({
      index: index,
      body: {
        mappings: {
          dynamic: true,
          properties: board_schema,
        },
      },
    });
    console.log(`Created ${index} index`);
  } catch (err) {
    console.log(`Creating ${index} index error`);
    console.error(err);
  }
};

export { createBoardIndex, createUsersIndex, createWordsIndex };
