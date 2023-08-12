const requestBodyParser = require("../util/body-parser");
const writeFile = require("../util/write-file");
module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^([0-9]+|[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})$/i
    );
    if (!regexV4.test(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Validation Failed', message: 'ID is not valid' }));
    } else if (baseUrl === "/data/books/" && regexV4.test(id)) {
        try {
            let body = await requestBodyParser(req);
            const index = req.books.findIndex((book) => {
                return book.id === id
            });
            if (index === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ title: "Not Found", message: " Not found" }));
            } else {
                req.books[index] = { id ,...body};
                writeFile(req.books);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(req.books[index]));
            }
        }
        catch (err) {
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Validation Failed', message: 'Request body is not valid' }));
        }
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not found', message: 'Route not found' }));
    }
};