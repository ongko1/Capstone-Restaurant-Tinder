import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addBusinesses, addFavorites, addToken, deleteUser, fetchBusinesses } from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Footer from '../FooterComponent'
import delish from '../Shared/images/delish.jpeg'
import RenderRestaurant from '../RenderRestaurants'


import { Navbar, NavbarBrand, } from 'reactstrap';

import Favorites from '../Favorites'
    

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
    fetchBusinesses: () => { dispatch(fetchBusinesses)}
    

});

class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
       this.props.fetchBusinesses();
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
                            <Navbar style={{backgroundColor: '#8E0009'}}>
                            <NavbarBrand className='mr-auto' href="/">
                                <img src={delish} height="45" width="110" alt="Delish logo"/>
                            </NavbarBrand>
                            <Link to='/home'>Home | </Link>
                            <Link to='/favorites'> My favorites</Link>
                            <Link to='/login' onClick={this.handleLogout}>  logout</Link> 
                            <Redirect to='/home'/>
                            </Navbar>

                        </div>  
                    :
                        <Navbar style={{backgroundColor: '#8E0009'}}>
                            <NavbarBrand className='mr-auto' href="/">
                                <img src={delish} height="45" width="110" alt="Delish logo"/>
                            </NavbarBrand>
                           <Link to='/login'>Home | </Link> 
                           <Link to='/abouts'>AboutUs | </Link> 
                        </Navbar>
                        
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home businesses={this.props.businesses}token= {this.props.token.token}/> : null}/>
                    <Route path='/favorites' component={ () => <Favorites businesses={this.props.businesses} token= {this.props.token.token} />} />
                    <Route path='/restaurants' component={ () => <RenderRestaurant businesses={this.props.businesses} token= {this.props.token.token} />} />
                    <Redirect to='/login'/>
                    
                </Switch>
                <Footer/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));