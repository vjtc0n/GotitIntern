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
        let sidebarContent = <div className="col-lg-8">
                                <b>Sidebar content</b>
                                <div><a href="#/main">GlobalFeed</a></div>
                                <div><a href="#/upload">Upload</a></div>
                                <div className="log-out">
                                    <button onClick={() => this.logout(this.props.profile.accessToken.id)}>Logout</button>
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