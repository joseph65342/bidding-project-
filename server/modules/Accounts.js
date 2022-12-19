var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');


const getAddresses = async () => {
    
    const accounts = await(web3.eth.getAccounts());
    return accounts;

}




module.exports = {
    getAddresses
}