import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Scan_Helper from '../../../assets/scan-helper.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import Header from '../Component/Header';
import {connect} from 'react-redux';
import ScanDocument from '../Component/ScanDocument';
import {ScrollView} from 'react-native-gesture-handler';
import DownloadImage from '../../../assets/Download.png';
import GalleryImage from '../../../assets/Gallery.png';
import ProfileDefault from '../../../assets/src_assets_profile.png';
// import AppApi from '../../api/real';
import alertsHelper from '../../api/helperServices/alerts';

import uploadHelper from '../../api/helperServices/upload';
import {infoChanged} from '../../redux/actions/bankProfileActions';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';
import {PrimaryColor} from '../Config';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    let image = null;
    if (props.profileimage) {
      image = props.attachments.find(
        a => a.customUploadId == props.profileimage,
      );
    }
    this.state = {
      image,
      images: null,
      userID: 142,
    };
    this.handleuploadProfilePicture = this.handleuploadProfilePicture.bind(
      this,
    );
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => console.log(e));
  }

  pickSingle(cropit, circular = true, mediaType) {
    // ImagePicker.openPicker({
    //   width: 500,
    //   height: 500,
    //   cropping: cropit,
    //   freeStyleCropEnabled: true,
    //   cropperCircleOverlay: circular,
    //   sortOrder: 'none',
    //   compressImageMaxWidth: 1000,
    //   compressImageMaxHeight: 1000,
    //   compressImageQuality: 1,
    //   compressVideoPreset: 'MediumQuality',
    //   includeExif: true,
    // })
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      cropperToolbarTitle: 'Move and Scale',
      width: 500,
      height: 532,
      includeExif: true,
      compressImageQuality: 0.8,
      showCropGuidelines: false,
      forceJpg: true,
      cropperActiveWidgetColor: '#ffffff00',
      mediaType,
    })
      .then(image => {
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  }

  renderImage(image) {
    return (
      <Image
        style={{width: hp('38'), height: hp('38'), resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  handleuploadProfilePicture = () => {
    const {image} = this.state;
    const {profileimage, attachments} = this.props;
    if (!image) {
      alertsHelper.show('error', 'Please Add Profile Image', 'Before Continue');
      return;
    }
    const uri = `file://${image.uri}`;
    if (profileimage && profileimage == image.customUploadId) {
      this.props.navigation.navigate('Digital');
      return;
    }
    // alertsHelper.showAlert('Uploading Profile', 'Uploading Profile Picture');

    const formData = {
      someKey: 'someValue',
      customUploadId: `u-${new Date().getTime()}`,
    };
    this.props.dispatch(infoChanged('profileimage', formData.customUploadId));
    uploadHelper
      .startUpload(uri, formData, 'Upload_multipart', 'Values')
      .then(() => {
        // alertsHelper.hideAlert();
      });
    this.props.navigation.navigate('Digital');
    //     try {
    //       console.log(`file://${image.uri}`)
    //       console.log('file://' +image.uri)
    //       debugger;
    //       // const restApi = new RestApi({ controller: 'Inspection' });
    //        const uri = `file://${image.uri}`;
    //        const uriParts = uri.split('.');
    //        const fileType = uriParts[uriParts.length - 1];

    // debugger;
    // //console.log(path);

    //        var data = new FormData();
    //            data.append('my_photo', {
    //            uri, // your file path string
    //            name: 'my_photo.jpg',
    //            type: `image/${fileType}`,
    //            });
    //            console.log(data);
    // debugger;
    //        try {

    //            axios({
    //                method: 'POST',
    //                url: 'https://adroitclouderpreport.ngrok.io/api/Values/Upload_multipart',
    //                data: data,
    //                headers: {
    //                    'Content-Type': 'multipart/form-data'
    //                }
    //             }).then((response) => {

    // debugger;
    //                console.log(response);
    //             });

    //            // let response = await restApi.post({
    //            //     url: ,
    //            //     body: data,
    //            //     cancelable: true,
    //            //     showAlerts: true,
    //            // });
    //            //return response.data.result;
    //        } catch (error) {
    //         console.log(error);
    //         debugger;
    //            throw error;
    //        }
    //     }
    //     catch (error) {
    //       console.log(error);
    //       debugger;
    //         throw error;
    //      //alertsHelper.hideAlert();
    //          alertsHelper.show('error', 'Upload Failed', 'Netrork Error' );

    //      }
  };

  saveAction = image => {
    const {dispatch} = this.props;

    if (image !== undefined) {
      let uri = '';
      if (this.state.image !== null) {
        uri = `file://${image.uri}`;

        uploadHelper
          .startUpload(
            uri,
            null,
            'api/Users/UploadProfilePicture?UserId=' + this.props.userID,
            '',
          )
          .then(() => {
            // alertsHelper.hideAlert();

            alertsHelper.show(
              'success',
              'Profile Image Uploaded',
              'Successfully',
            );

            dispatch(infoChanged('basicprofile', uri));
          });
      }
    }
  };

  render() {
    const {language} = this.props;

    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({key: 'takepersonalphoto', language})}
          navigation={this.props.navigation}
        />
        <ScrollView
          behavior="padding"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('2'),
          }}>
          {/* <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.goBack()}>
            <Icons
              size={hp('4')}
              style={{marginBottom: hp('2'), alignSelf: 'flex-start'}}
              name="keyboard-backspace"
              color="#000"
            />
          </TouchableOpacity> */}

          {/* <Text
            style={{
              fontFamily: 'Lora-Bold',
              textAlign: alignment(language),
              fontSize: normalizeFont(21),
            }}>
            {strings({key: 'takepersonalphoto', language})}
          </Text> */}
          <View
            style={{
              paddingVertical: hp('2'),
              flex: 0.9,
            }}>
            <View style={{flex: 0.9, margin: 20}}>
              <View
                style={{
                  flex: 1,
                  borderColor: '#ddd',
                  borderWidth: 2,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.image ? (
                  this.renderAsset(this.state.image)
                ) : (
                  <Image
                    style={{
                      width: hp('30'),
                      height: hp('30'),
                      resizeMode: 'contain',
                    }}
                    source={ProfileDefault}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                // onPress={() => this.pickSingle(true)}
                onPress={() => this.saveAction(this.state.image)}
                activeOpacity={0.9}>
                <Image
                  style={{
                    width: hp('7'),
                    height: hp('8'),
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
                onPress={() => this.pickSingle(true)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  {strings({key: 'TakePhoto', language})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.handleuploadProfilePicture}
            activeOpacity={0.9}
            style={{
              height: 50,
              justifyContent: 'center',

              alignItems: 'center',
              marginHorizontal: 20,
              backgroundColor:
                this.state.image === null || this.state.image === ''
                  ? 'grey'
                  : 'green',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'continue3to5', language})}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component

  return {
    profileimage: state.bankProfileReducer.profileimage,
    attachments: state.attachments.allattachments,
    language: state.language.defaultLanguage,
    userID: state.bankProfileReducer.createuserInfo.Id,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
