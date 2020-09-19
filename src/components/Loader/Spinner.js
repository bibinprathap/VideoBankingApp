import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

/**
 *    Spinner just an animation to load
 *      props:
 *        spinnerStyle : to modify style
 *        size: small, large, or check docs of react Native for ActivituyINdicator
 */
const Spinner = props => {
    return (
        <View style={[styles.spinnerStyle, props.spinnerStyle]}>
            <ActivityIndicator size={props.size || 'large'} />
        </View>
    );
};

export default Spinner;
