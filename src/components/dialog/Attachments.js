import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
// import { addImageAttachment, removeImageAttachment } from 'app/actions/attachments';
import {Text, Button} from 'react-native-paper';
import Image from '../Image/Image';
import {Icon} from '../Icon/index';
import ZoomableImage from '../Image/ZoomableImage';
import ImageMarker from '../Image/ImageMarker';
import {Modal} from '../Modal';
import AttachmentsHeader from '../InputControls/AttachmentsHeader';
import {screenWithSpinner} from '../WithSpinner';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
// import RNMlKit from 'react-native-firebase-mlkit';
import AttachmentList from './AttachmentList';
// import alertsHelper from 'app/api/helperServices/alerts';
import styles from './styles';
// import { setLoaded } from 'app/actions/loader';
//import { VideoPlayer, Trimmer } from 'react-native-video-processing';
//import { withNavigation } from 'react-navigation';
// import { VideoView } from 'app/components';

const captureImageQuality = 1; //todo: take this from config/ store
const includeBase64 = true;
const swipThreshold = 100;

class Attachments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImageEditor: false,
      downloadedVideouri: '',
      scanningtext: false,
      showloader: false,
      scannedtext: 'Scanning the text  From Image',
    };
    this.addPicture = this.addPicture.bind(this);
    //this.setselectedAttachment = this.setselectedAttachment.bind(this);

    this.startUpload = this.startUpload.bind(this);
  }
  uploaderListener;
  componentDidMount() {
    const {attachments, onClose, selectedAttachment, editable} = this.props;
    const firstAttachment = !!attachments && attachments[0];
    this.setState({
      attachments,
      startedEmpty: !attachments || attachments.length == 0,
      selectedAttachment: selectedAttachment || firstAttachment,
      onClose,
      editable,
    });
  }

  componentDidUpdate() {
    const {firstUpdateDone, startedEmpty, editable} = this.state;

    if (!firstUpdateDone && startedEmpty && editable) {
      this.setState({firstUpdateDone: true}, () => {
        // this.handleAddPicturePressed(true);
      });
    }
  }
  onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    /*
            thumbnail with height and width same as (height - offset) of the parent view
        */
    const offset = styles.imageListContainer.padding * 2;
    if (!this.state.layoutDone)
      this.setState({
        layoutDone: true,
        thumbnailHeight: height - offset,
        thumbnailWidth: height - offset,
      });
  };

  handleOnClose = () => {
    //Todo: do any cleanup etc before closing this screen
    const {onClose} = this.state;
    // const payload = { result: {}, isRunning: false };
    if (onClose) onClose();
  };

  launchDrawEditor = () => {
    this.setState({showImageEditor: true});
  };

  launchCropEditor = () => {
    const selectedAttachment = this.state.selectedAttachment;
    const path = selectedAttachment && selectedAttachment.path;
    if (!path) return;
    try {
      this.openCropper(path);
    } catch (e) {}
  };

  openCropper = async path => {
    const imageToCrop = this.state.selectedAttachment;
    if (!imageToCrop) return;
    try {
      const croppedImage = {};

      await ImagePicker.openCropper({
        path: path,
        width: imageToCrop.width,
        height: imageToCrop.height,
        cropperStatusBarColor: '#058DFC',
        cropperToolbarColor: '#058DFC',
        enableRotationGesture: true,
        freeStyleCropEnabled: true,
        compressImageQuality: captureImageQuality, //Todo: take this from settings
      });
      if (croppedImage) {
        this.handleImageRemove(imageToCrop);
        debubber;
        this.addPicture({image: croppedImage, isNewImage: false});
      }
    } catch (e) {}
  };
  startUpload = uploadattachement => {
    const newAttachment = uploadattachement.path
      ? uploadattachement
      : this.state.selectedAttachment;
    //attachmentsHelper.startUpload(newAttachment, this.props.environment, this.props.authCode, this.props.userData.uuid, 'InspectionPhoto');
  };

  addPicture = ({image, isNewImage}) => {
    try {
      // this.props.dispatch(addImageAttachment(newAttachment)).then(() => {
      //     //dispach action for updating the reducer by inspectionid and uploading
      //     this.startUpload(newAttachment);
      // });
      const newAttachment = image;
      const {onAdd} = this.props;
      if (onAdd) onAdd(newAttachment);
      const {attachments} = this.state;
      const newAttachmentsArray = attachments || [];
      newAttachmentsArray.push(newAttachment);
      this.setState({
        attachments: newAttachmentsArray,
        selectedAttachment: newAttachment,
      });
    } catch (e) {}
  };
  _onPressReject = () => {
    this.setState({
      scanningtext: false,
      showloader: false,
      scannedtext: 'Scanning the text  From Image',
    });
  };

  handleAddPicturePressed = async isFirstAttachment => {
    var cancelRequested = false;

    // scanningtext
    try {
      ImagePicker.openCamera({
        includeBase64: includeBase64,
        includeExif: true,
        enableRotationGesture: true,
        compressImageQuality: captureImageQuality, //Todo: take this from settings
        mediaType: 'image',
      })
        .then(async image => {
          try {
            this.setState({
              scanningtext: true,
              scannedtext: 'Scanning the text  From Image',
              showloader: true,
            });
            const options = {
              quality: 0.8,
              base64: true,
              skipProcessing: true,
            };
            // const { uri } = await this.camera.takePictureAsync(options);
            //  const visionResp = await RNTextDetector.detectFromUri(image.path);
            const deviceTextRecognition = await RNMlKit.deviceTextRecognition(
              'file://' + image.path,
            );
            console.warn('visionResp', deviceTextRecognition);
            this.setState({
              scannedtext: deviceTextRecognition.error
                ? 'No Text Found'
                : (deviceTextRecognition || [])
                    .map(blockVision => blockVision.resultText)
                    .join(' '),
              showloader: false,
            });

            // console.log('visionResp', visionResp);
            this.addPicture({image, isNewImage: true});
          } catch (e) {
            console.warn(e);
          }
          //this.deleteFile(image.path);
          //delete image.path; //don't store the path as file is going to be deleted anyway

          // resolve();
        })
        .catch(error => {
          //this.props.dispatch(setLoaded());
          //  updateOptions({ ...options, maxTries: 0, autoClose: true });
          if (error.code == 'E_PICKER_CANCELLED') {
            const {startedEmpty, attachments} = this.state;
            if (startedEmpty && (!attachments || attachments.length == 0)) {
              //if it had started empty and user cancelled the camera without taking snap
              this.handleOnClose();
              resolve();
            }
          } else {
            alert(error);
            resolve();
          }
        });
    } catch (error) {
      if (isFirstAttachment) this.handleOnClose();
    }

    //Todo: fix the dimensions of the pic (default = portrait)
  };

  deleteFile = async path => {
    // try {
    //     await RNFetchBlob.fs.unlink(path);
    // } catch (e) {
    //     const msg = `Failed to delete file: ${path}`;
    //     alert(msg);
    // }
  };

  handleThumbnailOnPress = doc => {
    setTimeout(() => {
      this.setState({selectedAttachment: doc});
    }, 0);
  };

  handleImageRemove = async doc => {
    const {onRemove} = this.props;
    if (onRemove) onRemove(doc);

    const {selectedAttachment, attachments} = this.state;
    const {path} = doc;

    // Todo: move below logic to the AttachmentList, as user can remove the attachment without opening the dialog

    if (typeof selectedAttachment === 'undefined') return;
    let currentIndex = attachments.findIndex(f => f.path == doc.path);

    if (selectedAttachment.path == doc.path) {
      if (currentIndex == attachments.length - 1) currentIndex--;
    } else if (currentIndex > 0) {
      currentIndex--;
    }
    const newAttachmentsArray = attachments.filter(d => d.path != doc.path);
    this.setState({
      attachments: newAttachmentsArray,
      selectedAttachment: newAttachmentsArray.length
        ? newAttachmentsArray[currentIndex]
        : null,
    });
    // this.props.dispatch(removeImageAttachment({ path: path }));
    // const pendingUpload = this.props.pendingUploadDocs[mobileReferenceNumber];
    // if (pendingUpload && pendingUpload.uploading) {
    //     RNFileUploader.cancelUpload(pendingUpload.mobileReferenceNumber);
    // } else {
    //     const result = await api.deleteUploadedDocument(doc.mobileReferenceNumber);
    //     if (result && result.success) {
    //         // delete successfull
    //     }
    // }

    // this.props.dispatch(removeImageAttachment({ mobileReferenceNumber: doc.mobileReferenceNumber }));
    // if (selectedAttachmentfromStore && selectedAttachmentfromStore.uploading) {
    //     RNFileUploader.cancelUpload(selectedAttachmentfromStore.fileName);
    // } else {
    //     const result = await api.deleteUploadedDocument(selectedAttachmentfromStore.deleteToken);
    //     if (result && result.success) {
    //         // delete successfull
    //     }
    // }
  };

  handleSwipLeft = xDiff => {
    if (xDiff >= swipThreshold) {
      this.selectAttachmentByIndexOffset(1);
    }
  };

  handleSwipRight = xDiff => {
    if (xDiff => swipThreshold) {
      this.selectAttachmentByIndexOffset(-1);
    }
  };

  selectAttachmentByIndexOffset = indexOffset => {
    const {selectedAttachment, attachments} = this.state;
    if (typeof selectedAttachment === 'undefined') return;
    const maxIndex = attachments.length - 1;
    if (maxIndex < 0) return;

    let currentIndex = attachments.findIndex(f => f.path == doc.path);

    let newIndex = currentIndex + indexOffset;
    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      newIndex = 0;
    }
    const newSelectedAttachment = attachments[newIndex];
    if (newSelectedAttachment) {
      this.setState({
        selectedAttachment: newSelectedAttachment,
      });
    }
  };

  saveEditedImage = imagePath => {
    if (imagePath) {
      const path = `file://${imagePath}`;
      Image.getSize(
        path,
        (width, height) => {
          const imageObj = {
            path,
            height,
            width,
          };
          const captureImageQuality = 1;
          //    const address = this.state.selectedAttachment.location.address;
          if (this.state.selectedAttachment) {
            editedImage.extension = 'jpg';
            this.handleImageRemove(this.state.selectedAttachment);
            this.addPicture({
              image: editedImage,
              isNewImage: false,
            });
            this.setState({showImageEditor: false});
          } else {
            this.setState({showImageEditor: false});
            // alertsHelper.show('error', 'Error', strings('unknown_error'));
          }
        },
        error => {
          this.setState({showImageEditor: false});
          // alertsHelper.show('error', 'Error', strings('unknown_error'));
        },
      );
    }
  };

  render() {
    //Todo: if there are no exising attachments, open the camera without waiting for user to click on the button
    const {
      attachments,
      editable,
      scanningtext,
      showloader,
      scannedtext,
    } = this.state;
    const selectedAttachment = this.state.selectedAttachment;

    const aspectRatio = selectedAttachment
      ? selectedAttachment.width / selectedAttachment.height
      : 0;
    const imageStyles = [styles.previewImage, {aspectRatio: aspectRatio}];
    let attachmenterror = false;
    if (selectedAttachment) {
      attachmenterror = selectedAttachment.error;
      // const pendingUpload = this.props.pendingUploadDocs[selectedAttachment.path];
      // if (pendingUpload) {
      //     attachmenterror = pendingUpload.error;
      // }
    }
    //debugger;

    //videouri = 'https://www.radiantmediaplayer.com/media/bbb-360p.mp4';
    return (
      <View style={styles.imagecontainer}>
        <AwesomeAlert
          show={scanningtext}
          showProgress={showloader}
          title={scannedtext}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={!showloader}
          onCancelPressed={this._onPressReject}
          cancelText="Close"
          cancelButtonColor="red"
          onDismiss={this._onPressReject}
          showConfirmButton={false}
          alertContainerStyle={{zIndex: 1}}
          titleStyle={{fontSize: showloader ? 21 : 6}}
          cancelButtonTextStyle={{fontSize: 18}}
          confirmButtonTextStyle={{fontSize: 18}}
        />

        <AttachmentsHeader
          editable={editable}
          selectedAttachment={selectedAttachment}
          onScreenClose={this.handleOnClose}
          onCropRotate={this.launchCropEditor}
          onDrawOnImage={this.launchDrawEditor}
          onClose={this.handleOnClose}
          handleImageRemove={this.handleImageRemove}
        />

        {selectedAttachment && selectedAttachment.path && (
          <Modal
            visible={this.state.showImageEditor}
            onRequestClose={() => this.setState({showImageEditor: false})}>
            <ImageMarker
              onSave={this.saveEditedImage}
              onRequestClose={() => this.setState({showImageEditor: false})}
              path={selectedAttachment.path}
              path={selectedAttachment.path}
              documentId={selectedAttachment.documentId}
            />
          </Modal>
        )}
        <View style={styles.previewContainer}>
          {!!selectedAttachment && (
            <View style={styles.previewInnerContainer}>
              {attachmenterror ? (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 250,
                    zIndex: 1000,
                  }}
                  onPress={this.startUpload}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="cloud-sync"
                    color="#ff0000"
                    size={30}
                  />
                </TouchableOpacity>
              ) : null}
              <ZoomableImage
                style={[imageStyles, {flex: 1}]}
                offsetTop={0}
                offsetLeft={0}
                imageWidth={selectedAttachment.width}
                imageHeight={selectedAttachment.height}
                startUpload={this.startUpload}
                //source={{ uri: `data:${selectedAttachment.mime};base64,${selectedAttachment.data}` }}
                source={{
                  uri: selectedAttachment.path,
                  uploading: selectedAttachment.uploading,
                  uploaded: selectedAttachment.uploaded,
                  error: selectedAttachment.error,
                }}
                authCode={this.props.authCode}
                onSwipLeft={this.handleSwipLeft}
                onSwipRight={this.handleSwipRight}
                metadata={selectedAttachment}
              />
            </View>
          )}
          {!selectedAttachment && (
            <Text style={styles.previewNoImageSelectedText}>
              Select an attachment...
            </Text>
          )}
        </View>
        {
          <View style={styles.imageListContainer}>
            <AttachmentList
              attachments={attachments || []}
              onPress={this.handleThumbnailOnPress}
              editable={editable}
              onRemove={this.handleImageRemove}
              hideDelete={this.props.hideDelete}
              selectedAttachment={selectedAttachment}
            />
            {editable && (
              <View style={styles.addPictureButtonContainer}>
                <TouchableOpacity
                  // onPress={this.handleAddPicturePressed}
                  style={styles.addPictureButton}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="camera"
                    size={45}
                    style={styles.addPictureButtonIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        <Button
          style={styles.doneButton}
          title="Done"
          onPress={this.handleOnClose}>
          {'Done'}
        </Button>
      </View>
    );
  }
}

const connectedAttachments = Attachments;
export default screenWithSpinner(connectedAttachments, {theme: 'light'});
