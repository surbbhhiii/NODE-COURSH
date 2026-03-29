const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const MONGO_URL = 'mongodb://msurbhi202_db_user:surbhi123@ac-c3qbkd5-shard-00-00.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-01.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-02.c10x09s.mongodb.net:27017/?ssl=true&replicaSet=atlas-t6bdyr-shard-0&authSource=admin&appName=surbhiji';

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then(client => {
      _db = client.db('airbnb'); // Database object set kiya
      console.log('Connected to MongoDB successfully!');
      callback(); // Server start karne ke liye callback call kiya
    })
    .catch(err => {
      console.log('Error while connecting to Mongo: ', err);
      throw err;
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
};

// Exports ko module.exports ke tarike se likhna zyada safe hai
module.exports = {
  mongoConnect,
  getDB
};