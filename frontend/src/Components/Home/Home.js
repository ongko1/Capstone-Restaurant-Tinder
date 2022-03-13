import '../Home/home.css'
import yelpService from '../services/yelpService'
import delish from '../Shared/images/delish2.jpeg'
import {useState} from 'react'
import axios from 'axios'
import { baseUrl } from '../Shared/baseUrl'
import yelpLogo from "../Shared/images/yelpLogo.png"
import logo from "../Shared/images/delish2.jpeg"
import { Link } from 'react-router-dom'
import { addBusinesses, businessesFailed, businessesLoading } from '../../Redux/actionCreators'
import { useDispatch } from 'react-redux'

const Home = (props) => {
const dispatch = useDispatch()
const [businesses,setBusinesses] = useState([])
const [zipCode,setzipCode] = useState()
const [category,setCategory] = useState([])
const [radius,setRadius] = useState('')


const handleSubmit =  (event) => {
  dispatch(businessesLoading(true))
  if(radius == ''){
    axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    yelpService.getRestaurantsNoRadius(zipCode, category)
    .then((response) => {
      console.log(response)
      const data = response.data;
      setBusinesses(data)
      dispatch(addBusinesses(data))

      //this.props.dispatch(addBusinesses(data))
    });
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
  yelpService.getRestaurantsWithRadius(zipCode, category, radius) //pass as props to renderrestaurant
  .then((response) => {
    console.log(response)
    const data = response.data;
    setBusinesses(data)
    dispatch(addBusinesses(data))
    //addBusinesses(data)
    
    
    });
 

  }
 
}
   
    return(
      <div id="apps">
        
    <form> 
      <div>
      <img className="align-center"id="ppLogo" alt="" src={delish} />
      </div>
      <div id="headers">
       
        <div id="zipCode">
          <h1 id="zipHead">Enter your Zipcode!</h1>
          <br/>
          <input id="zipBox" v-model="business.zipCode"
            onChange={(e) => setzipCode(e.target.value)}type="text" placeholder="5-Digit Zip Code"
            maxlength="5" minlength="5" pattern="[0-9]*"/>
        </div>  
      </div>
      <div id="travelRow">    
        <h2 id="travel">How far are you willing to travel for food?</h2>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <select id="radius" v-model="business.radius" onChange={(e) => setRadius(e.target.value)}>
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
          <input className="cat" value="pizza" name="pizza" v-model="business.category"  
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="pizza">🍕 Pizza</label>
        </div>
        <div>
          <input class="cat" value="barbeque" name="barbeque" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="barbeque">🍖 BBQ</label>
        </div>
        <div>
          <input class="cat" value="seafood" name="seafood" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="seafood">🦀 Seafood</label>
        </div>
        <div>
          <input class="cat" value="fine-dining" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="four">🥂 Fine Dining</label>
        </div>
        <div>
          <input class="cat" value="fast-food" name="fastfood" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="fastfood">🍔 Fast Food</label>
        </div>
        <div>
          <input class="cat" value="steakhouse" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="six">🥩 Steakhouse</label>
        </div>
        <div>
          <input class="cat" value="thai" name="thai" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="thai">🍱 Thai</label>
        </div>
        <div>
          <input class="cat" value="chinese" name="chinese" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="chinese">🍜 Chinese</label>
        </div>
        <div>
          <input class="cat" value="sushi" name="sushi" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="sushi">🍣 Sushi</label>
        </div>
        <div>
          <input class="cat" value="indian" name="indian" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="indian">🥘 Indian</label>
        </div>
        <div>
          <input class="cat" value="italian" name="italian" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="italian">🍝 Italian</label>
        </div>
        <div>
          <input class="cat" value="mexican" name="mexican" v-model="business.category" 
           onChange={(e) => setCategory(e.target.value)} type="radio"/>
          <label for="mexican">🌮 Mexican</label>
        </div>
      </div>
      </div>
      
      <Link to="/restaurants"
        ><button id="mySearch" type="submit" onClick={handleSubmit} >
        Find your restaurant!
      </button></Link> 
    </form>
  </div> 
  
    );

  
}
export default Home;
