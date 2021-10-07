var mongoose = require('mongoose');
var basketSchema = new mongoose.Schema({
    userAddress: String, // -------->> represents the user who created the basket, which can be different from currentOwner
    currentOwner: String,
    basketID: String,
    basketName: String,
    basketPrice: Number,
    basketContract: String,
    basketCreationHash: String,
    basketCreationStatus: String,
    basketPublishHash: String,
    basketPublishStatus: String,
    tokens: [
      {
        type: Object,
        tokenaddress:String,
        tokenSymbol: String,
        tokenid: Number,
        approvehash:String,
        approvestatus:String,
        transferhash:String,
        transferStatus: String
      }
    ],
    liquidated: String,
    expiresAt: Number
  },
  {
    timestamps: true
  }
);

mongoose.model('Basket', basketSchema);

module.exports = mongoose.model('Basket', basketSchema);