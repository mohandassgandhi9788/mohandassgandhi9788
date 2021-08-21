const http = require ("http");
const app = require ("./backend/app");


/* const server = http.createServer((req, res) => {
    res.end("<h1>Welcome to my 1st Node JS server<h1>");
});

server.listen(3000, () => {
    console.log("check port no, 3000");
}); */

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("check port no 3000");
});