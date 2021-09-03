var mongoose = require('mongoose');
var dbConfig = require('./config').dbConfig

mongoose.connection.on('connected', function() {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db(dbConfig.MONGOOSE_DBNAME);
    }
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        //console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});

mongoose.connect(dbConfig.MONGOOSE_CONNECTION_STRING, {dbName: dbConfig.MONGOOSE_DBNAME}, function(err, client) {
  if (err) {
     console.log("mongo error", err);
     return;
  }
});
