import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './styles';

const IdScanHeader = props => {
    backAction = () => {
        if (props.backAction) {
            props.backAction();

        } else if (props.navigation) {
            props.navigation.pop();
        }
        return null;
    };

    return (
        <Appbar style={styles.appBar}>
            <View style={styles.containerGeneric}>
                <Appbar.BackAction onPress={this.backAction} color={styles.icon.color} />
                {props.title && <Appbar.Content title={props.title} titleStyle={styles.contentTitle} style={styles.contentContainer} />}
                {props.isScaning ? (
                    <Appbar.Action color={styles.icon.color} icon={props.flashOn ? 'flash-on' : 'flash-off'} onPress={props.flashButtonClick} />
                ) : (
                    <Appbar.Action color={styles.icon.color} icon="refresh" onPress={props.ReScanButtonClick} />
                )}
            </View>
        </Appbar>
    );
};

export default IdScanHeader;
