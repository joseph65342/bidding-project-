import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './utils/constants';
import { BrowserRouter, Route, Routes, Switch, Link } from "react-router-dom";
import React from 'react';
import { Component } from 'react';
import HomeScreen from './component/HomeScreen';
import Addresses from './component/Addresses';
import Navigation from './component/Navigation';
import Transfer from './component/Transfer';



class App extends Component {
  render() {
    return (
      <BrowserRouter history={History}>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/addresses" element={<Addresses />}></Route>
            <Route path="/transfer/parameter-data" element={<Transfer />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
