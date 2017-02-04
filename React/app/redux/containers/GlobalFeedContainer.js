/**
 * Created by vjtc0n on 2/3/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as PostActions from '../actions/PostActions';
import InfiniteScroll from 'react-infinite-scroller';
import ReactPullToRefresh from 'react-pull-to-refresh'
import { Link, hashHistory} from 'react-router'

class GlobalFeedContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            posts: [],
            limit: 10,
            pullToRefresh: true
        }
    }

    componentDidMount() {
        this.getFeed(this.state.limit)
    }

    getFeed(limit) {
        this.props.actions.getPost(this.props.profile.accessToken.id, limit)
            .then(() => {
                this.setState({
                    posts: this.props.post.posts,
                    limit: this.state.limit + 10
                })
            })
    }

    handleRefresh(resolve, reject) {
        this.setState({
            limit: 10,
            pullToRefresh: true
        }, () => {
            this.props.actions.getPost(this.props.profile.accessToken.id, this.state.limit)
                .then(() => {
                    this.setState({
                        posts: this.props.post.posts,
                        pullToRefresh: false
                    })
                })
        })
    }

    onPostPress(item, event) {
        event.preventDefault();
        console.log(item)
        //hashHistory.push('/main/post/' + item.postId)
        this.context.transitionRouter.show({
            pathname: '/main/post/' + item.postId,
            state: {
                showTransition: {
                    transitionName: 'show-from-top',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                },
                dismissTransition: {
                    transitionName: 'dismiss-from-top',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                },
            },
        });
    }

    render() {
        return (
            <ReactPullToRefresh
                onRefresh={this.handleRefresh.bind(this)}
                distanceToRefresh={55}
                style={{
                    textAlign: 'center'
                }}>
                <div>
                    <div>
                        {
                            this.state.posts.map((item, index)=> {
                                return (
                                <main
                                    key={`PhotoItem_${item.id}_${index}`}
                                    className="mdl-layout__content">
                                    <div className="mdl-cell mdl-cell--6-col center_row">
                                        <div
                                            onClick={(event) => this.onPostPress(item, event)}
                                            className="mdl-card imaged mdl-shadow--2dp card_block">
                                            <div className="mdl-card__supporting-text mdl-color-text--grey-600 ">
                                                <div className="minilogo users">
                                                    <img src={item.user.avatar_picture} alt=""/>
                                                </div>
                                                <div className="card-author">
                                                    <span><strong>{item.user.username}</strong></span>
                                                    <span>6 days ago</span>
                                                </div>
                                            </div>
                                            <div className="mdl-card__title">
                                                <a>
                                                    <img src={item.imgUrl} alt=""/>
                                                </a>
                                            </div>
                                            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                                                <i className="mdl-icon-toggle__label material-icons">favorite</i>
                                                <i className="mdl-icon-toggle__label material-icons">comment-outline</i>
                                                <i className="mdl-icon-toggle__label material-icons">share</i>
                                            </div>

                                            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                                                {item.caption}
                                            </div>
                                        </div>
                                    </div>
                                </main>

                                )
                            })
                        }
                        <div className="cleafix"/>
                    </div>

                    {this.props.post.status == 'DONE' &&
                    <div style={{marginBottom: '20px'}} className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <button onClick={this.getFeed.bind(this, this.state.limit)} type="button"
                                    className="btn btn-default btn-lg btn-block">
                                Load more
                            </button>
                        </div>
                    </div>
                    }

                    {this.props.post.status == 'PENDING' &&
                        <div className="loading"></div>
                    }
                </div>
            </ReactPullToRefresh>
        )
    }
}

GlobalFeedContainer.contextTypes = {
    transitionRouter: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...PostActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalFeedContainer);