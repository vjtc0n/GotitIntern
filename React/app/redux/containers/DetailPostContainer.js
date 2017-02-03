/**
 * Created by vjtc0n on 2/3/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as PostActions from '../actions/PostActions';

class DetailPostContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {

        }
    }

    componentDidMount() {
        console.log(this.props.postId)
    }

    render() {
        return (
            <div className="detail-post">ABC</div>
        )
    }
}

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