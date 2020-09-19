import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {Title, Button} from 'react-native-paper';
// import SignatureCapture from '../../../ThirdPartyModuleJS/SignatureCapture';
import UUIDGenerator from 'react-native-uuid-generator';
// import { localeProperty } from 'app/config/i18n/i18n';
// import { attachmentsHelper } from 'app/api/helperServices';
import styles from './styles';

class Signature extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
  };

  constructor() {
    super();
    this.onSaveEvent = this.onSaveEvent.bind(this);
    this.onDragEvent = this.onDragEvent.bind(this);
    this.state = {uuid: ''};
  }
  ref;

  componentDidMount() {
    UUIDGenerator.getRandomUUID().then(uuid => {
      this.setState({uuid});
    });
  }

  onSaveEvent = result => {
    if (result.encoded) {
      this.props.onChange(result);
    }
  };

  onDragEvent = () => {};

  saveSign = () => {
    this.refs['sign'].saveImage();
  };

  resetSign = () => {
    this.refs['sign'].resetImage();
  };

  render() {
    if (!this.state.uuid) return null;

    const signature = this.props.value;
    const editable = !!this.props.editable;

    const doc = !editable && signature;
    //&& attachmentsHelper.verifyImageProperties(signature);

    return (
      <View style={styles.container}>
        <View style={styles.signatureCaptureWrapper}>
          {!editable && doc && signature && (
            <Image
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
              source={{uri: signature}}
            />
          )}
          {/* {editable && (
            <SignatureCapture
              style={styles.signature}
              ref="sign"
              onSaveEvent={this.onSaveEvent}
              onDragEvent={this.onDragEvent}
              saveImageFileInExtStorage={true}
              fileName={`${this.state.uuid}.png`}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            />
          )} */}
        </View>
        {editable && (
          <View style={styles.buttonWrapper}>
            <Button style={styles.resetBtn} onPress={this.resetSign}>
              <Text style={styles.resetBtnText}>{'Reset'}</Text>
            </Button>
            <Button style={styles.signatureBtnSave} onPress={this.saveSign}>
              <Text style={styles.signatureBtnSaveText}>{'Save'}</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

export default Signature;
