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
  Animated,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Scan_Helper from '../../../assets/scan-helper.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import ScanDocument from '../Component/ScanDocument';
import ScanDocumentArabic from '../Component/ScanDocumentArabic';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import uploadHelper from '../../api/helperServices/upload';
import {infoChanged} from '../../redux/actions/bankProfileActions';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';
import Header from '../Component/Header';
let dataSource = [
  {
    id: 0,
    fieldName: 'scannedNationalID',
    title: 'National ID card',
    titleA: 'بطاقة الهوية الوطنية',
    images: [],
    progressStatus: 0,
  },
  {
    id: 1,
    fieldName: 'scannedCivilidentitycard',
    title: ' Civil identity card',
    titleA: 'بطاقة الهوية المدنية',
    images: [],
    progressStatus: 0,
  },
  {
    id: 2,
    fieldName: 'scannedPassport',
    title: 'Passport',
    titleA: 'جواز سفر',
    images: [],
    progressStatus: 0,
  },
  {
    id: 3,
    fieldName: 'scannedResidencedocuments',
    title: 'Residence documents for non-iraqis',
    titleA: 'وثائق الإقامة لغير العراقيين',
    images: [],
    progressStatus: 0,
  },
  {
    id: 4,
    fieldName: 'scannedCommercialregister',
    title: 'Commercial register sole properties',
    titleA: 'عقارات السجل التجاري الوحيد',
    images: [],
    progressStatus: 0,
  },
  {
    id: 5,
    fieldName: 'scannedFinancialstatements',
    title: 'Financial statements for merchant',
    titleA: 'البيانات المالية للتاجر',
    images: [],
    progressStatus: 0,
  },
];

class CreateScreen extends Component {
  constructor(props) {
    super(props);

    if (props.bankProfile) {
      dataSource.map(d => {
        if (props.bankProfile[d.fieldName]) {
          let image = props.attachments.find(
            a => a.customUploadId == props.bankProfile[d.fieldName],
          );
          d.images.push(image);
        }
        return d;
      });
    }
    this.state = {
      image: null,
      images: null,
      mainData: dataSource,
      progressStatus: 0,
      pickerModal: false,
      index: 0,
      imageZoom: false,
      validation: false,
    };

    this.anim = new Animated.Value(0);
  }

  componentDidMount() {
    this.onAnimate();
    this.state.mainData.map(item => {
      if (item.images.length !== 0) {
        this.setState({validation: true});
      }
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, 'nextProps');
    return {
      // image: nextProps.image,
      // name: nextProps.name,
      // address: nextProps.address,
      // email: nextProps.email,
    };
  }
  onAnimate = () => {
    this.anim.addListener(({value}) => {
      this.setState({progressStatus: parseInt(value, 10)});
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: 50000,
    }).start();
  };

  pickSingleWithCamera(cropping, index) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType: 'photo',
    })
      .then(image => {
        let imagePicker = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

        dataSource.find(element => {
          if (element.id === index) {
            element.images.push(imagePicker);
          }
        });

        this.setState({mainData: dataSource, pickerModal: false});
      })
      .catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  }

  cleanupSingleImage(item, index) {
    this.setState({validation: false});
    ImagePicker.cleanSingle(
      item && item.images[0] && item.images[0].uri
        ? item.images[0].uri.replace('file://', '')
        : null,
    )
      .then(() => {
        item.images = [];
        this.setState({mainData: dataSource});
        this.props.dispatch(infoChanged(item.fieldName, null));
      })
      .catch(e => {
        alert(e);
      });
  }

  pickSingle(cropit, index) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        let imagePicker = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

       // const uri = `file://${imagePicker.uri}`;

        // dataSource.find(element => {
        //   if (element.id === index) {
        //     element.images.push(imagePicker);
        //   }
        // });

        this.setState({pickerModal: false});

        const selectedElement = dataSource.find(element => {
          element.images = [];
          if (element.id === index) {
            element.images.push(imagePicker);
            return true;
          }
          return false;
        });

        this.setState({mainData: dataSource});
 
       // const uri =imagePicker.uri.indexOf('file')==-1? `file://${imagePicker.uri}`:imagePicker.uri;
      // const uri =imagePicker.uri;
       const formData = {
        documentType: selectedElement.fieldName,
        ClaimId: 110,
        CreatedBy:  110,
        DocType: '1',
        customUploadId: `u-${new Date().getTime()}`,
      };
        this.props.dispatch(
          infoChanged(formData.documentType, formData.customUploadId),
        );
        let uri = imagePicker.uri;
        if (Platform.OS == "android") {
          uri = imagePicker.uri.replace("file://", "");
        }
       
        uploadHelper
          .startUpload(uri, formData, 'Upload_multipart', 'Values')
          .then(res => {
            console.log('res', res);
            // alertsHelper.hideAlert();
          });
      })
      .catch(e => {
        console.log(e, 'erer');
        // Alert.alert(e.message ? e.message : e);
      });
  }

  renderPickerModal() {
    const {pickerModal} = this.state;

    return (
      <Modal
        isVisible={pickerModal}
        style={{
          justifyContent: 'flex-end',
        }}
        onBackdropPress={() => this.setState({pickerModal: false})}
        onBackButtonPress={() => this.setState({pickerModal: false})}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View
          style={{
            backgroundColor: 'white',
            height: 200,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(true, this.state.index)}
            activeOpacity={0.9}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../images/src_assets_camera.png')}
              style={{width: 100, height: 100}}
            />
            <Text style={{fontFamily: 'Roboto-Bold', paddingTop: 15}}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.pickSingle(true, this.state.index);
            }}
            activeOpacity={0.9}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../images/src_assets_gallery.png')}
              style={{width: 100, height: 100}}
            />
            <Text style={{fontFamily: 'Roboto-Bold', paddingTop: 15}}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  renderZoomImage() {
    const {imageZoom} = this.state;

    return (
      <Modal
        isVisible={imageZoom}
        style={{
          flex: 1,
        }}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1500}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        useNativeDriver
        onBackdropPress={() => this.setState({imageZoom: false})}
        onBackButtonPress={() => this.setState({imageZoom: false})}
        backdropColor="black">
        <View
          style={{
            backgroundColor: 'white',
            height: 200,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={
              imageZoom && {
                uri: this.state.mainData[this.state.index].images[0].uri,
              }
            }
          />
        </View>
      </Modal>
    );
  }

  renderImage(image) {
    return (
      <Image
        style={{width: hp('6'), height: hp('6'), resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  getData(item) {
    this.pickSingle(true, item.index);
  }

  renderItem = item => {
    var dataItem = item.item;
    debugger;
   // console.log(dataItem);
    let image = null;
    let linebackgroundColor = '#ddd';
    let linewidth = 100;
    if (this.props.bankProfile[dataItem.fieldName]) {
        image = this.props.attachments.find(
        a => a.customUploadId == this.props.bankProfile[dataItem.fieldName],
      );
      if(image )
      {
if(image.uploaded)
{
  linebackgroundColor = 'green';
  linewidth = 100
}
else if (image.uploading)
{ linebackgroundColor = 'green';
linewidth = 50

}else if (image.error)
{
  linebackgroundColor = '#FF0000';
  linewidth = 80
}
}
}
    return (
      <View style={{flex: 1, marginBottom: 10}}>
        <ScanDocument
          titleContent={dataItem.title}
          deleteOption={dataItem.images.length !== 0 ? true : false}
          onPress={() =>
            Alert.alert(
              'Delete Document',
              '',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => this.cleanupSingleImage(dataItem, item.index),
                },
              ],
              {cancelable: false},
            )
          }>
          <TouchableOpacity
            //   onPress={this.getData.bind(this, item)}
            onPress={() =>
              !item.item.images.length
                ? this.setState({pickerModal: true, index: item.index})
                : this.setState({imageZoom: true, index: item.index})
            }>
            {dataItem.images.length !== 0 ? (
              this.renderAsset(dataItem.images[0])
            ) : (
              <Image source={Scan_Helper} style={{width: 70, height: 70}} />
            )}
          </TouchableOpacity>
        </ScanDocument>
        <Animated.View
          style={{
            backgroundColor: linebackgroundColor,
            height: 2,
            marginLeft: 80,
            width: linewidth + '%',
          }}
        />
      </View>
    );
  };

  renderItemArabic = item => {
    var dataItem = item.item;

    return (
      <View style={{flex: 1, marginBottom: 10}}>
        <ScanDocumentArabic
          titleContent={dataItem.titleA}
          deleteOption={dataItem.images.length !== 0 ? true : false}
          onPress={() =>
            Alert.alert(
              'حذف المستند',
              '',
              [
                {
                  text: 'إلغاء',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'حسنا',
                  onPress: () => this.cleanupSingleImage(dataItem, item.index),
                },
              ],
              {cancelable: false},
            )
          }>
          <TouchableOpacity
            // onPress={this.getData.bind(this, item)}
            onPress={() =>
              !item.item.images.length
                ? this.setState({pickerModal: true, index: item.index})
                : this.setState({imageZoom: true, image: item.item.images})
            }>
            {dataItem.images.length !== 0 ? (
              this.renderAsset(dataItem.images[0])
            ) : (
              <Image source={Scan_Helper} style={{width: 70, height: 70}} />
            )}
          </TouchableOpacity>
        </ScanDocumentArabic>
      </View>
    );
  };

  render() {
    const {language} = this.props;
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        {this.renderPickerModal()}
        {this.renderZoomImage()}
        <Header
          header={strings({key: 'scanrequireddocuments', language})}
          navigation={this.props.navigation}
        />
        <ScrollView
          behavior="padding"
          contentContainerStyle={{
            flex: 1,
            // justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('4'),
          }}>
          <View style={{paddingVertical: hp('2')}}>
            <FlatList
              data={this.state.mainData}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemData =>
                language === 'English'
                  ? this.renderItem(itemData)
                  : this.renderItemArabic(itemData)
              }
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.navigate('Profile')}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: this.state.validation ? 'green' : 'gray',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'continue2to5', language})}
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
    bankProfile: state.bankProfileReducer,
    attachments: state.attachments.allattachments,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(CreateScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
