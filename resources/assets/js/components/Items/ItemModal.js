import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';

export default class ItemModal extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
        buttonAction: PropTypes.func.isRequired,
        description: PropTypes.element,
    }

    render() {
        return (
            <Modal
                show={this.props.open}
                onHide={this.props.onClose}
                aria-labelledby="ModalHeader"
            >
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.props.buttonAction}>
                        {this.props.buttonText}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}