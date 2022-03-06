import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser, fetchBusinesses, fetchRestaurants} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Footer from '../FooterComponent'
import delish from '../Shared/images/delish.jpeg'
import businessCard from '../businessCard'



import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Modal, Button, ModalBody, ModalHeader, 
    Form, FormGroup, Input, Label, NavLink } from 'reactstrap';
import { Businesses } from '../../Redux/businesses'
import Favorites from '../Favorites'
    

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        businesses: state.businesses
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
    //fetchBusinesses: () => {dispatch(fetchBusinesses())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //this.props.fetchBusinesses();
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){

        const HomePage = () => {
            return(
                <Home businesses = {this.props.businesses.businesses.filter((business) => business.id)[0]}
                />
            )
        }
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
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>
                            </Navbar>

                        </div>  
                    :
                        <Navbar style={{backgroundColor: '#8E0009'}}>
                            <NavbarBrand className='mr-auto' href="/">
                                <img src={delish} height="45" width="110" alt="Delish logo"/>
                            </NavbarBrand>
                           <Link to='/login'>Home | </Link> 
                        </Navbar>
                        
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                    <Route path='/businesses'component={ () => <businessCard/> }/>
                    <Route path='/favorites' component={ () => <Favorites token = {this.props.token.token}/>} />
                    <Redirect to='/login'/>
                </Switch>
                <Footer/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));