import './Home/home.css'
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
import { businessesLoading } from '../Redux/actionCreators'


function RestaurantCard({businesses}) {
  //get restaurants
  
  return(
    <div id="container">
          <div id="row">
            {businesses.map((business) => {
              return(
                <div>
                <button id="rejectBtn" type="submit" onclickPrevent="addReject">
          <div id="thumb">👎</div>REJECT
      </button>
      <div class="card">
        <h1 id="name">{ business.name }</h1>
        <div id="imageGroup">
          <img id="image" v-if="business.image_url != ''" 
              src={business.image_url} />
          <img id="image" v-else src={logo} />    
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
          <a id="reviews" href={business.url} target="_blank">
            Reviews: { business.review_count } <br/>
            Check Out Our Reviews!
          </a>
        </div>  
        <img id="stars" src="getStars" />
      </div>  
      <button id="likeBtn" type="submit" onClickPrevent="addFavorite">
        <div id="thumb">👍</div>LIKE
      </button>
      </div>
              )
            })}
      
    </div> 
  </div>
  )
}


   


 /* componentDidMount ();{
    const {zipCode} = this.props.location.state
    const {category} = this.props.location.state
    const {radius} = this.props.location.state
  
    if(radius == null){
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
      yelpService.getRestaurantsNoRadius(zipCode, category)
      
      .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
      .then((response) => {
        console.log(response)
        const data = response.json;
        this.setState({
          businesses:data
        })
        
      });
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    yelpService.getRestaurantsWithRadius(zipCode, category, radius) //pass as props to renderrestaurant
    .then((response) => {
      console.log(response)
      const data = response.data;
      //setBusinesses(data)
      //addBusinesses(data)
      this.setState({
        businesses:data
      })
      });
      
    }
  }
}*/
  
     const RenderRestaurant = (props) =>  { 
       const [businesses,setBusinesses] = useState([])
        const [zipCode,setzipCode] = useState()
        const [category,setCategory] = useState([])
        const [radius,setRadius] = useState('')
      React.useEffect(() => {
        if(radius == null){
          axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
          yelpService.getRestaurantsNoRadius(zipCode, category)
          .then((response) => {
            console.log(response)
            const data = response.data;
            
            setBusinesses(data) // call only in some curcumstances
            //addBusinesses(data)
          });
        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
        yelpService.getRestaurantsWithRadius(zipCode, category, radius) //pass as props to renderrestaurant
        .then((response) => {
          console.log(response)
          const data = response.data;
          setBusinesses(data)
          //addBusinesses(data)
          
          });
         
        }
      
       })
  
console.log('Menu Component render is invoked');
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
              
            <RestaurantCard businesses={businesses}/>
            </div>
        </div>
        

    );
  
  }




  
  export default RenderRestaurant;