import React, { Component } from 'react';
import { View } from 'react-native';
import Spinner from './Spinner';

/**
 *   Simple component, if loading is true,shows the spinner,
 *  else, the children
 *  props:
 *    spinnerSize
 *    spinnerStyle
 *    loading: if we are loading or not
 */

const Loader = props => {
    if (props.loading) return <Spinner size={props.sprinnerSize || 'large'} spinnerStyle={props.spinnerStyle} {...props} />;

    return <View>{props.children}</View>;
};

export default Loader;
