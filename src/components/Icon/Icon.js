import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class Icon extends Component {
    render() {
        return <MaterialCommunityIcons {...this.props} />;
    }
}
class IconButton extends Component {
    render() {
        return <MaterialCommunityIcons.Button {...this.props}>{children}</MaterialCommunityIcons.Button>;     
    }
}
export { Icon, IconButton };
