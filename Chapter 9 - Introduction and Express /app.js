//core module

const http = require('http');

//External module
const express = require('express');

//local module
const requestHandler = require('./user');
const app = express();

app.use("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
 //res.send("<p>Came from first Middleware</p>");
  next();
  });

  app.use("/", (req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("<p>Came from another Middleware</p>");

  });


  app.use("/submit-details", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<p>Welcome to Complete Coding Nodejs series</p>");
  });

const server = http.createServer(app);


const port = 3002;
server.listen(port, () => {
  console.log(`Server running on  address http://localhost:${port}`);
});
