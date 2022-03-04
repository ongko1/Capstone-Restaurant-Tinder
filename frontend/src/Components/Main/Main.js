import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Footer from '../FooterComponent'
import delish from '../Shared/images/delish.jpeg'

import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Modal, Button, ModalBody, ModalHeader, 
    Form, FormGroup, Input, Label, NavLink } from 'reactstrap';
    

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
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
                    <Redirect to='/login'/>
                </Switch>
                <Footer/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));