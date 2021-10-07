var mongoose = require('mongoose');
var nftOwnershipSchema = new mongoose.Schema({
    contract_address: {
      type: String,
      required:true
    },
    symbol: {
      type: String,
      required:true
    },
    creater_address: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true
  }
);

mongoose.model('NftOwnership', nftOwnershipSchema);

module.exports = mongoose.model('NftOwnership', nftOwnershipSchema);