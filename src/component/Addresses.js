import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Addresses() {

  const [addresses, setAddresses] = useState([]);


   useEffect(() => {
    async function getData() {
      axios.get(`http://localhost:3001/account/addresses`)
      .then(res => {
        let blockchainAddresses = res.data;
        setAddresses(blockchainAddresses); 
      });
    }
    

    getData();

   
  },[])



    return(
      <>
      <div>
        <h1>Blockchain Node Addresses</h1>
        <div className="addressContainer">

            
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[0]}`}}>{addresses[0]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[1]}`}}>{addresses[1]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[2]}`}}>{addresses[2]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[3]}`}}>{addresses[3]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[4]}`}}>{addresses[4]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[5]}`}}>{addresses[5]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[6]}`}}>{addresses[6]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[7]}`}}>{addresses[7]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[8]}`}}>{addresses[8]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[9]}`}}>{addresses[9]}</Link></p><br/> 
            <p><Link className="addressLink" to="/transfer/parameter-data" state={{stringValue: `${addresses[10]}`}}>{addresses[10]}</Link></p><br/> 


        </div>
      </div>
      </>
    );
  
};

export default Addresses;