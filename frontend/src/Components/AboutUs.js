import React, { Component} from "react";
import { Link, Redirect, Switch, Router, Route} from 'react-router-dom'
import martin from './Shared/images/martin.JPG'
import lime from './Shared/images/lime.JPG'
import serki from './Shared/images/serki.JPG'
import { Navbar, NavbarBrand } from "reactstrap";
import './aboutus.css';

const AboutUs = () => {
    return(
        <body>
        <div class="about-section">
          <h1>About Us</h1>
          <li>The Final Capstone </li>
          <li>Team Name: Delish</li>
          <li>Project Name: Restaurant Tinder</li>
          <li>Team Members: Martin Garcia, Gunawan Liem and Serkadis Dubale</li>
    
          <li>
            Objective: Created a Web Application to Help Food Lovers 
          </li>
        </div>
        

        <h1 className="text-center" style={{ color: "#85db15" ,fontWeight: "bolder"}}>Our Team </h1>
    
    
        <div class="row">
          <div class="column">
            <div class="card">
           
              <img src={martin} height="80" width="80" alt="Martin"/>
          
              <div class="container">
                <h2>Martin Garcia</h2>
                <p class="title">Connect to know more:</p>
                <p>
                  <a class="button"
                    href="https://www.linkedin.com/in/-martin-garcia-jr"
                   >linkedin</a>
                </p>
              </div>
            </div>
          </div>
    
          <div class="column">
            <div class="card">
            <img src={lime} height="80" width="80" alt="lime"/>
              <div class="container">
                <h2>Gunawan Liem</h2>
                <p class="title">Connect to know more:</p>
    
                <p>
                  <a
                    class="button"
                    href="https://www.linkedin.com/in/gunawan-liem"
                   
                    >linkedin</a>
                  
                </p>
              </div>
            </div>
          </div>
    
          <div class="column">
            <div class="card">
            <img src={serki} height="80" width="80" alt="serki"/>
              <div class="container">
                <h2>Serkadis Dubale</h2>
                <p class="title">Connect to know more:</p>
    
                <p>
                  <a
                    class="button"
                    href="https://www.linkedin.com/in/serkadis-dubale"
                    
                    >linkedin</a>
                
                </p>
              </div>
            </div>
          </div>
    
    
        <div className="createdby">
            <div className="col-auto">
                </div>
                </div>           
        </div>
      </body>
    
    
    );
}

export default AboutUs;
