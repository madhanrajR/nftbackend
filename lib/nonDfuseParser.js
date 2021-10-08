var queries = require("../queries/queries");

var storeNftAddress = function (payload) {
    return new Promise(async function (resolve, reject) {
        let data = {
            contract_address: payload.contract_address,
            symbol: payload.symbol,
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

var nftContractByCreatorAddress1 = function (creater_address) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.nftContractByCreatorAddress1(creater_address);
        return resolve(res)
    })
}

var nftContractByCreatorAddress = function () {
    return new Promise(async function (resolve, reject) {
        let res = await queries.nftContractByCreatorAddress();
        return resolve(res)
    })
}

var nftsByOwnerAddress = function (owner_address) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.nftsByOwnerAddress(owner_address);
        return resolve(res)
    })
}

var basketcreate = function (payload) {
    console.log(payload)
    return new Promise(async function (resolve, reject) {
        let data = {
            userAddress: payload.userAddress, 
            currentOwner: payload.currentOwner,
            basketName: payload.basketName,
            basketPrice: payload.basketPrice,
            basketContract: payload.basketContract,
            basketCreationHash: payload.basketCreationHash,
            basketCreationStatus: payload.basketCreationStatus,
            basketPublishHash: payload.basketPublishHash,
            basketPublishStatus: payload.basketPublishStatus,
            tokens: payload.tokens,
            liquidated: payload.liquidated,
            expiresAt: payload.expiresAt
        }
        console.log(data)
        let res = await queries.basketcreate(data);
        return resolve(res)
    })
}

var getAllNftsBaskets = function () {
    return new Promise(async function (resolve, reject) {
        let res = await queries.getAllNftsBaskets();
        return resolve(res)
    })
}

var tokenupdate = function (basketContract,tokens) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.tokenupdate(basketContract,tokens);
        return resolve(res)
    })
}

var publishupdate = function (basketContract,basketPublishHash,basketPublishStatus) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.publishupdate(basketContract,basketPublishHash,basketPublishStatus);
        return resolve(res)
    })
}

var ownerupdate = function (basketContract,currentOwner) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.ownerupdate(basketContract,currentOwner);
        return resolve(res)
    })
}

var liquidityupdate = function (basketContract,liquidated) {
    return new Promise(async function (resolve, reject) {
        let res = await queries.liquidityupdate(basketContract,liquidated);
        return resolve(res)
    })
}

module.exports = {
    mintnft: mintnft,
    storeNftAddress: storeNftAddress,
    getAllNfts: getAllNfts,
    nftContractByCreatorAddress: nftContractByCreatorAddress,
    nftContractByCreatorAddress1: nftContractByCreatorAddress1,
    nftsByOwnerAddress: nftsByOwnerAddress,
    getNftMetadata:getNftMetadata,
    batchMintNft:batchMintNft,
    basketcreate: basketcreate,
    getAllNftsBaskets : getAllNftsBaskets,
    tokenupdate : tokenupdate,
    publishupdate:publishupdate,
    ownerupdate:ownerupdate,
    liquidityupdate : liquidityupdate
}