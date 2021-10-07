const Nft = require('../models/nft');
const NftOwnership = require('../models/nftOwnership');
const Basket =require('../models/basket');
// var _ = require('lodash');
// const { uuid } = require('uuidv4');

// var q = require('q');
// const { resolve } = require('q');

var queries = { 
  nftContractByCreatorAddress: function (creater_address) {
    return new Promise(function (resolve, reject) {
      NftOwnership.find({creater_address:creater_address}).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  mintNft: function (data) {
    return new Promise(function (resolve, reject) {
      Nft.create(data, function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  batchMintNft: function(data) {
    return new Promise(function (resolve, reject) {
      Nft.insertMany(data, function (error, res) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": res
        });
      });
    });
  },
  storeNftAddress: function (data) {
    return new Promise(function (resolve, reject) {
      NftOwnership.create(data, function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  getNftMetadata: function(contract_address, token_id) {
    return new Promise(function (resolve, reject) {
      Nft.find({contract_address:contract_address,token_id:token_id}).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        console.log("data is",data)
        return resolve({
          "status": true,
          "data": data
        });
      });
    });    
  },
  getAllNfts: function () {
    return new Promise(function (resolve, reject) {
      Nft.find().exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  nftsByOwnerAddress: function (owner_address) {
    return new Promise(function (resolve, reject) {
      Nft.find({owner_address:owner_address}).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  basketcreate: function (data) {
    console.log('basketcreate',data)
    return new Promise(function (resolve, reject) {
      Basket.create(data, function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  getAllNftsBaskets: function () {
    return new Promise(function (resolve, reject) {
      Basket.find().exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  tokenupdate: function (basketContract,tokens) {
    return new Promise(function (resolve, reject) {
      Basket.findOneAndUpdate(
        {
          basketContract: basketContract,
        },
        {
          $set: { tokens: tokens },
        }
      ).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  publishupdate: function (basketContract,basketPublishHash,basketPublishStatus) {
    return new Promise(function (resolve, reject) {
      Basket.findOneAndUpdate(
        {
          basketContract: basketContract,
        },
        {
          $set: { basketPublishHash: basketPublishHash,basketPublishStatus: basketPublishStatus },
        }
      ).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  ownerupdate: function (basketContract,currentOwner) {
    return new Promise(function (resolve, reject) {
      Basket.findOneAndUpdate(
        {
          basketContract: basketContract,
        },
        {
          $set: { currentOwner: currentOwner},
        }
      ).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
  liquidityupdate: function (basketContract,liquidated) {
    return new Promise(function (resolve, reject) {
      Basket.findOneAndUpdate(
        {
          basketContract: basketContract,
        },
        {
          $set: { liquidated: liquidated},
        }
      ).exec(function (error, data) {
        if (error) return resolve({
          "status": false,
          "data": error
        });
        return resolve({
          "status": true,
          "data": data
        });
      });
    });
  },
}
module.exports = queries;