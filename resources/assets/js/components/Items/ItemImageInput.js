import React, {Component} from 'react'
import {
    getUploadedImageUrlFromState,
    getLoadingImageUploadFromState
} from '../../selectors/inventory/items';
import {connect}      from 'react-redux'
import {uploadImage} from '../../actions/inventory/items';
import PropTypes      from 'prop-types'

class ItemImageInput extends Component {

    static propTypes = {
        input: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        uploadedUrl: PropTypes.string.isRequired,
        form: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        url: PropTypes.string
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.uploadedUrl !== nextProps.uploadedUrl) {
            this.props.input.onChange(nextProps.uploadedUrl);
        }
    }

    onChange = (event) => {
        return this.props.uploadImage(event.target.files[0], 'image_url');
    }

    render() {
        return (
            <div className="upload-image">
                <label htmlFor={this.props.input.name}>
                    <input
                        id={this.props.input.name}
                        type="file"
                        onChange={(event) => this.onChange(event)}
                    />
                    <img
                        src={
                            this.props.input.value
                                ? this.props.input.value
                                : 'http://inventory.shoprachaels.com/storage/violette.jpg'
                        }
                        className="img-thumbnail col-md-12"/>
                    {this.props.loading ?
                        <div className="floaty-upload-loading col-md-12">
                            <div className="helper"></div>
                            <span
                                className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
                        </span>
                        </div> :
                        <div className="floaty-upload-plus col-md-12">
                            <div className="helper"></div>
                            <span
                                className="glyphicon glyphicon-plus-sign">
                        </span>
                        </div>
                    }
                </label>
            </div>
        );
    }
}

const makeMapStateToProps = (state) => {
    return {
        uploadedUrl: getUploadedImageUrlFromState(state, 'image_url'),
        loading: getLoadingImageUploadFromState(state)
    };
}

const mapDispatchToProps = (dispatch) => ({
    uploadImage(file, key) {
        return dispatch(uploadImage(file, key))
    }
})

export default connect(makeMapStateToProps, mapDispatchToProps)(ItemImageInput)