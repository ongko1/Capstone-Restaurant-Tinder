import "../Components/restaurant.css"
import yelpService from './services/yelpService'
import delish from './Shared/images/delish2.jpeg'
import React, {Component, useState} from 'react'
import axios from 'axios'
import { baseUrl } from './Shared/baseUrl'
import yelpLogo from "./Shared/images/yelpLogo.png"
import logo from "./Shared/images/logo.png"
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import{Loading} from '../Components/LoadingComponent'
import { addFavorites, businessesLoading } from '../Redux/actionCreators'
import large_0 from './Shared/images/extra_large_0.png'
import large_1 from './Shared/images/extra_large_1.png'
import large_15 from './Shared/images/extra_large_1_half.png'
import large_2 from './Shared/images/extra_large_2.png'
import large_25 from './Shared/images/extra_large_2_half.png'
import large_3 from './Shared/images/extra_large_3.png'
import large_35 from './Shared/images/extra_large_3_half.png'
import large_4 from './Shared/images/extra_large_4.png'
import large_45 from './Shared/images/extra_large_4_half.png'
import large_5 from './Shared/images/extra_large_5.png'
import { useDispatch, useSelector } from "react-redux"



function RestaurantCard({business, token,}) {
  //get restaurants
  
  function getStars() {
    const rating = business.rating;
    if (rating == 0.0) {
      return require('./Shared/images/extra_large_0.png');
    } else if (rating == 1.0) {
      return require('./Shared/images/extra_large_1.png');
    } else if (rating == 1.5) {
      return require('./Shared/images/extra_large_1_half.png');
    } else if (rating == 2.0) {
      return require('./Shared/images/extra_large_2.png');
    } else if (rating == 2.5) {
      return require('./Shared/images/extra_large_2_half.png');
    } else if (rating == 3.0) {
      return require('./Shared/images/extra_large_3.png');
    } else if (rating == 3.5) {
      return require('./Shared/images/extra_large_3_half.png');
    } else if (rating == 4.0) {
      return require('./Shared/images/extra_large_4.png');
    } else if (rating == 4.5) {
      return require('./Shared/images/extra_large_4_half.png');
    } else {
      return require('./Shared/images/extra_large_5.png');
    }
  }
  
  const addFavorite = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      yelpService.addFavorites(business.id)
      .then ((response) => {
        console.log(response)
      });
  }
 const addReject = () => {
    
    
  }
          return(
          <div id="row">
                <div>
                <button id="rejectBtn" type="submit" onclick={addReject}>
          <div id="thumb">👎</div>REJECT
      </button>
      <div class="card">
        <h1 id="name">{ business.name }</h1>
        <div id="imageGroup">
          <img id="image" v-if="business.image_url != ''" 
              src={business.image_url} />
          <img id="image" v-else src={delish} />    
          <div id="yelpPrice">
            <a id="link" href="https://www.yelp.com/" target="_blank">
              <img id="yelpLogo" src={yelpLogo}/>
            </a>
            <p id="price">Price: { business.price }</p>
            
          </div>
          <p id="price">Is Closed: {business.is_closed ? 'Closed': 'Open'}</p>
        </div>    
        <div id="midRow">  
          <p id="contacts">
            { business.location.display_address[0] } <br/>
            { business.location.display_address[1]} <br/> 
            { business.display_phone } 
          </p>
          <a id="reviews" href={business.url} >
            Reviews: { business.review_count } <br/>
            Check Out Our Reviews!
          </a>
        </div>  
        <img id="stars" src={getStars(business.rating)} />
      </div>  
      <button id="likeBtn" type="submit" onClick={addFavorite} >
        <div id="thumb">👍</div>LIKE
      </button>
      </div>
             
      
    </div> 
  );
}


   


 
  
     const RenderRestaurant = (props) =>  { 
      const dispatch =useDispatch()
      let rejectSet = new Set();
      const [reject, setReject] =useState()
console.log('Menu Component render is invoked');

if (props.isLoading) {
  return(
      <div className="container">
          <div className="row">
              <Loading/>
          </div>
      </div>
  );
}
else if (props.errMess) {
  return(
      <div className="container"> 
          <div className="row">
              <h4>{props.businesses.errMess}</h4>
          </div>
      </div>
  );
}
else if (props != null) {
  const resCard = props.businesses.businesses.map((business) => {
    
    return(
      <RestaurantCard business={business}
  token={props.token} />
    )
  })
  
return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Restaurants</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3> Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
             {resCard}
            </div>


        </div>
        

    );
  
  } else {
    return (
      <div>

      </div>
    )
  }
}



  
  export default RenderRestaurant;