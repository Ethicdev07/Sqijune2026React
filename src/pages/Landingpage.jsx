import React from 'react'
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import List from "../hooks/List"
import Products from './Products';
// import Home from '../components/Home';

const Landingpage = () => {
  return (
    <div style={{padding:"20px"}}>
        
        <h1 className="text-red-500">Hello</h1>
        <Hero/>

        <Products/>
      
    </div>
  )
}

export default Landingpage