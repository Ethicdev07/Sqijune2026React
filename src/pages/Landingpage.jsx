import React from 'react'
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import List from "../hooks/List"
// import Home from '../components/Home';

const Landingpage = () => {
  return (
    <div style={{padding:"20px"}}>
        {/* <Nav/> */}
        <Hero/>
        {/* <Home/> */}
        <List/>
    </div>
  )
}

export default Landingpage