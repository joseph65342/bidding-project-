// SPDX-License-Identifier: MIT

pragma solidity >0.4.0 <0.9.0;

contract AuctionContract {
    mapping(address => uint) biddersData;
    uint highestBidAmount;
    address highestBidder;


    uint startTime;
    uint endTime;
    address owner;
    bool auctionEnded = false;

    address currentAddress;



    constructor() {
        owner = msg.sender;
        biddersData[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = 0;
        biddersData[0x70997970C51812dc3A010C7d01b50e0d17dc79C8] = 0;
        biddersData[0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC] = 0;
        biddersData[0x90F79bf6EB2c4f870365E785982E1f101E93b906] = 0;
        biddersData[0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65] = 0;
        biddersData[0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc] = 0;
        biddersData[0x976EA74026E726554dB657fA54763abd0C3a0aa9] = 0;
        biddersData[0x14dC79964da2C08b23698B3D3cc7Ca32193d9955] = 0;
        biddersData[0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f] = 0;
        biddersData[0xa0Ee7A142d267C1f36714E4a8F75612F20a79720] = 0;
        biddersData[0xBcd4042DE499D14e55001CcbB24a551F3b954096] = 0;


        startTime = block.timestamp-10;
        endTime = block.timestamp+200;


    }

    //put new bid
function putBid(uint amount, address _address) public whenOpen payable {
    //verify value is not zero
    uint calculateAmount = amount;
 
    require(amount>0,"Bid amount cannot be zero");
    //check highest bid 
    require(calculateAmount>highestBidAmount,"Highest Bid already present");
    biddersData[_address] = calculateAmount;
    highestBidAmount = calculateAmount;
    highestBidder = msg.sender;
}


//get Highest BidAmount
function HighestBid() public view returns(uint) {
    return highestBidAmount;
}

//get Highest Bidder Address
function HighestBidder() public view returns(address){
    return highestBidder;
}

//get total bid
function TotalBid(address _address) public view returns(uint) {
    return biddersData[_address];
}





modifier whenOpen() {
    require(block.timestamp > startTime && block.timestamp <= endTime, "Time is up!  Auction is over.");
    _;
}

//withdraw bid
function withdrawBid(address payable _address) public {
    if(biddersData[_address]>0) {
        require(_address != highestBidder, "The highest bidder cannot withdraw");
        _address.transfer(biddersData[_address]);
    }
} 



function getTimeLeft() public view returns(uint) {
    return endTime-block.timestamp;
}




}