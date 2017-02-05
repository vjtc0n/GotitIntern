import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {searchPhotoAction, searchNextPageAction} from '../actions/PostActions';
import Sidebar from 'react-sidebar'
import FontAwesome from 'react-fontawesome'
import Header from '../../components/partials/Header'
import BurgerMenu from 'react-burger-menu';
import { Link, hashHistory} from 'react-router'
import * as config from '../../api/config'
var baseUrl = config.baseUrl;
import * as LoginActions from '../actions/LoginAction';


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            sidebarOpen: false,
            sidebarDocked: false
        }
    }

    onSetSidebarOpen() {
        this.setState({
            sidebarOpen: false
        });
    }

    onPressMenu() {
        this.setState({
            sidebarOpen: true
        })
    }

    /*
    * Logout from Facebook, as well as deleting accessToken from Loopback server
    * */

    logout(accessToken) {
        let self = this
        console.log("LOGOUT FB")
        console.log(accessToken)
        window.FB.logout(function(response) {
            // user is now logged out
            console.log(response)
            let URL = baseUrl + '/Members/logout?access_token=' + accessToken
            let xhr = new XMLHttpRequest();
            let imageFormData = new FormData();
            xhr.open('post', URL, true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    //console.log(xhr);
                    self.props.actions.logout();
                    hashHistory.replace('/')
                }
            };

            xhr.send(imageFormData);
        });

    }

    render() {
        let sidebarContent = <div className="">
                    <div className="mdl-card mdl-shadow--2dp mdl-color--primary mdl-color-text--blue-grey-50 drawer-profile">
                        <div className="mdl-card__title user users">
                            <img src={this.props.profile.user.avatar_picture} alt=""/>
                            <span className="user-name">{this.props.profile.user.username}</span>
                            <span className="user-mail">{this.props.profile.user.email}</span>
                        </div>
                    </div>
                    <div className="mdl-layout__drawer">
                        <nav className="mdl-navigation ">
                        <a className="mdl-navigation__link animsition-link" href="#/main">
                            <FontAwesome name='home' size="2x" /><span className="menu-text">GlobalFeed</span>
                        </a>
                        <a className="mdl-navigation__link animsition-link" href="#/upload">
                            <FontAwesome name='upload' size="2x" /><span className="menu-text">Upload</span>
                        </a>
                        <div className="drawer-separator"></div>
                        <div className="mdl-collapse">
                            <a
                                onClick={() => this.logout(this.props.profile.accessToken.id)}
                                className="mdl-navigation__link animsition-link">
                                <FontAwesome name='mail-reply' size="2x" />
                                <span className="menu-text">Logout</span>
                            </a>
                        </div>
                    </nav>
                    </div>
                </div>;
        return (
            <Sidebar
                sidebarClassName="side-menu"
                sidebar={sidebarContent}
                open={this.state.sidebarOpen}
                onSetOpen={() => this.onSetSidebarOpen()}>
                <Header/>
                <div>
                    {this.props.children}
                </div>
                <Button
                    bsStyle='primary'
                    id="menu-button"
                    onClick={() => this.onPressMenu()}>
                    <FontAwesome name='bars' size="2x" />
                </Button>
            </Sidebar>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...LoginActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);