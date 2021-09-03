var mongoose = require('mongoose');
var nftSchema = new mongoose.Schema({
    contract_address: {
      type: String,
      required:true
    },
    token_id: {
      type: Number,
      required:true
    },
    image_hash: {
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

mongoose.model('Nft', nftSchema);

module.exports = mongoose.model('Nft', nftSchema);