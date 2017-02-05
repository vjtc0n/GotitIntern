/**
 * Created by vjtc0n on 2/3/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as PostActions from '../actions/PostActions';
import FontAwesome from 'react-fontawesome'

class DetailPostContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            post: {
                caption: 'loading',
                imgUrl: 'http://www.staciemincherdesigns.com/wp-content/uploads/2016/11/sample-post.jpg',
                user: {
                    avatar_picture: 'https://ab-prod-media-assets.s3.amazonaws.com/1/profile_pictures/raghavender-mittapalli/raghavender-mittapalli-present.png',
                    username: 'loading'
                },
                extension: 'loading',
                size: 'loading'
            }
        }
    }

    /*
    *
    * Loading new data of detail of a post in the first render
    *
    * */

    componentDidMount() {
        console.log(this.props.postId)
        this.props.actions.getDetailPost(this.props.postId)
            .then(() => {
                this.setState({
                    post: this.props.post.detail_post
                })
            })
    }

    /*
    * Back to GlobalFeed
    * */

    onBackPress(event) {
        event.preventDefault();
        this.context.router.goBack()
    }

    render() {
        console.log(this.state.post.user.avatar_picture)
        return (
            <main className="mdl-layout__content" style={{marginTop: 100}}>
                <button id="button-back" onClick={(event) => this.onBackPress(event)}>
                    <FontAwesome name='angle-left' size="2x" />
                </button>
                <div className="mdl-cell mdl-cell--6-col center_row">
                    <div className="mdl-card imaged mdl-shadow--2dp card_block">
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600 ">
                            <div className="minilogo users">
                                <img src={this.state.post.user.avatar_picture} alt=""/>
                            </div>
                            <div className="card-author">
                                <span><strong>{this.state.post.user.username}</strong></span>
                                <span>6 days ago</span>
                            </div>
                        </div>
                        <div className="mdl-card__title">
                            <a href="article.html">
                                <img src={this.state.post.imgUrl} alt=""/>
                            </a>
                        </div>
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                            <i className="mdl-icon-toggle__label material-icons">favorite</i>
                            <i className="mdl-icon-toggle__label material-icons">comment-outline</i>
                            <i className="mdl-icon-toggle__label material-icons">share</i>
                        </div>

                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                            {this.state.post.caption}
                        </div>
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                            <span
                                aria-hidden="true"
                                style={{marginRight: 10}}
                                className="fa fa-file-o fa-2x"><span className="detail-text">{this.state.post.extension}</span></span>
                            <span aria-hidden="true" className="fa fa-archive fa-2x"><span className="detail-text">{this.state.post.size + 'MB'}</span></span>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

DetailPostContainer.contextTypes = {
    router: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,
        post: state.post,
        postId: ownProps.params.postId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...PostActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostContainer);
