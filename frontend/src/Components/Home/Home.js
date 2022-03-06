import '../Home/home.css'
import {Link} from 'react-router-dom'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, CarouselControl, CarouselIndicators, CarouselItem,CarouselCaption,Carousel} from 'reactstrap'
import yelp from "../Shared/images/yelpLogo.png"
import loading from "../Shared/images/loading2.gif"
import yelpService from '../services/yelpService'

import delish from '../Shared/images/delish2.jpeg'
import {useState} from 'react'
import businessCard from '../businessCard'
import axios from 'axios'



const Home = (props) => {
const [business,setBusiness] = useState({zipCode:'', category:'',radius:''});

const handleChange = (e) => {
  let updatedValue = {};
  updatedValue = {category:e.target.value,};
  setBusiness(business => ({
       ...business,
       ...updatedValue
     }));
   }
const handleSubmit =  () => {
  

}
    
    return(
      
      <div>
      <div id="apps">
    <form> 
      <div>
      <img className="align-center"id="ppLogo" src={delish} />
      </div>
      <div id="headers">
       
        <div id="zipCode">
          <h1 id="zipHead">Enter your Zipcode!</h1>
          <br/>
          <input id="zipBox" v-model="business.zipCode"
            type="text" placeholder="5-Digit Zip Code"
            maxlength="5" minlength="5" pattern="[0-9]*"/>
        </div>  
      </div>
      <div id="travelRow">    
        <h2 id="travel">How far are you willing to travel for food?</h2>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <select id="radius" v-model="business.radius" >
          <option value=''>Any Distance</option>
          <option value='1610'>1 Mile</option>
          <option value='16100'>10 Miles</option>
          <option value='40000'>25 Miles</option>
        </select> 
      </div>
      <div id="grouping">
      <h1 id="mood">What are you in the mood for?</h1>
      <div id="category">
        <div>
          <input class="cat" value="pizza" name="pizza" v-model="business.category"  type="radio"/>
          <label for="pizza">🍕 Pizza</label>
        </div>
        <div>
          <input class="cat" value="barbeque" name="barbeque" v-model="business.category" type="radio"/>
          <label for="barbeque">🍖 BBQ</label>
        </div>
        <div>
          <input class="cat" value="seafood" name="seafood" v-model="business.category" type="radio"/>
          <label for="seafood">🦀 Seafood</label>
        </div>
        <div>
          <input class="cat" value="fine-dining" v-model="business.category" type="radio"/>
          <label for="four">🥂 Fine Dining</label>
        </div>
        <div>
          <input class="cat" value="fast-food" name="fastfood" v-model="business.category" type="radio"/>
          <label for="fastfood">🍔 Fast Food</label>
        </div>
        <div>
          <input class="cat" value="steakhouse" v-model="business.category" type="radio"/>
          <label for="six">🥩 Steakhouse</label>
        </div>
        <div>
          <input class="cat" value="thai" name="thai" v-model="business.category" type="radio"/>
          <label for="thai">🍱 Thai</label>
        </div>
        <div>
          <input class="cat" value="chinese" name="chinese" v-model="business.category" type="radio"/>
          <label for="chinese">🍜 Chinese</label>
        </div>
        <div>
          <input class="cat" value="sushi" name="sushi" v-model="business.category" type="radio"/>
          <label for="sushi">🍣 Sushi</label>
        </div>
        <div>
          <input class="cat" value="indian" name="indian" v-model="business.category" type="radio"/>
          <label for="indian">🥘 Indian</label>
        </div>
        <div>
          <input class="cat" value="italian" name="italian" v-model="business.category" type="radio"/>
          <label for="italian">🍝 Italian</label>
        </div>
        <div>
          <input class="cat" value="mexican" name="mexican" v-model="business.category" type="radio"/>
          <label for="mexican">🌮 Mexican</label>
        </div>
      </div>
      </div>
      
      <button id="mySearch" type="submit" onclickprevent="search" onClick={handleSubmit}><Link to="/businesses">
        Find your restaurant!
      </Link></button>
    </form>
  </div> 
  </div>
    );
}
export default Home;
