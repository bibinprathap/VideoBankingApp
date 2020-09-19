import React, { Component } from 'react';
import { Modal, StatusBar, View, Text } from 'react-native';
  
class ModalComponent extends Component {
    
 

    render() {
        const { children, ...otherProps } = this.props;

        return (
            <Modal {...otherProps}>
                 
                 {children}
            </Modal>
        );
 
    }
}

mapStateToProps = state => {
    return {
         
    };
};
export default ModalComponent;
