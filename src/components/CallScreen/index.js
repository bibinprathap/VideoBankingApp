import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AwesomeAlert from 'react-native-awesome-alerts';
import {CallService, AuthService} from '../../services';
import ToolBar from '../VideoScreen/ToolBar';
import UsersSelect from '../VideoScreen/UsersSelect';
import RTCViewGrid from '../VideoScreen/RTCViewGrid';
import {connect} from 'react-redux';
import AppApi from '../../api/real';

const api = new AppApi();
class VideoScreen extends React.Component {
  constructor(props) {
    super(props);

    this._session = null;
    this.opponentsIds = props.navigation.getParam('opponentsIds');
    let ID = props.navigation.getParam('AgentID');

    this.state = {
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [this.opponentsIds[0]],
      attachmentList: [],
      scannedtext: '',
      isActiveSelect: true,
      isActiveCall: false,
      isIncomingCall: false,
      signatureDialogVisible: false,
      signatureAttachment: null,
      Id: props.navigation.getParam('AgentID') ? ID : 0,
      isbusy: true,
      isonline: true,
    };

    this._setUpListeners();
  }

  componentWillUnmount() {
    CallService.stopCall();
    AuthService.logout();
  }

  statusCallUpdate = async () => {
    let statusCall = {...this.state};
    const data = await api.callUpdate({...statusCall});
    console.log(data, 'data');
  };

  componentDidUpdate(prevProps, prevState) {
    const currState = this.state;

    if (
      prevState.remoteStreams.length === 1 &&
      currState.remoteStreams.length === 0
    ) {
      CallService.stopCall();
      this.statusCallUpdate();
      if (this.props.Language === 'English') {
        this.props.navigation.navigate('Concratz');
      } else {
        this.props.navigation.navigate('ConcratzScreenArabic');
      }

      this.resetState();
    }
  }
  componentDidMount() {
    const {selectedUsersIds} = this.state;
    this.closeSelect();
    this.initRemoteStreams(selectedUsersIds);
    CallService.startCall(selectedUsersIds).then(this.setLocalStream);
  }

  showInomingCallModal = session => {
    this._session = session;
    this.setState({isIncomingCall: true});
  };

  hideInomingCallModal = () => {
    this._session = null;
    this.setState({isIncomingCall: false});
  };

  selectUser = userId => {
    this.setState(prevState => ({
      selectedUsersIds: [...prevState.selectedUsersIds, userId],
    }));
  };

  unselectUser = userId => {
    this.setState(prevState => ({
      selectedUsersIds: prevState.selectedUsersIds.filter(id => userId !== id),
    }));
  };

  closeSelect = () => {
    this.setState({isActiveSelect: false});
  };

  setOnCall = () => {
    this.setState({isActiveCall: true});
  };

  initRemoteStreams = opponentsIds => {
    const emptyStreams = opponentsIds.map(userId => ({
      userId,
      stream: null,
    }));

    this.setState({remoteStreams: emptyStreams});
  };

  updateRemoteStream = (userId, stream) => {
    this.setState(({remoteStreams}) => {
      const updatedRemoteStreams = remoteStreams.map(item => {
        if (item.userId === userId) {
          return {userId, stream};
        }

        return {userId: item.userId, stream: item.stream};
      });

      return {remoteStreams: updatedRemoteStreams};
    });
  };

  removeRemoteStream = userId => {
    this.setState(({remoteStreams}) => ({
      remoteStreams: remoteStreams.filter(item => item.userId !== userId),
    }));
  };

  setLocalStream = stream => {
    this.setState({localStream: stream});
  };

  resetState = () => {
    this.setState({
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [],
      isActiveSelect: true,
      isActiveCall: false,
    });
  };

  _setUpListeners() {
    ConnectyCube.videochat.onCallListener = this._onCallListener;
    ConnectyCube.videochat.onAcceptCallListener = this._onAcceptCallListener;
    ConnectyCube.videochat.onRejectCallListener = this._onRejectCallListener;
    ConnectyCube.videochat.onStopCallListener = this._onStopCallListener;
    ConnectyCube.videochat.onUserNotAnswerListener = this._onUserNotAnswerListener;
    ConnectyCube.videochat.onRemoteStreamListener = this._onRemoteStreamListener;
  }

  _onPressAccept = () => {
    CallService.acceptCall(this._session).then(stream => {
      const {opponentsIDs, initiatorID, currentUserID} = this._session;
      const opponentsIds = [initiatorID, ...opponentsIDs].filter(
        userId => currentUserID !== userId,
      );

      this.initRemoteStreams(opponentsIds);
      this.setLocalStream(stream);
      this.closeSelect();
      this.hideInomingCallModal();
    });
  };

  _onPressReject = () => {
    CallService.rejectCall(this._session);
    this.hideInomingCallModal();
  };

  _onCallListener = (session, extension) => {
    CallService.processOnCallListener(session)
      .then(() => this.showInomingCallModal(session))
      .catch(this.hideInomingCallModal);
  };

  _onAcceptCallListener = (session, userId, extension) => {
    CallService.processOnAcceptCallListener(session, userId, extension)
      .then(this.setOnCall)
      .catch(this.hideInomingCallModal);
  };

  _onRejectCallListener = (session, userId, extension) => {
    CallService.processOnRejectCallListener(session, userId, extension)
      .then(() => this.removeRemoteStream(userId))
      .catch(this.hideInomingCallModal);
  };

  _onStopCallListener = (session, userId, extension) => {
    const isStoppedByInitiator = session.initiatorID === userId;

    CallService.processOnStopCallListener(userId, isStoppedByInitiator)
      .then(() => {
        if (isStoppedByInitiator) {
          console.log('Close');
          this.statusCallUpdate();
          if (this.props.Language === 'English') {
            this.props.navigation.navigate('Concratz');
          } else {
            this.props.navigation.navigate('ConcratzScreenArabic');
          }
          this.resetState();
        } else {
          this.removeRemoteStream(userId);
        }
      })
      .catch(this.hideInomingCallModal);
  };

  _onUserNotAnswerListener = (session, userId) => {
    CallService.processOnUserNotAnswerListener(userId)
      .then(() => this.removeRemoteStream(userId))
      .catch(this.hideInomingCallModal);
  };

  _onRemoteStreamListener = (session, userId, stream) => {
    CallService.processOnRemoteStreamListener(userId)
      .then(() => {
        this.updateRemoteStream(userId, stream);
        this.setOnCall();
      })
      .catch(this.hideInomingCallModal);
  };

  handleSignatureDialogRequestClose = obj => {
    this.setState({signatureDialogVisible: false});
  };
  handleSignatureDialogRequestOpen = obj => {
    this.setState({signatureDialogVisible: true});
  };

  handleOnAddSignature = signatureAttachment => {
    this.setState({signatureDialogVisible: false, signatureAttachment});
  };

  handleOnAddAttachment = attachment => {
    const newState = {
      attachmentList: [...this.state.attachmentList, attachment],
    };
    this.setState(newState);
  };

  handleOnRemoveAttachment = attachment => {
    const modifiedattachmentList = [...this.state.attachmentList];
    let index;
    modifiedattachmentList.forEach((item, i) => {
      if (item == attachment) {
        index = i;
        return;
      }
    });
    modifiedattachmentList.splice(index, 1);
    const newState = {attachmentList: modifiedattachmentList};
    this.setState(newState);
  };
  onAccept = data => {
    const integrationData = {
      ...this.state.integrationData,
      running: false,
      success: true,
      message: strings('integrationSuccessMessageMOI'),
    };
    const newState = {
      ...emptyViolatorState,
      ...data,
      integrationData,
      idNumber: data.emiratesId,
    };
    this.updateViolatorState(newState);
  };

  onError = e => {
    const integrationData = {
      ...this.state.integrationData,
      running: false,
      success: false,
      message: strings('integrationProgressMessageMOI'),
    };
    this.updateViolatorState({integrationData});
  };

  render() {
    const {
      localStream,
      remoteStreams,
      selectedUsersIds,
      isActiveSelect,
      isActiveCall,
      isIncomingCall,
      signatureDialogVisible,
      signatureAttachment,
      attachmentList,
    } = this.state;

    const initiatorName = isIncomingCall
      ? CallService.getUserById(this._session.initiatorID, 'name')
      : '';
    const localStreamItem = localStream
      ? [{userId: 'localStream', stream: localStream}]
      : [];
    const streams = [...remoteStreams, ...localStreamItem];

    CallService.setSpeakerphoneOn(remoteStreams.length > 0);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {!localStream ? null : <RTCViewGrid streams={streams} />}
        <UsersSelect
          isActiveSelect={isActiveSelect}
          opponentsIds={this.opponentsIds}
          selectedUsersIds={selectedUsersIds}
          selectUser={this.selectUser}
          unselectUser={this.unselectUser}
        />
        <ToolBar
          selectedUsersIds={selectedUsersIds}
          localStream={localStream}
          isActiveSelect={isActiveSelect}
          isActiveCall={isActiveCall}
          closeSelect={this.closeSelect}
          initRemoteStreams={this.initRemoteStreams}
          setLocalStream={this.setLocalStream}
          resetState={this.resetState}
        />
        <AwesomeAlert
          show={isIncomingCall}
          showProgress={false}
          title={`Incoming call from ${initiatorName}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Reject"
          confirmText="Accept"
          cancelButtonColor="red"
          confirmButtonColor="green"
          onCancelPressed={this._onPressReject}
          onConfirmPressed={this._onPressAccept}
          onDismiss={this.hideInomingCallModal}
          alertContainerStyle={{zIndex: 1}}
          titleStyle={{fontSize: 21}}
          cancelButtonTextStyle={{fontSize: 18}}
          confirmButtonTextStyle={{fontSize: 18}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldrow: {flex: 1, flexDirection: 'row', marginVertical: 10},
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  toolBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCall: {
    backgroundColor: 'green',
  },
  buttonCallEnd: {
    backgroundColor: 'red',
  },
  buttonMute: {
    backgroundColor: 'blue',
  },
  buttonSwitch: {
    backgroundColor: 'orange',
  },
  attachmentFieldContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 5,
    elevation: 1,
    borderRadius: 5,
  },
});

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    Language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(VideoScreen);
