import React,{Component} from 'react';
import {Navbar, Nav, Col, Grid, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as API from '../../api/Backend'
import FacebookLogin from 'react-facebook-login';

export default class Header extends Component {

    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Picuni</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}
