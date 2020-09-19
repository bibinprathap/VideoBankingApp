import React from 'react';
import { Text, View, ScrollView ,StyleSheet} from 'react-native';
import Thumbnail from './Thumbnail'; 
import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

//Todo: move to styles.js it is here for hotreloading
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 10,
    },
    containerInner: {
        justifyContent: 'flex-start',
    },
});

export default withNavigation(function({
    attachments,
    onPress,
    onRemove,
    editable,
    navigation,
    hideDelete,
    thumbnailType,
    thumbnailSize,
    enableGalleryView,
    selectedAttachment,
    vertical,
}) {
    handleOnPress = (doc, index) => {
        if (enableGalleryView) {
            navigation.navigate('attachments', {
                attachments: attachments,
                editable: false,
                selectedAttachment: doc,
            });
        } else if (onPress) onPress(doc);
    };

    handleOnRemovePress = doc => {
        if (onRemove) {
            onRemove(doc);
        }
    };

    const thumbnails =
        attachments &&
        attachments.map((attachment, index) => {
            return (
                <Animatable.View
                    key={attachment.path}
                    animation="fadeInUp"
                    duration={400}
                    useNativeDriver={true}
                    easing="ease-out"
                    delay={index ? index * 100 : 0}
                >
                    <Thumbnail
                        selected={attachment.path === (selectedAttachment && selectedAttachment.path)}
                        attachment={attachment}
                        editable={editable}
                        hideDelete={hideDelete}
                        thumbnailType={thumbnailType}
                        thumbnailSize={thumbnailSize}
                        index={index}
                        onRemove={handleOnRemovePress}
                        onPress={handleOnPress}
                    />
                </Animatable.View>
            );
        });

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerInner} horizontal={!vertical}>
            {thumbnails}
        </ScrollView>
    );
});
