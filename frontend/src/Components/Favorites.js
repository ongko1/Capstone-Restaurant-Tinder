import {Link} from 'react-router-dom'
import Footer from './FooterComponent'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, CarouselControl, CarouselIndicators, CarouselItem,CarouselCaption,Carousel} from 'reactstrap'
import './favorites.css';
import yelp from "./Shared/images/yelpLogo.png"
import loading from "./Shared/images/loading2.gif"

const Favorites = (props) => {
  const word = console.log('adsadsad')
  
    return(
      <div id="app">
      <img id="gif" v-if="isLoading" src={loading} />
      <div id="header">
        <h1>{word}</h1>
          <div id="review">Powered by</div>  
          <a id="link" href="https://www.yelp.com/" target="_blank">
            <img id="yelpLogo" src= {yelp}/> 
          </a>
      </div> 
      <business-summary  v-for="r in theRestaurants"/>  
    </div>
    )
}
export default Favorites