var express = require('express');
var router = express.Router();
var parser = require('../lib/nonDfuseParser')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'NFT' });
});

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

module.exports = router;