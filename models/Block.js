var mongoose = require('mongoose');
var BlockSchema = new mongoose.Schema({
    networkName: String,
    blockNumber: Number,
},
    {
        timestamps: true
    });

mongoose.model('BlockNo', BlockSchema);
module.exports = mongoose.model('BlockNo', BlockSchema);