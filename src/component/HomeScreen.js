import React from "react";
import img1 from '../images/image1.jpeg';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     
    };
  }
  
  render() {
    return(
      <>

      <h1 className="h1_firstPage">Online Auction for Real Estate</h1>


      <div className="container2">

     

        <img src={img1} alt="real estate"></img>
        
      </div>
      <p className="paragraph_firstPage">This application is the prototype for simulating an online auction for real estate.</p>
      <p className="paragraph_firstPage">Click on the addresses button at the top of the page to get to the blockchain node accounts used to test the smart contract functionality.</p>
      <p className="paragraph_firstPage">After some time the auction will close and no more bids can be made.</p>
      <p className="paragraph_firstPage">Please open up the console to see the log messages of any modifiers/require statements.</p>


      </>
    );
  }
};

export default HomeScreen;