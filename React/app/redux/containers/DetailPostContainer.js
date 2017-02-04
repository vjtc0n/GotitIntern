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

    componentDidMount() {
        console.log(this.props.postId)
        this.props.actions.getDetailPost(this.props.postId)
            .then(() => {
                this.setState({
                    post: this.props.post.detail_post
                })
            })
    }

    onBackPress(event) {
        event.preventDefault();
        this.context.router.goBack()
    }

    render() {
        console.log(this.state.post.user.avatar_picture)
        return (
            <div className="detail-post">
                <button onClick={(event) => this.onBackPress(event)}>
                    <FontAwesome name='angle-left' size="2x" />
                </button>
                <img src={this.state.post.user.avatar_picture} alt=""/>
                <div>{this.state.post.user.username}</div>
                <div>{this.state.post.caption}</div>
                <img src={this.state.post.imgUrl} alt=""/>
                <div>{this.state.post.extension}</div>
                <div>{this.state.post.size + ' MB'}</div>
            </div>
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