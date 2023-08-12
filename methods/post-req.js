const crypto = require("crypto");
const requestBodyParser = require("../util/body-parser");
const writeFile= require ("../util/write-file");
module.exports = async (req, res) => {
    if (req.url === "/data/books") {
        try {
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.books.push(body);
            writeFile(req.books);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end();

        }
        catch (err) {
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Validation Failed', message: 'Request body is not valid' }));

        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};