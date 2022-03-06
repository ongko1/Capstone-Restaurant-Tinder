import { Component, useState} from 'react'
import {Link, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl,} from '../Shared/baseUrl'
import group from '../Shared/images/Family-eating.jpeg'
import axios from 'axios'
import food from '../Shared/images/food.jpeg'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, Row } from 'reactstrap'
import { Control, Form, Errors, actions} from 'react-redux-form';
import { yelpUrl } from '../Shared/yelpUrl'



const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };

        
        
        const userWithToken = await axios.post(baseUrl + '/login', data)
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert("password or username incorrect");
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
       
        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
        console.log(userWithToken.data.token);
        /*axios.defaults.headers.common['Authorization'] = `Bearer ${userWithToken.data.token}`;
        axios.get(baseUrl + "/favorites")
        .then((response) => {
        console.log(response);*/
        const config = {
              headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin":"*",
        "Authorization": `Bearer {UGsyAZj9rdohTe8NG0MqHxGsQ4YZoRnV3wPVLBqkBWXkZ6XgNrUHmXuXgjbxkemLqeIhW79u-Lf7VuVkr9ppVCqQ6LfwGaOICkmkeDo7mD7EWlgRSh7IqtEoWLEiYnYx}`
     },
            
          };
        

       // axios.defaults.headers.common['Authorization'] = `Bearer {UGsyAZj9rdohTe8NG0MqHxGsQ4YZoRnV3wPVLBqkBWXkZ6XgNrUHmXuXgjbxkemLqeIhW79u-Lf7VuVkr9ppVCqQ6LfwGaOICkmkeDo7mD7EWlgRSh7IqtEoWLEiYnYx}`;
        //headers: {'X-Requested-With': 'XMLHttpRequest'},
        /*axios.get("hhttps://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50",config)
        .then((response) => {
        console.log(response)*/
        //UI feedback to tell the user when we are retrieving infromation from the API 
        //this.setState({ loading: true })

        //using a proxy server cors-anywhere to get rid of the CROS probblem 
        //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=19145`, {
        //required authorization format from API 
        headers: {
            //to get the API from the .env file use process.env.{variable name}
            Authorization: `Bearer {UGsyAZj9rdohTe8NG0MqHxGsQ4YZoRnV3wPVLBqkBWXkZ6XgNrUHmXuXgjbxkemLqeIhW79u-Lf7VuVkr9ppVCqQ6LfwGaOICkmkeDo7mD7EWlgRSh7IqtEoWLEiYnYx}`
        },
        //option params passed to API call to retrieve only breakfast and lunch spots 
        params: {
            categories: 'breakfast_brunch',
        }
        })
        .then((response) => {
            console.log(response)
            //change the state of App to reflect on the result we are given from the API
            //at the same time, setting the loading state to false 
            //this.setState({ results: res.data.businesses, loading: false })
        })
        .catch((err) => {
            //fire the errorState message if there is no information return from the API
            //this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
        })  
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render(){
        return(
            <div className="row row-content justify-content-center" style={{  backgroundImage: "url(" + food + ")" }}>
                <div className="col-12 col-md-2 ">
                    <h1 className="text-center" style={{color:"red"}}>Delish</h1>
                <label class="sr-only">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Username"
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                <div>&nbsp;</div>
                <label class="sr-only">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                
                <Link className="offset-5" to="/register" style={{fontWeight:'bolder'}}>Need an account?</Link>
                <div>&nbsp;</div>
                <button className="col-md- offset-md-3" type="submit" style={{backgroundColor:'#711919'}} onClick={this.handleLogin}>Sign in</button>
                
            </div>
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));