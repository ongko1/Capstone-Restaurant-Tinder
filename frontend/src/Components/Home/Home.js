import {Link} from 'react-router-dom'
import Footer from '../FooterComponent'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, CarouselControl, CarouselIndicators, CarouselItem,CarouselCaption,Carousel} from 'reactstrap'
import '../Home/home.css';
import yelp from "../Shared/images/yelpLogo.png"
import loading from "../Shared/images/loadingImg.gif"

const Home = (props) => {
  
    return(
      <div id="app">
      <img id="gif" v-if="isLoading" src={loading} />
      <div id="header">
          <div id="review">Powered by</div>  
          <a id="link" href="https://www.yelp.com/" target="_blank">
            <img id="yelpLogo" src= {yelp}/> 
          </a>
      </div> 
      <business-summary  v-for="r in theRestaurants"/>  
    </div>  
        
        
        /*<div>
            <h1 className='text-center'>Welcome to Delish helping pople decide where to eat since 2022</h1>
            <div className="row row-content">
                <div id="container">
    <div id="row">
      <button id="rejectBtn" type="submit" >
          <div id="thumb">👎</div>REJECT
      </button>
      <div class="card">
        <h1 id="name"> restaurant.name </h1>
        <div id="imageGroup">
          <img id="image" v-if="restaurant.image_url != ''" 
               />
          <img id="image" v-else src="../assets/logo.png" />    
          <div id="yelpPrice">
            <a id="link" href="https://www.yelp.com/" target="_blank">
              <img id="yelpLogo" src="@/assets/yelpLogo.png"/>
            </a>
            <p id="price">Price: restaurant.price </p>
          </div>
        </div>    
        <div id="midRow">  
          <p id="contacts">
             "restaurant.location.display_address[0]"  <br/>
             "restaurant.location.display_address[1]"  <br/> 
             "restaurant.display_phone" 
          </p>
          <a id="reviews"  target="_blank">
            Reviews:  "restaurant.review_count"
            Check Out Our Reviews!
          </a>
        </div>  
        <img id="stars" />
      </div>  
      <button id="likeBtn" type="submit" >
        <div id="thumb">👍</div>LIKE
      </button>
    </div>
  </div>
              
            </div>
        </div>*/
        
    );
}

export default Home;