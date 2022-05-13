const request = require("supertest");
const spellingRouter = require("../routes/spelling");
const app = require("../index");
const client = require("../connection.ts");

describe("GET /api/spellings", () => {
  test("return spellings", async () => {
    client;
    const response: any = await request(app).get("/api/spellings/search");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/spellings/search", () => {
  test("return search result", async () => {
    const response: any = await request(app).get("/api/spellings/search").send({
      text: "왠지",
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
