var express = require('express');
var router = express.Router();
// var queries = require('../queries/queries');
var parser = require('../lib/nonDfuseParser')

router.post('/storeNftAddress', async function (req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let {contract_address, creater_address } = req.body;
  if (!contract_address || !creater_address ) return res.status(500).send("Invalid Inputs!");
  let result = await parser.storeNftAddress(req.body);
  return res.status(200).send(result);
});

router.post('/mintNft', async function (req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let {contract_address, token_id, image_hash, owner_address} = req.body;
  if (!contract_address || !token_id || !image_hash || !owner_address) return res.status(500).send("Invalid Inputs!");
  let result = await parser.mintnft(req.body);
  return res.status(200).send(result);
});

router.post('/batchMintNft', async function (req, res, next) {
  if (!req.body || !req.body.batchNftDetail) return res.status(500).send("Invalid Inputs!");
  let result = await parser.batchMintNft(req.body.batchNftDetail);
  return res.status(200).send(result);
});

router.get('/getAllNfts', async function (req, res) {
  let result = await parser.getAllNfts();
  return res.status(200).send(result);
});

router.get('/nftContractByCreatorAddress', async function (req, res) {
  if (!req.query.creater_address) return res.status(500).send("Invalid Inputs!");
  let creater_address = req.query.creater_address;
  let result = await parser.nftContractByCreatorAddress(creater_address);
  return res.status(200).send(result);
});

router.get('/nftsByOwnerAddress', async function (req, res) {
  if (!req.query.owner_address) return res.status(500).send("Invalid Inputs!");
  let owner_address = req.query.owner_address;
  let result = await parser.nftsByOwnerAddress(owner_address);
  return res.status(200).send(result);
})

// router.get('/getAllNfts', async function (req, res) {
//   if (!req.query.batch_id) return res.status(500).send("Invalid Inputs!");
//   let { batch_id } = req.query;
//   console.log('id', batch_id);
//   let result = await queries.getMaterialWithOrder(batch_id);
//   return res.status(200).send(result);
// })

// router.get('/getAllEdCert', async function (req, res, next) {
//   if (req.query.limit) {
//     let result = await queries.getAllEdCert(parseInt(req.query.limit));
//     return res.status(200).send(result);
//   } else {
//     let result = await queries.getAllEdCert();
//     return res.status(200).send(result);
//   }
// })
module.exports = router;