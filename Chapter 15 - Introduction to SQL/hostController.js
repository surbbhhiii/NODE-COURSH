const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  
  Home.findById(homeId)
    .then(([rows]) => {
      const home = rows[0];
      if (!home) {
        return res.redirect("/host/host-homes");
      }
      res.render("host/editHome", {
        home: home,
        pageTitle: "Edit Your Home",
        currentPage: "host-homes",
        editing: editing,
      });
    })
    .catch(err => console.log(err));
};

exports.getHostHomes = (req, res, next) => {
  
  Home.fetchAll()
    .then(([registeredHomes]) => {
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Homes List",
        currentPage: "host-homes",
      });
    })
    .catch(err => console.log(err));
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  
  home.save()
    .then(() => {
      res.render("host/homeAdded", {
        pageTitle: "Home Added Successfully",
        currentPage: "homeAdded",
      });
    })
    .catch(err => console.log(err));
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, location, price, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
    home.save()
    .then(() => {
     res.redirect("/host/host-homes");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/host/host-homes");
    });
  };
  

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.body.homeId; 
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch(err => console.log(err));
};