let registeredHomes = [];
let favouriteHomes = [];

module.exports = class Home {
  constructor(houseName, location, price, rating, photoUrl) {
    // Har naye home ko ek unique ID milegi
    this.id = Math.random().toString(); 
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    registeredHomes.push(this);
  }

  static fetchAll(callback) {
    //this.id = Math.random().toString();
    callback(registeredHomes);
  }

  static addToFavourite(id) {
    // Yahan hum check kar rahe hain ki kya ID sahi mil rahi hai
    const home = registeredHomes.find(h => h.id === id);
    if (home && !favouriteHomes.find(h => h.id === id)) {
      favouriteHomes.push(home);
    }
  }

  static getFavourites(callback) {
    callback(favouriteHomes);
  }

 static findById(homeId, callback) {
  this.fetchAll(homes => {
  const homeFound = homes.find(home => home.id === homeId);
  callback(homeFound);

  })

 }

};