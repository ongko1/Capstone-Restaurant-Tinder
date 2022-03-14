import axios from 'axios';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../Shared/baseUrl';
import food from '../Shared/images/food.jpeg'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem , Button, Label,Col, Row} from 'reactstrap'
import { Control, Form, Errors, actions} from 'react-redux-form';
import Tender from "../Shared/images/Tender.jpg";

const Register = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    const samePassword = (val) => val == password;
    const checkPassword = (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val);

    const handleSubmit = () => {
        const data = {username: username, password: password, confirmPassword: confirmPassword, role: 'ROLE_USER'}
        if(password === confirmPassword){
            axios.post(baseUrl + "/register", data)
            .then(response => {
              if (response.status === 201) {
                alert("created account succesfully")
              }
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  alert("Username and password already exist");
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
        }
    }

    return(
        <div className="row row-content justify-content-center "  style={{ backgroundColor: "#BDA656" ,backgroundImage: "url(" + Tender + ")" }}>
            <div className=" col-12 col-md-2 ">
                <h1 className="text-center" style={{color:"#85db15"}}>Delish</h1>
            <h4 className="text-center" style={{color:"red"}}>Create Account</h4>
            <Form model= "feedback" >
            <label class="sr-only"><Label htmlFor="username" class="sr-only">Username</Label>Username</label>
            <Control.text
                model=".username"
                type="text"
                id="username"
                name="username"
                class="form-control"
                placeholder="Email"
                v-model="user.username"
                onChange={(e) => setUsername(e.target.value)}
                required
                validators={{
                  required, maxLength: maxLength(21), minLength: minLength(6), validEmail
                }} />
                <Errors
                style={{fontWeight:'bolder'}}
                className='text-danger'
                model=".username"
                show="touched"
                messages={{
                  required: 'Required, ',
                  maxLength: 'Must be 20 characters or less',
                  minLength: 'Must be greater than 5 characters, ',
                  validEmail: 'Must be a valid email'
                }}
        
            />
            <div>&nbsp;</div>
            <label class="sr-only"><Label htmlFor="password" class="sr-only">Password</Label>Password</label>
            <Control.text
                model=".password"
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Password"
                v-model="user.password"
                onChange={(e) => setPassword(e.target.value)}
                required
                validators={{
                  required, checkPassword
                }} />
                <Errors
                style={{fontWeight:'bolder'}}
                className='text-danger'
                model=".password"
                show="touched"
                messages={{
                  required: 'Required, ',
                  
                  checkPassword: 'password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
                }}
        
            />
            <div>&nbsp;</div>
            <Control.text
                model=".passwordconfirm"
                type="password"
                id="password-confirm"
                name="password-confirm"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                validators={{
                  required, samePassword
                }} />
                <Errors
                style={{fontWeight:'bolder'}}
                className='text-danger'
                model=".passwordconfirm"
                show="touched"
                messages={{
                  required: 'Required, ',
                  samePassword: 'Password does not match'
                }}
            /> 
            
            <Link style={{fontWeight:'bolder'}} className="offset-1" to="/login">Have an account?</Link>
            <div>&nbsp;</div>
            <Link to="/login"><button className="col-md-6 offset-md-3" type="submit" style={{backgroundColor:"red"}} onClick={handleSubmit}>Register</button></Link>
       </Form>
        </div>
        </div>
    )
}

export default Register;