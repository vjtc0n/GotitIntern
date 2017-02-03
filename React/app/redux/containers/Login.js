/**
 * Created by vjtc0n on 2/1/17.
 */
import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {browserHistory} from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as API from '../../api/Backend'

import * as LoginActions from '../actions/LoginAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state= {

        }
    }

    responseFacebook = (response) => {
        console.log(response);
        var self = this;
        this.props.actions.saveTokenToServer({
            id: response.accessToken,
            ttl: response.expiresIn,
            userId: response.userID
        })
            .then(() => {
                API.checkUserExist(response.userID)
                    .then((json) => {
                        if (json.exists == true) {
                            this.props.actions.saveProfileToServer(response.userID, {
                                username: response.name,
                                avatar_picture: response.picture.data.url,
                            }, response.accessToken)
                                .then(() => {
                                    localStorage.setItem('profile', JSON.stringify(self.props.profile));
                                    hashHistory.replace('/main')
                                })
                        } else {
                            this.props.actions.insertProfileToServer({
                                username: response.name,
                                avatar_picture: response.picture.data.url,
                                password: response.accessToken.slice(0, 12),
                                email: response.email,
                                userId: response.userID
                            })
                                .then(() => {
                                    localStorage.setItem('profile', JSON.stringify(self.props.profile));
                                    hashHistory.replace('/main')
                                })
                        }
                    })
            })
    };

    render() {
        let facebookLoading = <FacebookLogin
                                cssClass="btn"
                                textButton='Facebook'
                                icon='fa-facebook'
                                size='small'
                                appId="253580248403665"
                                autoLoad={true}
                                fields="name,email,picture.width(200).height(200)"
                                scope="public_profile,user_friends,user_actions.books"
                                callback={this.responseFacebook}
                            />
        if (this.props.load.loading == true) {
            return <div>Loading...</div>
        } else {
            facebookLoading = <FacebookLogin
                                cssClass="btn"
                                textButton='Facebook'
                                icon='fa-facebook'
                                size='small'
                                appId="253580248403665"
                                autoLoad={true}
                                fields="name,email,picture.width(200).height(200)"
                                scope="public_profile,user_friends,user_actions.books"
                                callback={this.responseFacebook}
                            />
        }

        return (
            <div>
                {facebookLoading}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        load: state.asyncInitialState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...LoginActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
