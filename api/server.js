const express = require ('express');

const postsRouter = require('../data/posts-router')

const server = express();

server.use(express());

server.get("/", (req, res) => {
    res.send(`
        <h2>Hello</h2>
    `)
});

server.use(`/api/posts`, postsRouter)

module.exports = server;

