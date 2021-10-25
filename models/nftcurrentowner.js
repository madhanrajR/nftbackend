var mongoose = require('mongoose');
var nftcurrentownerSchema = new mongoose.Schema({
    contract_address: {
      type: String,
      required:true
    },
    token_id: {
      type: Number,
      required:true
    },
    // image_hash: {
    //   type: String,
    //   required:true
    // },
    symbol: {
      type: String,
      required:true
    },
    owner_address: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true
  }
);

mongoose.model('Nftcurrentowner', nftcurrentownerSchema);

module.exports = mongoose.model('Nftcurrentowner', nftcurrentownerSchema);