const Nft = require('../models/nft');
const NftOwnership = require('../models/nftOwnership');
const Basket =require('../models/basket');
const BlockNo = require('../models/Block');
const Nftcurrentowner = require('../models/nftcurrentowner');
// var _ = require('lodash');
// const { uuid } = require('uuidv4');

// var q = require('q');
// const { resolve } = require('q');

var queries = { 
  nftContractByCreatorAddress1: function (creater_address) {
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
  nftContractByCreatorAddress: function () {
    return new Promise(function (resolve, reject) {
      NftOwnership.find().exec(function (error, data) {
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
  nftstokenByOwnerAddress: function (owner_address,contract_address) {
   // console.log(owner_address,contract_address)
    return new Promise(function (resolve, reject) {
      Nftcurrentowner.find({owner_address:owner_address,contract_address:contract_address}).exec(function (error, data) {
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
  updateListenerStatus: function (network_name, block_num) {
    BlockNo.findOneAndUpdate(
      { networkName: network_name },
      { $set: { blockNumber: block_num } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      function (err, doc) {
        if (err) { console.log("something wrong while updating data!", err); }
        console.log("block sync updated in db", doc.blockNumber);
       //token_queries.checkForTokenDistribution(doc.networkName, doc.blockNumber)
      });
  },

  getNetworkInfo: function (networkName) {
    return new Promise(function (resolve, reject) {
      BlockNo.findOne({
        networkName: networkName
      }, async function (err, doc) {
        if (err || !doc) return resolve({ status: false, msg: "network not found" });
        return resolve({ status: true, msg: doc });
      });
    });
  },

  setListenerInfo: function (networkName, set) {
    return new Promise(function (resolve, reject) {
      BlockNo.findOneAndUpdate({
        networkName: networkName
      }, {
          $set: set
        }, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }, function (err, doc) {
          if (err) return resolve({ status: false, msg: "Something wrong when updating data!" });
          return resolve({ status: true, msg: doc });
        });
    });
  },
  setnewListenerInfo: function (networkName, set) {
    return new Promise(function (resolve, reject) {
      BlockNo.create(set, function (err, doc) {
          if (err) return resolve({ status: false, msg: "Something wrong when updating data!" });
          return resolve({ status: true, msg: doc });
        });
    });
  },
  mintNft1: function (data) {
    return new Promise(function (resolve, reject) {
     // Nftcurrentowner.create(data, function (error, data) {
      Nftcurrentowner.findOneAndUpdate({
        contract_address: data.contract_address,token_id:data.token_id
      }, {
          $set: data
        }, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        },
        function (error, data) {
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