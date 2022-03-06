import axios from 'axios';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../Shared/baseUrl';
import food from '../Shared/images/food.jpeg'
import { Card, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Control, Form, Errors, actions} from 'react-redux-form';

const Register = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    
    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
      };

    const handleSubmit = () => {
        const data = {username: username, password: password, confirmPassword: confirmPassword, role: 'ROLE_USER'}
        if(password === confirmPassword){
            axios.post(baseUrl + "/register", data)
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
        <div className="row row-content justify-content-center " style={{ backgroundColor: "#BDA656" ,backgroundImage: "url(" + food + ")" }}>
            <div className=" col-12 col-md-2 ">
                <h1 className="text-center" style={{color:"red"}}>Delish</h1>
            <h4 className="text-center" style={{color:"red"}}>Create Account</h4>
            <label class="sr-only">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                class="form-control"
                placeholder="Username"
                v-model="user.username"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div>&nbsp;</div>
            <input
                type="password"
                id="password-confirm"
                name="password-confirm"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            /> 
            
            <Link className="offset-5" to="/login">Have an account?</Link>
            <div>&nbsp;</div>
            <button className="col-md-6 offset-md-3" type="submit" style={{backgroundColor:"#711919"}} onClick={handleSubmit}>Register</button>
       
        </div>
        </div>
    )
}

export default Register;