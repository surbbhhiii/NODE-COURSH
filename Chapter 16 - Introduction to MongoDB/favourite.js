const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {
  
  // 1. पसंदीदा घर जोड़ने के लिए (Add Function)
  static addToFavourite(homeId, callback) {
    const idStr = homeId.toString(); // MongoDB ID को String में बदलें

    Favourite.getFavourites(favourites => {
      // चेक करें कि क्या यह ID पहले से मौजूद है
      if (favourites.includes(idStr)) {
        if (callback) callback("Home is already marked favourite");
      } else {
        // अगर नहीं है, तो एरे में डालें और फाइल में सेव करें
        favourites.push(idStr);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (err) => {
          if (callback) callback(err);
        });
      }
    });
  }

  // 2. पसंदीदा लिस्ट पढ़ने के लिए
  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err) return callback([]);
      try {
        const favourites = JSON.parse(data);
        callback(Array.isArray(favourites) ? favourites : []);
      } catch (e) {
        callback([]);
      }
    });
  }


  static deleteById(id, callback) {
    const idStr = id.toString();
    Favourite.getFavourites(favourites => {
      const updatedFavourites = favourites.filter(favId => favId !== idStr);
      fs.writeFile(favouriteDataPath, JSON.stringify(updatedFavourites), (err) => {
        if (callback) callback(err);
      });
    });
  }
};