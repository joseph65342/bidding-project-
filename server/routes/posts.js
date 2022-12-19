const express = require('express');
const cors = require('cors'); //required to get past an error
const blockchainAddresses = require('../modules/Accounts'); //import the Accounts module

const router = express.Router();
router.use(cors()); //have to use this to avoid an error




router.get('/account/addresses', function(req, res) {
    const getAddressData = async () => {
        const results = await blockchainAddresses.getAddresses();
        res.send(results); //call the getAddress() function from the Accounts module
    }

    getAddressData();
});






module.exports = router;