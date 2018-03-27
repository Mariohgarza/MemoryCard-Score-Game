import React from "react";
import "./Navbar.css";

const Navbar = props =>
 <ul className="nav nav-pills">
  <li className="title">{props.title}</li>
  <li>{props.msg}</li>

  <li className= "scores">  SCORE: {props.score}   TOP SCORE: {props.topscore}</li>
 </ul>

export default Navbar;
