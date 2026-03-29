const { getDB } = require('../utils/databaseUtil');
const mongodb = require('mongodb');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = new mongodb.ObjectId(_id);
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      // एडिट के लिए: यहाँ _id के आधार पर अपडेट होगा
      return db.collection('homes').updateOne({ _id: this._id }, { $set: this });
    } else {
      // नए घर के लिए
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    return getDB().collection('homes').find().toArray();
  }

  static findById(homeId) {
    return getDB().collection('homes').findOne({ _id: new mongodb.ObjectId(homeId) });
  }

  static deleteById(homeId) {
    return getDB().collection('homes').deleteOne({ _id: new mongodb.ObjectId(homeId) });
  }
}