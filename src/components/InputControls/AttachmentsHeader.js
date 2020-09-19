import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
//import { connect } from 'react-redux';
import { Button, Appbar, Text } from 'react-native-paper';
 import styles from './styles';

class AttachmentsHeader extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    goBack = () => {
        /*
            RJ: There is a bug in react-navigation.
                call to navigation.setParams() from the screen component doesn't update the navigation state (that is accessible to the header)
                workarounds mentioned in the below threads do not work for me for whatever reason.
                    //https://github.com/react-navigation/react-navigation/issues/1529
                    //https://stackoverflow.com/questions/47093555/why-is-my-this-props-navigation-setparams-not-working
                but the updated params end up in this.props.scene.route.params
                so instead of this.props.navigation.getParam('onScreenClose');
                we access the param by --> this.props.scene.route.params.onScreenClose;
        */

        const { onScreenClose, onClose } = this.props;

        if (onScreenClose) onScreenClose();
        else {
            if (onClose) onClose();
        }
    };

    handleCropRotate = () => {
        const { onCropRotate, selectedAttachment } = this.props;
        if (onCropRotate) onCropRotate();
    };
    handleImageRemove = () => {
        const { handleImageRemove, selectedAttachment } = this.props;
        if (handleImageRemove) handleImageRemove(selectedAttachment);
    };

    handleDrawOnImage = () => {
        // const { scene } = this.props;
        const { onDrawOnImage } = this.props;
        if (onDrawOnImage) onDrawOnImage();
    };

    render() {
        const { navigationTitle, selectedAttachment, editable, currentInspection } = this.props;

        let title = 'Attachments';
        if (navigationTitle) {
            title = navigationTitle;
        }

        return (
            <Appbar style={styles.appBar}>
                <View style={styles.startContainer}>
                    <Appbar.BackAction onPress={this.goBack} color={styles.icon.color} />
                    <Appbar.Content title={title} titleStyle={styles.contentTitle} style={styles.contentContainer} />
                </View>
                {editable && (
                    <View style={styles.endContainer}>
                        {!!selectedAttachment && <Appbar.Action icon="delete" onPress={this.handleImageRemove} color={styles.icon.color} />}
                        {!!selectedAttachment && <Appbar.Action icon="crop-rotate" onPress={this.handleCropRotate} color={styles.icon.color} />}
                        {!!selectedAttachment && <Appbar.Action icon="edit" onPress={this.handleDrawOnImage} color={styles.icon.color} />}
                    </View>
                )}
            </Appbar>
        );
    }
}

export default AttachmentsHeader;
