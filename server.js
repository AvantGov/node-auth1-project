const express = require("express");

const application_router = require("./router/application_router");

const server = express();

server.use(express.json());
// server.use(application_router)
// ! make sure to add this back in when testing the endpoints!!! 

module.exports = server;