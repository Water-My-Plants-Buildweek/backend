const Plants = require("./usersModel");
const db = require("../database/dbConfig");
const server = require("../api/server");

const supertest = require("supertest");

describe("environment", function () {
    it("should be using the testing database", function () {
        expect(process.env.DB_ENV).toBe("testing");
    });
});

describe("Not found", () => {
    describe("POST /api/register", () => {
        it("Should return error 404 if missing username", () => {
            const newData = { username: "", password: "test" };
            return supertest(server)
                .post("/api/register")
                .send(newData)
                .then((res) => {
                    expect(res.status).toBe(404);
                });
        });
    });
});
