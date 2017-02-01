import React,{Component} from 'react';
import {Navbar, Nav, Col, Grid, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as API from '../../api/PostSearch'
import FacebookLogin from 'react-facebook-login';

export default class Header extends Component {

    render() {
        return (
            <Navbar className="navbar-custom">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"><i className="fa fa-home"></i> Seach app</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={4} href="#/">Search</NavItem>
                        <NavItem eventKey={4} href="#/upload">Upload Photo</NavItem>
                        <NavItem eventKey={4} href="#/search/lion">Search test 2</NavItem>
                        <NavItem
                            eventKey={4}>
                            <FacebookLogin
                                cssClass="btn"
                                textButton='Facebook'
                                icon='fa-facebook'
                                size='small'
                                appId="253580248403665"
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,user_friends,user_actions.books"
                                callback={this.responseFacebook}
                            />
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
