//core module
const path = require('path');


//external module
const express = require('express');
const userRouter = express.Router();

//local module
const { registeredHomes } = require('./hostRouter');


userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
});



 


  module.exports = userRouter;