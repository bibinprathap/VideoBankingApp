import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../Component/Header';
import {PrimaryColor} from '../Config';
import DownloadImage from '../../../assets/Download.png';
import GalleryImage from '../../../assets/Close.png';
import alertsHelper from '../../api/helperServices/alerts';
// import SignatureDialog from '../dialog/SignatureDialog';
import SignatureCapture from 'react-native-signature-capture';

import {connect} from 'react-redux';
import uploadHelper from '../../api/helperServices/upload';
import {infoChanged} from '../../redux/actions/bankProfileActions';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';

class DigitalScreen extends Component {
  constructor(props) {
    super(props);
    let image = null;

    // if (props.customersignature) {
    //   image = props.attachments.find(
    //     a => a.customUploadId == props.customersignature,
    //   ).uri;
    // }
    this.state = {
      signatureAttachment: null,
      signatureDialogVisible: false,
      base64: image,
    };
  }

  componentDidMount() {
    // console.log(this.state.base64, 'base64');
  }
  handleSignatureDialogRequestClose = obj => {
    this.setState({signatureDialogVisible: false});
  };
  handleSignatureDialogRequestOpen = obj => {
    this.setState({signatureDialogVisible: true});
  };

  handleOnAddSignature = signatureAttachment => {
    this.setState({signatureDialogVisible: false, signatureAttachment});
  };

  saveSign = () => {
    this.refs['sign'].saveImage();
  };

  resetSign = () => {
    this.refs['sign'].resetImage();
    this.setState({base64: ''});
  };

  _onSaveEvent = result => {
    const uri = `file://${result.pathName}`;

    this.setState({base64: uri});

    uploadHelper
      .startUpload(
        uri,
        null,
        'api/Users/UploadSignature?UserId=' + this.props.userID,
        '',
      )
      .then(() => {
        const {language} = this.props;
        if (language != 'English')
          alertsHelper.show(
            'success',
            'نجاح',
            'التوقيع',
            'تم التقاط التوقيع بنجاح',
          );
        else
          alertsHelper.show(
            'success',
            'Signature',
            'Signature Captured Successfully',
          );
      });
  };

  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  render() {
    const {signatureDialogVisible, signatureAttachment} = this.state;
    const {language} = this.props;
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({key: 'addDigitalSignature', language})}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('2'),
          }}>
          <View
            style={{
              paddingVertical: hp('2'),
              flex: 0.9,
            }}>
            <View style={{flex: 0.9, margin: 20}}>
              <View
                style={{
                  height: hp('50'),
                  borderColor: '#ddd',
                  borderWidth: 2,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.base64 ? (
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: this.state.base64}}
                  />
                ) : (
                  <SignatureCapture
                    style={styles.signature}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={'portrait'}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.saveSign();
                }}
                activeOpacity={0.9}>
                <Image
                  style={{
                    width: hp('8'),
                    height: hp('7'),
                    resizeMode: 'contain',
                  }}
                  source={DownloadImage}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: PrimaryColor,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  {strings({key: 'Save', language})}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => this.setState({base64: ''})}
                onPressOut={() => {
                  this.resetSign();
                }}
                activeOpacity={0.9}>
                <Image
                  style={{
                    width: hp('8'),
                    height: hp('8'),
                    resizeMode: 'contain',
                  }}
                  source={GalleryImage}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: PrimaryColor,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  {strings({key: 'Clear', language})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              this.state.base64 === '' || this.state.base64 === null
                ? alertsHelper.show(
                    'error',
                    strings({key: 'addYourSignature', language}),
                    strings({key: 'beforeContinue', language}),
                  )
                : this.props.navigation.navigate('Form')
            }
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // width: '100%',
              backgroundColor:
                this.state.base64 === null || this.state.base64 === ''
                  ? 'grey'
                  : 'green',
              borderRadius: 10,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'continue4to5', language})}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    customersignature: state.bankProfileReducer.customersignature,
    attachments: state.attachments.allattachments,
    language: state.language.defaultLanguage,
    userID: state.bankProfileReducer.createuserInfo.Id,
  };
};

export default connect(mapStateToProps)(DigitalScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%',
  },
});
