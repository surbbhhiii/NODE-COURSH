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

  app.use(express.static(path.join(rootDir, 'public')));

  app.use((req, res, next) => {
    res.status(404).send("<h1>404 Your page is not found on airbnb</h1>");

    res.sendFile(path.join(rootDir, 'views', '404.html'));
  })




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

