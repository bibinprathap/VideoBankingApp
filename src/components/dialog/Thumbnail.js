import React, { Component } from 'react';  
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon/Icon';
import Image from '../Image/Image';
import styles from './styles';

export default class Thumbnail extends React.PureComponent {
    static propTypes = {
        attachment: PropTypes.object,
        hideDelete: PropTypes.bool,
        thumbnailSize: PropTypes.string,
        thumbnailType: PropTypes.string,
        aspectRatio: PropTypes.string,
        onPress: PropTypes.func,
        onRemove: PropTypes.func,
    };
    handleOnPress = () => {
        if (this.props.onPress) this.props.onPress(this.props.attachment);
    };

    render() {
        const { attachment, ...rest } = this.props;
        if (typeof attachment === 'undefined') return null;
        //if (attachment && attachment.mediaType == 'image') return this.renderImage(attachment, rest);
        if (attachment) return this.renderImage(attachment, rest);
        else {
            return (
                <View style={{ borderWidth: 1, borderColor: 'red', margin: 5 }}>
                    <Text style={{ color: 'white' }}>Todo: handle mediaType {attachment.mediaType}</Text>
                </View>
            );
        }
    }

    renderImage = (image, { aspectRatio = 'auto', editable = false, hideDelete = false, thumbnailType = 'default', thumbnailSize = 'large' }) => {
        if (!image)
            return <Icon type="MaterialCommunityIcons" name="image-broken-variant" color={styles.brokenImageIcon.color} size={containerHeight / 2} />;
        if (!!image) {
            const imageStyles = {};
            switch (thumbnailSize) {
                case 'large':
                    imageStyles.width = 100;
                    imageStyles.height = 100;
                    break;
                case 'extralarge':
                    imageStyles.width = 250;
                    imageStyles.height = 250;
                    imageStyles.marginRight = 5;
                    imageStyles.marginBottom = 5;
                    break;
                case 'medium':
                    imageStyles.width = 50;
                    imageStyles.height = 50;
                    break;
                case 'small':
                    imageStyles.width = 35;
                    imageStyles.height = 35;
                    break;
                default:
                    imageStyles.width = 70;
                    imageStyles.height = 70;
                    break;
            }

            switch (thumbnailType) {
                case 'rounded':
                    imageStyles.borderRadius = imageStyles.width / 2;
                    break;
                default:
                    imageStyles.borderRadius = 5;
                    break;
            }
            let isPdf = false;
            if (image.attachmentTitle) isPdf = image.attachmentTitle.toLowerCase().indexOf('.pdf') > -1;
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.handleOnPress}>
                        <View style={[styles.innerContainer]}>
                            {isPdf ? (
                                <View
                                    style={[
                                        imageStyles,
                                        { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#cccccc' },
                                        (this.props.selected && styles.selectedImage) || null,
                                    ]}
                                >
                                    <Icon type="MaterialCommunityIcons" name="file-pdf" style={{ color: 'red' }} size={60} />
                                </View>
                            ) : (
                                <Image
                                    style={[imageStyles, (this.props.selected && styles.selectedImage) || null]}
                                    resizeMode={'cover'}
                                    attachmenturi={image.path}
                                    metadata={image}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    };
}
