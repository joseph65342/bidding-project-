import React from "react";
import Web3 from 'web3';
import { contractAbi, contractAddress } from '../utils/constants';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const web3 = new Web3("ws://localhost:8545");
const auctionContract = new web3.eth.Contract(contractAbi, contractAddress);


const Transfer = () => {

    const {stringValue} = useLocation().state;
    


    const [amount, setAmount] = useState();

   

    const [highestBid, setHighestBid] = useState(0);

    const [highestBidder, setHighestBidder] = useState('no one so far');


    const [timeLeft, setTimeLeft] = useState();

    const [address, setAddress] = useState();

    const [bid, setBid] = useState(0);


    useEffect(() => {
      setAddress(stringValue);
      
    });
  

    


    const handleChange = event => {
      setAmount(event.target.value);
    };

    const HighestBid = async() => {
      const highest_bid = await auctionContract.methods.HighestBid().call();
      setHighestBid(highest_bid);
      console.log('Highest Bid is: ' + highest_bid);
    }

    const HighestBidder = async() => {
      const highest_bidder = await auctionContract.methods.HighestBidder().call();
      setHighestBidder(highest_bidder);
      console.log('Highest Bidder is: ' + highest_bidder);
    }

    const TotalBid = async() => {
      var total_bid = await auctionContract.methods.TotalBid(address).call();
      setBid(total_bid);
      console.log('Total bid is: ' + total_bid);
    }

  

   

    

    const PutBid = async() => {



    
        web3.eth.sendTransaction({
            from: address,
            to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            value: amount
        })
        .then(function(){
            console.log(`Transaction sent successfully`);
            
        })
        .catch(function (err) {
            //console.log(`Transaction error ${err}`);
    
        })

        auctionContract.methods.putBid(amount, address).send(
          { from: address});


    
     
    }

  

    const GetTimeLeft = async() => {
      const timeRemaining = await auctionContract.methods.getTimeLeft().call();
      setTimeLeft(timeRemaining);
      console.log('Time remaining is: ' + timeRemaining);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();


    
      
       

    };

 
  

    
    return(
      <>
        <h1>Transfer</h1>
       
          <form onSubmit={handleSubmit} className="container">
          <p><b>From:</b> {stringValue}</p>
          <p><b>To:</b> 0x5FbDB2315678afecb367f032d93F642f64180aa3</p>
          <p><b>Amount:</b> <input type="text" id="amount" name="amount" onChange={handleChange}></input></p>
          <button onClick={() => HighestBid()}>Highest Bid</button>
          <button onClick={() => HighestBidder()}>Highest Bidder</button>
          <button onClick={() => PutBid()}>Put Bid</button>
          <button onClick={() => GetTimeLeft()}>Remaining Time</button>
          <button onClick={() => TotalBid()}>Your Total Bid</button>






          <p>{'The highest bid is: ' + highestBid}</p>
          <p>{'The highest bidder is: ' + highestBidder}</p>
          <p>{'Your total bid: ' + bid}</p>
          <p>{'Time Remaining: ' + timeLeft}</p>


          </form>
     
    
      </>
    );
};

export default Transfer;