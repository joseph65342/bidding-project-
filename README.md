Requirements

Problem Statement: Auctions are still popular around the world.  With the rapidly everchanging world thanks to the advancements in technology, new ways of holding auctions can be explored.

Goals: To be able to incorporate a full stack application with a smart contract to demonstrate how to integrate functions and state from a smart contract with UI.

Stakeholders: Any company interested in utilizing a blockchain with an online auction.  In person auctions are outdated given the leverages that blockchain brings like anonymity, speed, transparency, etc.  

Restrictions/rules: Cannot add a bid if the auction time has ended, cannot add a bid if the value of the bid is zero, amount the user is trying to bid needs to be greater than the current highest bid, after the auction is over the highest bidder cannot withdraw their ether back into their accounts, only the other bidders who didn’t win the auction can withdraw ether from the smart contract back into their accounts.

Data: Generally speaking, the data that would be required is the blockchain node addresses and their respective ether balances. 

Exceptions: Originally, I was planning on incorporating metamask so that the user would have to sign into their metamask account in order to interact with the application.  However, given that this would require multiple metamask accounts just to test out the functionality of the application, it didn’t seem practical for the assignment.  Therefore, I have made a screen which just lists out a list of blockchain node addresses from hardhat, and these accounts will be used to interact with the auction smart contract.  If I were to take this project a step further in the future, I would try to incorporate a way for the user to have to sign into their metamask account, so that there wouldn’t be access to other accounts in the application.

User Stories: 1) As a bidder I want to be able to place a bid so that I can potentially own real estate.  2) As a bidder I want to be able to withdraw ether so that I can get back my ether if I didn’t win the auction.

Architecture

Project Description: An application which simulates an online auction using a blockchain.  The auction would require multiple user blockchain addresses.  Each user would be able to input a value into a form, specifying how much ether they are willing to put in the auction.  The application would keep track of each user’s ether they’ve put in, and who is currently the leading bidder.

Top Level Description: An application which simulates an online auction using a blockchain.

Data: Data required is the blockchain node addresses and their respective ether balances.

Functions – Inputs/Outputs: 
1)	function putBid:
inputs: one unit variable, one address variable.
outputs: no output, just updates state variables.
2)	function HighestBid:
inputs: none.
outputs: the value of the highest bid.
3)	function HighestBidder:
inputs: none.
outputs: the blockchain address of the highest bidder.
4)	function TotalBid: 
inputs: one address variable.
outputs: the total bid of a particular blockchain address(user).
5)	function withdrawBid:
inputs: one payable address variable.
outputs: no output, just transfers the ether back into a user’s account if they weren’t the highest bidder.
6)	function getTimeLeft:
inputs: none.
outputs: the remaining time before the auction closes.  Once closed the putBid function will no longer work.

Flow Diagrams:

<img width="316" alt="flow_diagram" src="https://user-images.githubusercontent.com/114844472/208344306-10e33dcc-ddeb-404b-85c9-9c6a612363c0.png">


<img width="348" alt="flow_diagram2" src="https://user-images.githubusercontent.com/114844472/208344314-4d7e2b9e-543a-4fa1-a18e-607c3d1599f0.png">

 

Tech Stack: React JS, Express, Node JS, Web3 JS, Hardhat.

Project Plan

Breakdown of tasks: 1) create a react project, 2) install necessary dependencies for frontend, 3) install necessary dependencies for backend, 4) install hardhat, 5) create a smart contract file and write the necessary code for the auction, 6) edit the deploy.js file in the scripts folder so that the new auction contract can be deployed, 7) Create a folder called ‘utils’ in the src folder and copy and paste the auction contract json file from the contracts folder into here, 8) create a file called ‘constants.js’ that will have two variables, one variable will hold the auction contract abi and the other will hold the contract address which can be found by running the command ‘npx hardhat run scripts/deploy.js --network localhost’.  9) Write the necessary code for the backend (routes), 10) Write the necessary code for the frontend (components, navigation, connecting to web3, state, functions, css, etc).

Time Estimate per Task: 1) Around one minute, 2) a few minutes, 3) a few minutes, 4) a few minutes, 5) multiple days depending on any issues that come about, 6) a few minutes, 7) less than a minute, 8) a few minutes, 9) roughly an hour, 10) multiple days.

Tasks assigned to roles/people: Since I’m working on this project on my own all the tasks are assigned to myself.

Dependencies: hardhat, express, body-parser, axios, cors, web3, react-router-dom.

Length of time to complete: Due to working on it alone and other daily obligations it will probably take all the way until Sunday.  It mostly depends on any issues faced during development.

Gantt Chart: 
December 9th – December 10th: Deciding on a use case to choose for the project.
December 10th – December 11th: Planning out the smart contract and researching how to integrate smart contract with frontend.
December 11th – December 13th: Writing out the smart contract. 
December 13th – December 14th: Create react project and install all dependencies for frontend, backend, and hardhat.
December 14th – December 18th: Connect smart contract to frontend, write the necessary code for backend and frontend.  Submit on github.

Smart Contract

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

Web Interface

Instructions to install and run: 

General Information:

Student - Joseph R

Sometimes windows creates duplicate folders so if there is two folders, make sure you're in the second one.

I have a folder for the server related code, a folder for the hardhat related code, but for the frontend there's no folder
called frontend, all the frontend related code is just under the root folder.

In total, for the whole app to run there should be four terminals running.  

--------------------------------

Server Information:

Step 1) Command line into the server folder

Step 2) Run the command npm install to get node_modules for the server folder

Step 3) Run the command node app.js

----------------------------------

Hardhat Information:

Step 1) Open another terminal

Step 2) Command line into the hardhat-ethereum folder

Step 3) Run the command npm install to get node_modules for the hardhat-ethereum folder

Step 4) Run the command npx hardhat node

Step 5) Open another terminal 

Step 6) Command line into the hardhat-ethereum folder

Step 7) Run the command npx hardhat run scripts/deploy.js --network localhost

----------------------------------

Frontend Information:

Step 1) Open another terminal

Step 2) Run the command npm install to get node_modules for the front end part of the assignment

Step 3) Run the command npm start

Photos:

<img width="1248" alt="pic1" src="https://user-images.githubusercontent.com/114844472/208343941-90bb2d2c-7cdb-4479-89df-efe477fca3d2.png">

<img width="1248" alt="pic2" src="https://user-images.githubusercontent.com/114844472/208343970-d65669ec-ed95-400e-be1f-f5957a8faae2.png">

<img width="1248" alt="pic3" src="https://user-images.githubusercontent.com/114844472/208343974-fb7e35ca-fb59-42b7-b6e5-fd88d6c3f6cb.png">

<img width="1248" alt="pic4" src="https://user-images.githubusercontent.com/114844472/208343989-4209d4d9-9161-4133-8969-f6796e50fa94.png">

<img width="1248" alt="pic5" src="https://user-images.githubusercontent.com/114844472/208343999-4b0d0156-d184-4bc1-967b-2da5c10844cd.png">

<img width="1248" alt="pic6" src="https://user-images.githubusercontent.com/114844472/208344021-062c6e6a-c6af-4de9-bf47-b76a827e3e6b.png">

<img width="1248" alt="pic7" src="https://user-images.githubusercontent.com/114844472/208344030-c27b45aa-da9f-4cec-960f-03a841fd0b80.png">

<img width="1248" alt="pic8" src="https://user-images.githubusercontent.com/114844472/208344047-0db1ecbe-73cd-436c-8155-2eeecec86c1c.png">

<img width="1248" alt="pic9" src="https://user-images.githubusercontent.com/114844472/208344057-a04b0cba-b577-46e3-8be4-f51928611679.png">

<img width="1248" alt="pic10" src="https://user-images.githubusercontent.com/114844472/208344074-b4940c98-e147-43eb-b25a-24265deb1cbd.png">






