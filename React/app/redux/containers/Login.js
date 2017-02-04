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
                                cssClass="btn facebook-login"
                                textButton='Facebook'
                                icon='fa-facebook'
                                size='small'
                                appId="253580248403665"
                                autoLoad={false}
                                fields="name,email,picture.width(200).height(200)"
                                scope="public_profile,user_friends,user_actions.books"
                                callback={this.responseFacebook}
                            />
        if (this.props.load.loading == true) {
            return <nav>Loading...</nav>
        } else {
            facebookLoading = <FacebookLogin
                                cssClass="btn facebook-login"
                                textButton='Facebook'
                                icon='fa-facebook'
                                size='small'
                                appId="253580248403665"
                                autoLoad={false}
                                fields="name,email,picture.width(200).height(200)"
                                scope="public_profile,user_friends,user_actions.books"
                                callback={this.responseFacebook}
                            />
        }

        return (
            <nav>
                <nav className="wrapper_container">
                    <nav className="container_inner _3mng4">
                        <nav className="content_text">
                            <img className="content_img" src="//instagramstatic-a.akamaihd.net/h1/images/homepage/screenshot1-2x.jpg/2debbd5aaab8.jpg"/>
                            <img className="content_img" src="//instagramstatic-a.akamaihd.net/h1/images/homepage/screenshot2-2x.jpg/783de51ff073.jpg"/>
                            <img className="content_img" src="//instagramstatic-a.akamaihd.net/h1/images/homepage/screenshot3-2x.jpg/48fc753e7712.jpg"/>
                            <img className="content_img" src="//instagramstatic-a.akamaihd.net/h1/images/homepage/screenshot4-2x.jpg/8e431a88ffdd.jpg"/>
                            <img className="content_img" src="//instagramstatic-a.akamaihd.net/h1/images/homepage/screenshot5-2x.jpg/9cb9ba2dda6a.jpg"/>
                        </nav>
                    </nav>
                    <nav className="container_right _p8ymb">
                        <nav className="_nvyyp">
                            <h1 className="_du7bh _soakw coreSpriteLoggedOutWordmark">Picuni</h1>
                            <nav>
                                <span className="_6jtqn _c8lcn _7k49n _hvnxx">
                                    {facebookLoading}
                                </span>
                            </nav>
                        </nav>


                        <nav className="_m8ogu">
                            <p className="_gnsgq">Tải ứng dụng.</p>
                            <nav className="_rwl8x">
                                <a className="_okmo7" href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.unifiedHome.badge&amp;mt=8">
                                    <img className="_t5w1b" alt="Có sẵn trên App Store" src="//instagramstatic-a.akamaihd.net/h1/images/appstore-install-badges/badge_ios_vietnamese-vi.png/e806481bc99e.png"/>
                                </a>
                                <a className="_okmo7" href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DunifiedHome%26utm_medium%3Dbadge">
                                    <img className="_t5w1b" alt="Có sẵn trên Google Play" src="//instagramstatic-a.akamaihd.net/h1/images/appstore-install-badges/vi_generic_rgb_wo.png/98365e2c820b.png"/>
                                </a>
                            </nav>
                        </nav>


                    </nav>
                </nav>
                <nav className="_oofbn" role="contentinfo">
                    <nav className="_mhrsk _pcuq6">
                        <nav className="_p1gbi" role="navigation">
                            <ul className="_fh0f2">
                                <li className="_fw3ds"><a href="#">Giới thiệu về chúng tôi</a></li>
                                <li className="_fw3ds"><a href="#">Hỗ trợ</a></li>
                                <li className="_fw3ds"><a href="#">Blog</a></li>
                                <li className="_fw3ds"><a href="#">Báo chí</a></li>
                                <li className="_fw3ds"><a href="#/">API</a></li>
                                <li className="_fw3ds"><a href="#">Việc làm</a></li>
                                <li className="_fw3ds"><a href="#">Quyền riêng tư</a></li>
                                <li className="_fw3ds"><a href="#">Điều khoản</a></li>
                            </ul>
                        </nav>
                    </nav>
                </nav>
            </nav>
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
