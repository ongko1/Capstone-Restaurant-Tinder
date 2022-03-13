import React, { useEffect } from "react"
import './favorites.css';
import yelp from "./Shared/images/yelpLogo.png"
import loading from "./Shared/images/loading2.gif"
import axios from 'axios';
import { baseUrl } from './Shared/baseUrl';
import {useState} from 'react';
import yelpService from "./services/yelpService";
import { Link } from "react-router-dom";


function RenderFavorites({favorite,token}) {
  
  const handleRemoveFave = () => {
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    yelpService.deleteFavorites(favorite.id)
  .then((response) => {
  console.log(response)
  const s = response.data;
  //alert('Favorite deleted!');
if ( response.status == 204) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.get(baseUrl + "/favorites")
  .then((response) => {
    console.log(response)
  const s = response.data;
  //setFavorites(s)
});
}

});
 
}

  return(
    <div class= "fav">
    <div id="card" class="business-summary" >
      <a id="link" href={favorite.url} target="_blank">  
        <h1 id="name">{favorite.name}</h1>
        <div id="contact">
          <h2>{ favorite.location.display_address[0] } <br/>
            {favorite.location.display_address[1] }</h2>
          <h2>{ favorite.display_phone }</h2>
        </div>  
      </a>
      <div id="bottomRow">
        <img id="stars" src="getStars" alt="" /> 
        <Link to="/favorites"><button id="removeBtn" onClick={handleRemoveFave}>Remove from list</button></Link>
      </div>   
    </div> 
  </div>
  );
}

function Favorites (props)  {
const [favorites, setFavorites] = useState([])
  useEffect(() => {
    console.log('favorites use effect');
  let mounted = true;
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
  axios.get(baseUrl + "/favorites")
  .then((response) => {
    if(mounted) {
  console.log(response)
  const s = response.data;
  setFavorites(s)
}
  })
  return () => mounted = false;
}, [])


        const faveCard =favorites.map((favorite) =>{
          return(
            <div>
              <RenderFavorites favorite={favorite}
              token={props.token} />
            </div>
          )
        })
      return(
        
        <div id="app">
    <div id="header">
        <div id="review">Powered by</div>  
        <a id="link" href="https://www.yelp.com/" target="_blank">
          <img id="yelpLogo" src={yelp}/> 
        </a> 
       
    </div> 
    {faveCard}
  </div>  
      );
}
export default Favorites