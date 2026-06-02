import React from "react";
import { Link } from "react-router-dom";  
import logo from "../assets/logo.png";
const Header = () => {
  const [BtnnameReact, setBtnnameReact] = React.useState("Login");
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li><button id="lg" onClick={()=>{
          BtnnameReact=== "Login"?setBtnnameReact("Logout"):setBtnnameReact("Login");
        }}>{BtnnameReact}</button></li> 
        </ul>
        
      </div>
    </div>
  );
};
export default Header;
