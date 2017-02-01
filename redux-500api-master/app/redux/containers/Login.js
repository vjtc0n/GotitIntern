/**
 * Created by vjtc0n on 2/1/17.
 */
import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {browserHistory} from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state= {}
    }


    responseFacebook = (response) => {
        console.log(response);
        hashHistory.replace('/search')
    };

    render() {
        return (
            <div>
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
            </div>
        )
    }
}
