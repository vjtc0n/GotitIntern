/**
 * Created by vjtc0n on 1/31/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchPhotoAction, searchNextPageAction} from '../actions/PostActions';
import Dropzone from 'react-dropzone'
import { Line, Circle } from 'rc-progress';

import * as config from '../../api/config'
var baseUrl = config.baseUrl;
import * as PostActions from '../actions/PostActions';

class UploadPictureContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            progress: 0,
            isProgressBarShown: false,
            caption: '',
            error: null,
            disableUploadButton: true
        }
    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles)
        this.setState({
            files: acceptedFiles
        });
    }

    onOpenClick() {
        let URL = baseUrl + '/containers/container1/upload?access_token=' + this.props.profile.accessToken.id
        //let URL = 'https://posttestserver.com/post.php'
        this.setState({
            isProgressBarShown: true
        })
        return new Promise((resolve, reject) => {
            let imageFormData = new FormData();

            imageFormData.append('imageFile', this.state.files[0]);
            let self = this;
            let xhr = new XMLHttpRequest();

            xhr.open('post', URL, true);
            xhr.upload.onprogress = function(e) {
                let progress = 0;
                //console.log(e)
                if (e.total !== 0) {
                    progress = parseInt(e.loaded / e.total * 100, 10);
                    //console.log(progress)
                    self.setState({
                        progress: progress
                    })
                }
            };

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    console.log(xhr.responseText);
                    self.refs.keyword.value=""
                    console.log((self.state.files[0].size)/(1024*1024).toString())
                    self.props.actions.savePost({
                        userId: self.props.profile.user.userId,
                        extension: self.state.files[0].type,
                        caption: self.state.caption,
                        imgUrl: baseUrl + '/containers/container1/download/' + self.state.files[0].name,
                        size: (self.state.files[0].size)/(1024*1024).toString()
                    }, self.props.profile.accessToken.id)
                        .then(() => {
                            self.setState({
                                isProgressBarShown: false,
                                progress: 0,
                                files: [],
                                caption: null,
                                disableUploadButton: true
                            })
                        })
                }
            };

            xhr.send(imageFormData);

        });
    }

    handleChange(event) {
        this.setState({
            caption: event.target.value
        }, () => {
            if (this.state.caption.length < 3) {
                this.setState({
                    error: 'error',
                    disableUploadButton: true
                })
            } else  {
                this.setState({
                    error: null,
                    disableUploadButton: false
                })
            }
        });
    }

    render() {
        let error = null;
        if (this.state.error != null) {
            error = <div style={{color: "red"}}>You must provide at least 3 characters</div>
        }

        let imageInsideDropZone = null
        if (this.state.files.length > 0) {
            imageInsideDropZone = <div>{this.state.files.map((file, index) => <img key={index} src={file.preview} /> )}</div>
        } else {
            imageInsideDropZone = <div>
                <div><img className="img_dropzone" src="http://d13yacurqjgara.cloudfront.net/users/3463/screenshots/1348939/direct_icon.png" /></div>
                <div className="des_drop_zone">Try dropping some files here, or click to select files to upload.</div>
            </div>
        }
        return (
            <div className="upload-container">
                <textarea
                    type="text" ref="keyword"
                    className="form-control input-lg text_description"
                    placeholder="What do you think?"
                    onChange={(event) => this.handleChange(event)}
                    defaultValue={this.state.caption}/>
                {error}
                <div style={{display: this.state.isProgressBarShown ? 'block' : 'none' }}>
                    <Line percent={this.state.progress} strokeWidth="3" strokeColor="#4286f4" />
                </div>
                <Dropzone
                    className="drop_zone"
                    ref={(node) => { this.dropzone = node }}
                    onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}>
                    {imageInsideDropZone}
                </Dropzone>
                <div className="row upload_btn">
                    <div className="col-md-12">
                        <button disabled={this.state.disableUploadButton}
                                onClick={() => this.onOpenClick()} type="button"
                                className="btn btn-default btn-lg btn-block">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(UploadPictureContainer)