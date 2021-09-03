var queries = require("../queries/queries");

var storeNftAddress = function (payload) {
    return new Promise(async function (resolve, reject) {
        let data = {
            contract_address: payload.contract_address,
            creater_address: payload.creater_address
        }
        console.log(data)
        let res = await queries.storeNftAddress(data);
        return resolve(res)
    })
}

var mintnft = function (payload) {
    return new Promise(async function (resolve, reject) {
        let data = {
            contract_address: payload.contract_address,
            token_id: payload.token_id,
            image_hash: payload.image_hash,
            owner_address: payload.owner_address
        }
        console.log(data)
        let res = await queries.mintNft(data);
        return resolve(res)
    })
}

var batchMintNft = function (payload) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.batchMintNft(payload);
        return resolve(res)
    })
}

var getNftMetadata = function (contract_address, token_id) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.getNftMetadata(contract_address, token_id);
        return resolve(res)
    })
}

var getAllNfts = function () {
    return new Promise(async function (resolve, reject) {
        let res = await queries.getAllNfts();
        return resolve(res)
    })
}

var nftContractByCreatorAddress = function (creater_address) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.nftContractByCreatorAddress(creater_address);
        return resolve(res)
    })
}

var nftsByOwnerAddress = function (owner_address) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.nftsByOwnerAddress(owner_address);
        return resolve(res)
    })
}

module.exports = {
    mintnft: mintnft,
    storeNftAddress: storeNftAddress,
    getAllNfts: getAllNfts,
    nftContractByCreatorAddress: nftContractByCreatorAddress,
    nftsByOwnerAddress: nftsByOwnerAddress,
    getNftMetadata:getNftMetadata,
    batchMintNft:batchMintNft
}