var express = require('express');
var router = express.Router();
var parser = require('../lib/nonDfuseParser')
let Web3 = require('web3');

 var debug = require('debug')('nft-backend-api:server');
let InputDataDecoder = require('ethereum-input-data-decoder');
var abi = require('../config').contract_abi;
var address = require('../config').contract_address
// let Trans = require('./Models/EthDetail');
let BlockNo = require('../models/Block');
let status=true;
let id;
var provider = 'https://rinkeby.infura.io/v3/be320cfb413e4f8e912e30480fcb7a98';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var blockno = 9413052;
var queries = require("../queries/queries");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'NFT' });
});
// router.get('/blockstart', function (req, res) {
//   processstart();
//   return res.status(200).send('process start');
//  })
router.get('/metaData/:contract_address/:token_id', async function(req, res, next) {
  console.log("this",req.params)
  if (!req.params || !req.params.contract_address || !req.params.token_id) return res.status(500).send("Invalid Inputs!");
  let contract_address = req.params.contract_address;
  let token_id = req.params.token_id;
  let result = await parser.getNftMetadata(contract_address, token_id);
  if(result.status) {
    let image_hash = result.data[0].image_hash;
    res.status(200).send({image:image_hash});
  }
  else {
    return res.status(500).send("No Data!");
  }
});

async function processstart() {   
  setInterval(() => {
      getAccountTransactions();
    }, 5000);

  }

  async function eventdata(events,tokenaddress,owner)
  {
    var myContract = new web3.eth.Contract(abi,tokenaddress);
    await myContract.methods.symbol().call({from:owner},async (error,symbol)=>{
    let set = {};
    set.contract_address = tokenaddress.toLowerCase();
    set.token_id = events.returnValues.tokenId;
    set.owner_address = events.returnValues.to.toLowerCase();
    set.symbol=symbol;
    // if (req.body.endpoint) set.endpoint = req.body.endpoint;
    // if (req.body.token) set.token = req.body.token;
  
    let info = await queries.mintNft1(set);
    })
   // console.log(i,(j+1))
   
  }

  async function getAccountTransactions() {
    let tokenaddress = await queries.nftContractByCreatorAddress();
    let network_info = await queries.getNetworkInfo('rinkbe');
   // console.log('getAccountTransactions',network_info)
    var result = [];
    var last_bno;
    
    tokenaddress.data.forEach((element,index) => {
    
      var myContract = new web3.eth.Contract(abi,element.contract_address);
    
  
    myContract.getPastEvents('Transfer', {
      fromBlock: network_info.msg.blockNumber+1,
      toBlock: 'latest'
    },async function(error, events){
      //console.log('events',events)
      for( let i=0;i< events.length;i++) {

        await eventdata(events[i],element.contract_address,element.creater_address);
        if(tokenaddress.data.length==(index+1))
        {
          await queries.updateListenerStatus('rinkbe',events[i].blockNumber)
        }
      } 
    
    });
    
   
   });
    
    }

    async function getAccountTransactions1(contract_address) {
      let tokenaddress = await queries.nftContractByCreatorAddress();
      let network_info = await queries.getNetworkInfo('rinkbe');
     // console.log('getAccountTransactions',network_info)
      var result = [];
      var last_bno;
      
     // tokenaddress.data.forEach((element,index) => {
      
        var myContract = new web3.eth.Contract(abi,contract_address);
      
    
      myContract.getPastEvents('Transfer', {
        fromBlock: 0,
        toBlock: 'latest'
      },async function(error, events){
        //console.log('events',events)
        for( let i=0;i< events.length;i++) {
  
          await eventdata(events[i],contract_address,tokenaddress.data.length,index);
          // if(tokenaddress.data.length==(index+1))
          // {
          //   await queries.updateListenerStatus('rinkbe',events[i].blockNumber)
          // }
        } 
      
      });
      
     
     //});
      
      }
 router.post('/importtoken', async function (req, res) {
  if (!req.body.contract_address) return res.status(500).send("Invalid Inputs.");
    
  // let set = {};
  // if (req.body.networkName) set.networkName = req.body.networkName;
  // if (req.body.blockNumber) set.blockNumber = req.body.blockNumber;
  // if (req.body.endpoint) set.endpoint = req.body.endpoint;
  // if (req.body.token) set.token = req.body.token;

  //let info = await queries.setListenerInfo(req.body.networkName, set);

  //if (info.status == false) return res.status(500).send(info.msg);

  getAccountTransactions1(req.body.contract_address);
  //return res.status(200).send("set");
    });

    router.post('/blockstart', async function (req, res) {
      if (!req.body || !req.body.networkName) return res.status(500).send("Invalid Inputs.");
    
      let set = {};
      if (req.body.networkName) set.networkName = req.body.networkName;
      if (req.body.blockNumber) set.blockNumber = req.body.blockNumber;
      // if (req.body.endpoint) set.endpoint = req.body.endpoint;
      // if (req.body.token) set.token = req.body.token;
    
      let info = await queries.setListenerInfo(req.body.networkName, set);
    
      if (info.status == false) return res.status(500).send(info.msg);
    
      processstart();
      return res.status(200).send("set");
    });
module.exports = router;