const path = require('path');
const express = require('express');

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { mongoConnect } = require('./utils/databaseUtil'); // ✅ fix

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use("/host", hostRouter);
app.use("/", storeRouter);

app.use(errorsController.pageNotFound);


mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});
