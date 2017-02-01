/**
 * Created by vjtc0n on 1/31/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchPhotoAction, searchNextPageAction} from '../actions/SearchActions';
import Dropzone from 'react-dropzone'
import { Line, Circle } from 'rc-progress';

class UploadPictureContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            progress: 0,
            isProgressBarShown: false
        }
    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles)
        this.setState({
            files: acceptedFiles
        });
    }

    onOpenClick() {
        let URL = 'http://192.168.1.73:3000/api/containers/container1/upload?access_token=123'
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
                console.log(e)
                if (e.total !== 0) {
                    progress = parseInt(e.loaded / e.total * 100, 10);
                    console.log(progress)
                    self.setState({
                        progress: progress
                    })
                }
            };

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    console.log(xhr.responseText);
                    self.setState({
                        isProgressBarShown: false,
                        progress: 0
                    })
                }
            };

            xhr.send(imageFormData);

        });
    }

    render() {
        return (
            <div>
                <div>{this.state.progress}</div>
                <div style={{display: this.state.isProgressBarShown ? 'block' : 'none' }}>
                    <Line percent={this.state.progress} strokeWidth="3" strokeColor="#4286f4" />
                </div>
                <Dropzone
                    ref={(node) => { this.dropzone = node }}
                    onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button
                    type="button"
                    onClick={() => this.onOpenClick()}>
                    Upload
                </button>
                {
                    this.state.files.length > 0 ?
                    <div>
                        <h2>Uploading {this.state.files.length} files...</h2>
                        <div>{this.state.files.map((file, index) => <img key={index} src={file.preview} /> )}</div>
                    </div> : null
                }
            </div>
        )
    }
}

UploadPictureContainer.propTypes = {
    status: PropTypes.string.isRequired,
    photos: PropTypes.array,
    page: PropTypes.number
}

const mapStateToProps = (state, ownProps) =>
{
    return {
        photos: state.photos.photos,
        status: state.photos.status,
        page: state.photos.page,
        search: ownProps.params.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchPhotoAction, searchNextPageAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPictureContainer)