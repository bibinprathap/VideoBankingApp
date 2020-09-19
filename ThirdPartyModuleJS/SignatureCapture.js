import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, UIManager, DeviceEventEmitter, ViewPropTypes, findNodeHandle } from 'react-native';

class SignatureCapture extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.subscriptions = [];
    }

    onChange(event) {
        if (event.nativeEvent.pathName) {
            if (!this.props.onSaveEvent) {
                return;
            }
            this.props.onSaveEvent({
                pathName: event.nativeEvent.pathName,
                encoded: event.nativeEvent.encoded,
            });
        }

        if (event.nativeEvent.dragged) {
            if (!this.props.onDragEvent) {
                return;
            }
            this.props.onDragEvent({
                dragged: event.nativeEvent.dragged,
            });
        }
    }

    componentDidMount() {
        if (this.props.onSaveEvent) {
            let sub = DeviceEventEmitter.addListener('onSaveEvent', this.props.onSaveEvent);
            this.subscriptions.push(sub);
        }

        if (this.props.onDragEvent) {
            let sub = DeviceEventEmitter.addListener('onDragEvent', this.props.onDragEvent);
            this.subscriptions.push(sub);
        }
    }

    componentWillUnmount() {
        this.subscriptions.forEach(sub => sub.remove());
        this.subscriptions = [];
    }

    render() {
        return <RSSignatureView {...this.props} onChange={this.onChange} />;
    }

    saveImage() {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), UIManager.getViewManagerConfig('RSSignatureView').Commands.saveImage, []);
    }

    resetImage() {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), UIManager.getViewManagerConfig('RSSignatureView').Commands.resetImage, []);
    }
}

SignatureCapture.propTypes = {
    ...ViewPropTypes,
    rotateClockwise: PropTypes.bool,
    square: PropTypes.bool,
    saveImageFileInExtStorage: PropTypes.bool,
    viewMode: PropTypes.string,
    showBorder: PropTypes.bool,
    showNativeButtons: PropTypes.bool,
    showTitleLabel: PropTypes.bool,
    maxSize: PropTypes.number,
    minStrokeWidth: PropTypes.number,
    maxStrokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fileName: PropTypes.string,
};

var RSSignatureView = requireNativeComponent('RSSignatureView', SignatureCapture, {
    nativeOnly: { onChange: true },
});

module.exports = SignatureCapture;
