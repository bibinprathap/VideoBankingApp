import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback,StyleSheet,Platform,TouchableHighlight } from 'react-native';
import {Modal} from '../Modal';
import Image from '../Image/Image'
import { Icon} from '../Icon/index'
 
import AttachmentList from  './AttachmentList'
import Attachments from  './Attachments' 

export default function(props) {
    const [isDialogVisible, toggleDialog] = useState(false);
    const [selectedAttachment, selectAttachment] = useState(undefined);
    const { editable, attachments } = props;

    const handleCameraPressed = () => {
        toggleDialog(!isDialogVisible);
    };

    const handleOnClose = () => {
        const { onClose } = props;
        toggleDialog(false);
        if (typeof onClose === 'function') onClose();
    };

    const handleOnCancel = () => {
        const { onCancel } = props;
        toggleDialog(false);
        if (typeof onCancel === 'function') onCancel();
    };

    const handleThumbnailPressed = doc => {
        selectAttachment(doc);
        toggleDialog(true);
    };

    const renderAddPictureButton = () => {

        if (Platform.OS === 'android') {
            return (
                <View style={styles.buttonContainer}>
                <TouchableNativeFeedback onPress={handleCameraPressed}>
                    <Icon type="MaterialCommunityIcons" name="camera" size={44} color="#ff0000"   />
                </TouchableNativeFeedback>
            </View> 
            )
         } else {
            return (  <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={handleCameraPressed}>
                    <Icon type="MaterialCommunityIcons" name="camera" size={44} color="#ff0000"   />
                </TouchableHighlight>
            </View>  )
         }
 
    };
    if (isDialogVisible) {
        return (
            <Modal animationType="slide" transparent={false} visible={isDialogVisible} onRequestClose={handleOnCancel}>
                <Attachments {...props} onClose={handleOnClose} selectedAttachment={selectedAttachment} />
            </Modal>
        );
    } else {
        if (!attachments || !attachments.length) {
            return (
                <View style={styles.outerContainerNoAttachment}>
                    {editable && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{renderAddPictureButton()}</View>}
                </View>
            );
        } else {
            return (
                <View style={styles.outerContainerNoAttachment}>
                    <View style={styles.outerContainerWithAttachment}>
                        <AttachmentList {...props} onPress={handleThumbnailPressed} />
                    </View>
                    <View style={styles.buttonWithAttachmentsContainer}>{editable && renderAddPictureButton()}</View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    outerContainerNoAttachment: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    outerContainerWithAttachment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWithAttachmentsContainer: {
        flex: 1,
        maxWidth: 70,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        borderColor: '#CFD0D3',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
        borderRadius: 10,
    },
    emptyAttachmentListMessage: {
        fontSize: 18,
        color: '#454F63',
    },
});
