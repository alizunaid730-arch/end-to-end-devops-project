const http = require("http");
const { spawn } = require("child_process");

let serverProcess;

beforeAll((done) => {
    serverProcess = spawn("node", ["server.js"], {
        env: { ...process.env, PORT: "3001" }
    });

    setTimeout(done, 1000);
});

afterAll(() => {
    serverProcess.kill();
});

test("GET /health should return healthy status", (done) => {
    http.get("http://localhost:3001/health", (res) => {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            expect(res.statusCode).toBe(200);
            expect(JSON.parse(data)).toEqual({
                status: "healthy"
            });

            done();
        });
    });
});