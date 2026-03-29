const Home = require("../models/home");

// 1. Add Home Page 
exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", { 
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing: false, 
  });
};

// 2. Post Add Home 
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  
  home.save()
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch(err => console.log(err));
};

// 3. Get Host Homes 
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll()
    .then((homes) => {
      res.render("host/host-home-list", {
        registeredHomes: homes,
        pageTitle: "Host Homes",
        currentPage: "host-homes",
      });
    })
    .catch(err => console.log(err));
};

// 4. Edit Home Page 
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; 

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.redirect("/host/host-homes");
      }
      res.render("host/editHome", { 
        home: home,
        pageTitle: "Edit Home",
        currentPage: "host-homes",
        editing: editing,
      });
    })
    .catch(err => console.log(err));
};

// 5. Post Edit Home 
exports.postEditHome = (req, res, next) => {
  const { homeId, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, homeId);
  
  home.save()
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch(err => console.log(err));
};

// 6. Delete Home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId; 
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch(err => console.log(err));
};