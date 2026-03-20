//core module
const path = require('path');

//external module
const express = require('express');

//local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const app = express();


//app.use((req, res, next) => {
 // console.log(req.url, req.method);
  //next();
  //})


  app.use(express.urlencoded());

  app.use(userRouter);
  app.use("/host", hostRouter);

  app.use((req, res, next) => {
    res.status(404).send("<h1>404 Your page is not found on airbnb</h1>");

    res.sendFile(path.join(rootDir, 'views', '404.html'));
  })

//app.get("/", (req, res, next) => {
  //console.log(req.url, req.method);
 // res.send(`
    //"<h1> Welcome to airbnb </h1>
   // <a href="/host/add-home">Add Home</a>
 //   `);
//})

//app.get("/host/add-home", (req, res, next) => {
  //console.log(req.url, req.method);
 // res.send(`
   // <h1> Register your home here: </h1>
   // <form action="/host/add-home" method="POST">
    //  <input type="text" name="houseName" placeholder="Enter your name of your house" />
     // <input type="submit"/>
     // </form>
   // `);
//})

  //app.post("/host/add-home", (req, res, next) => {
   // console.log(req.body);
   // res.send(`
      //<h1> Home Registered successfully </h1>
     // <a href="/">Go to Home</a>
      
    //`);
//})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

