import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import yelpService from './services/yelpService'

const businessCard = (props) => {
 
  return(

    
<div id="container">
    <div id="row">
      <button id="rejectBtn" type="submit" /*Onclick= {addReject()}*/>
          <div id="thumb">👎</div>REJECT
      </button>
      <div class="card">
        <h1 id="name"></h1>
        <div id="imageGroup">
          <img id="image" v-if="restaurant.image_url != ''" 
              src="`${restaurant.image_url}`" />
          <img id="image" v-else src="..//Componenets/Shared/images/logo.png" />    
          <div id="yelpPrice">
            <a id="link" href="https://www.yelp.com/" target="_blank">
              <img id="yelpLogo" src="..//Componenets/Shared/images/yelpLogo.png"/>
            </a>
            <p id="price">Price: </p>
          </div>
        </div>    
        <div id="midRow">  
          <p id="contacts">
             <br/>
             <br/>  
          </p>
          <a id="reviews" href="`${restaurant.url}`" target="_blank">
            Reviews: <br/>
            Check Out Our Reviews!
          </a>
        </div>  
        <img id="stars" src="getStars" />
      </div>  
      <button id="likeBtn" type="submit" /*Onclick={addFavorite()}*/>
        <div id="thumb">👍</div>LIKE
      </button>
    </div>
  </div>
  )
  }
  export default businessCard;