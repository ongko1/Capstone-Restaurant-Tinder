import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addBusinesses, addFavorites, addToken, deleteUser,fetchFavorites } from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Footer from '../FooterComponent'
import de from '../Shared/images/de.jpg'
import RenderRestaurant from '../RenderRestaurants'


import { Navbar, NavbarBrand, } from 'reactstrap';

import Favorites from '../Favorites'
import Invite from '../InviteComponent'
import AboutUs from '../AboutUs'
import ContactUs from '../ContactUs'
    

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        businesses: state.businesses,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
    addBusinesses: () => { dispatch(addBusinesses)},
    addFavorites: () => { dispatch(addFavorites)},
    fetchFavorites: () => { dispatch(addFavorites())}
    

});

class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
       this.props.fetchFavorites(this.props.token.token)
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    

    render(){

        return(
            <div>
                {this.props.token.token !== undefined ?
                        <div>
                            <Navbar style={{backgroundColor: 'white'}}>
                            <NavbarBrand className='mr-auto' href="/">
                                <img src={de} height="100" width="110" alt="Delish logo"/>
                            </NavbarBrand>
                            <Link to='/home'>Home | </Link>
                            <Link to='/favorites'> My Favorites  |  </Link>
                            <Link to='/invite'> Invite Friends |  </Link>
                            <Link to='aboutus'>About Us  | </Link>
                            <Link to='contactus'> Contact Us  | </Link>
                            <Link to='/login' onClick={this.handleLogout}> Logout </Link> 
                            <Redirect to='/home'/>
                            </Navbar>

                        </div>  
                    :
                        <Navbar style={{backgroundColor: 'white'}}>
                            <NavbarBrand className='mr-auto' href="/">
                                <img src={de} height="100" width="110" alt="Delish logo"/>
                            </NavbarBrand>
                           <Link to='/login'>Home | </Link> 
                           <Link to='/aboutus'> About Us | </Link> 
                           <Link to='/contactus'> Contact Us </Link>
                        </Navbar>
                        
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/aboutus'component={()=> <AboutUs/>}/>
                    <Route path='/contactus'component={()=> <ContactUs/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home businesses={this.props.businesses}token= {this.props.token.token}/> : null}/>
                    <Route path='/favorites' component={ () => <Favorites favorites={this.props.favorites}businesses={this.props.businesses} token= {this.props.token.token} user ={this.props.user} />} />
                    <Route path='/restaurants' component={ () => <RenderRestaurant businesses={this.props.businesses} token= {this.props.token.token} />} />
                    <Route path='/invite' component={ () => <Invite/>} />
                    <Redirect to='/login'/>
                    
                </Switch>
                <Footer/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));