const http = require('http');
const getReq = require ("./methods/get-req");
const postReq =require ("./methods/post-req");
const putReq = require ("./methods/put-req");
const deleteReq = require ("./methods/delete-req");
let books = require ("./Data/books.json");

const server = http.createServer((req, res) => {
    req.books=books;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Not found', message: 'Route not found' }));
    }
})

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`server running on ${PORT}`));
