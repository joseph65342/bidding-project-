const Web3 = require('web3');

const web3Obj = new Web3('http://localhost:8545');




const sendTransaction = (source, destination, value) => {
    console.log('sendTransaction method called..');

    return web3Obj.eth.sendTransaction({
        from: source,
        to: destination,
        value: value
    })
    .then(function(receipt){
        console.log(`Transaction sent successfully ${JSON.stringify(receipt, null, 4)}`);
        return Promise.resolve(receipt);
    })
    .catch(function (err) {
        console.log(`Transaction error ${err}`);

        return Promise.reject(err);
    })
}

module.exports = {
    sendTransaction
}