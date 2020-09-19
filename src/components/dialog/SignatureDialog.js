import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import HeaderGeneric from '../InputControls/HeaderGeneric';
import {Modal} from '../Modal';
import Signature from '../InputControls/Signature';
class SignatureDialog extends Component {
  onRequestClose = () => {
    const {onRequestClose} = this.props;
    if (typeof onRequestClose === 'function') onRequestClose();
  };

  onChange = async signature => {
    const {onAddSignature} = this.props;

    if (signature && signature.pathName) {
      const path = `file://${signature.pathName}`;

      if (typeof onAddSignature === 'function') onAddSignature(path);
    }
  };

  render() {
    const {visible = false, editable = true, value} = this.props;

    const config = {};

    const title = this.props.title ? this.props.title : 'signature';
    if (visible) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.onRequestClose}>
          {/* <HeaderGeneric backAction={() => setModalVisible(false)} title={strings('reconciliation')} /> */}
          <HeaderGeneric backAction={this.onRequestClose} title={title} />
          <ScrollView style={styles.reconciliationWrapper}>
            <View style={styles.agrementWrapper}>
              <Text style={styles.signTitle}>{'signature'}</Text>
            </View>
            <Signature
              editable={editable}
              onChange={this.onChange}
              value={value}
              config={config}
            />
            {/* <ReconcileInfoForm editable={!reconciled} vales={{ signature }} formName="reconcileInfo" onFormChange={handleReconcileInfoChange} /> */}
          </ScrollView>
        </Modal>
      );
    } else return null;
  }
}

export default SignatureDialog;

const styles = StyleSheet.create({
  reconciliationWrapper: {
    flex: 1,
    margin: 5,
  },
  agrementWrapper: {
    margin: 5,
  },
  signTitle: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: 'bold',
  },
});
