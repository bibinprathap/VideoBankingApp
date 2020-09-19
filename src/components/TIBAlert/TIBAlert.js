import React, {Component} from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackAndroid,
  BackHandler,
  Modal,
  Image,
} from 'react-native';

import {Portal} from 'react-native-paper';
import PropTypes from 'prop-types';

import images from '../../images';

import styles from './styles';

const HwBackHandler = BackHandler || BackAndroid;
const HW_BACK_EVENT = 'hardwareBackPress';

export default class TIBAlert extends Component {
  constructor(props) {
    super(props);
    //const { show } = this.props;
    this.springValue = new Animated.Value(0.3);
    this.state = {
      showSelf: false,
      show: false,
      showProgress: false,
      title: '',
      closeOnTouchOutside: false,
      closeOnHardwareBackPress: false,
      showCancelIcon: false,
      showCancelButton: true,
      showConfirmButton: true,
      useNativeDriver: true,
      cancelText: 'Cancel',
      confirmText: 'Delete',
      cancelButtonColor: 'green',
      confirmButtonColor: 'red',
      onCancelPressed: () => this.setState({show: false}),
      onConfirmPressed: () => this.setState({show: false}),
      onDismiss: () => this.setState({show: false}),
      alertContainerStyle: {zIndex: 9999, backgroundColor: '#fff'},
      titleStyle: {fontSize: 21},
      cancelButtonTextStyle: {fontSize: 18},
      confirmButtonTextStyle: {fontSize: 18},
      warnColor: '#cd853f',
      errorColor: '#cc3232',
      successColor: '#32A54A',
      infoColor: '#2B73B6',
      type: 'success',
      delay: false,
    };

    this.getBackgroundColorForType = this.getBackgroundColorForType.bind(this);
    // if (show) this._springShow(true);
  }

  componentDidMount() {
    HwBackHandler.addEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }
  getBackgroundColorForType() {
    switch (this.state.type) {
      case 'warn':
        return this.state.warnColor;
      case 'error':
        return this.state.errorColor;
      case 'success':
        return this.state.successColor;
      case 'info':
        return this.state.infoColor;

      default:
        return this.state.alertContainerStyle.backgroundColor;
    }
  }
  getBackgroundColorForIcon() {
    switch (this.state.type) {
      case 'warn':
        return images.warnAlert.content;
      case 'error':
        return images.errorAlert.content;
      case 'success':
        return images.successAlert.content;
      default:
        return images.info.content;
    }
  }
  getAlertIcon() {
    switch (this.state.type) {
      case 'warn':
        return images.warnAlert.content;
      case 'error':
        return images.errorAlert.content;
      case 'success':
        return images.successAlert.content;
      case 'info':
        return images.info.content;
      default:
        return images.cancelAlert.content;
    }
  }
  getAlertFontColor() {
    switch (this.state.type) {
      case 'warn':
        return {title: '#ffffff', message: '#FFF5F5'};
      case 'error':
        return {title: '#ffffff', message: '#FFF5F5'};
      case 'success':
        return {title: '#ffffff', message: '#FFF5F5'};
      case 'info':
        return {title: '#ffffff', message: '#FFF5F5'};
      default:
        return {title: '#626262', message: '#7b7b7b'};
    }
  }

  alertWithType(params) {
    this.setState({...params, showSelf: params.show});
    if (params.show) {
      const {useNativeDriver = false} = params;
      Animated.spring(this.springValue, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver,
      }).start();
    }
    if (params.autoHide) {
      setTimeout(() => {
        this._springHide();
      }, 10000);
    }
  }

  _springShow = fromConstructor => {
    const {useNativeDriver = false} = this.state;

    this._toggleAlert(fromConstructor);
    Animated.spring(this.springValue, {
      toValue: 1,
      bounciness: 10,
      useNativeDriver,
    }).start();
  };

  _springHide = () => {
    const {useNativeDriver = false} = this.state;

    if (this.state.showSelf === true) {
      //   Animated.spring(this.springValue, {
      //     toValue: 0,
      //     tension: 10,
      //     useNativeDriver,
      //   }).start();

      setTimeout(() => {
        this._toggleAlert();
        this._onDismiss();
      }, 70);
    }
  };

  _toggleAlert = fromConstructor => {
    if (fromConstructor != undefined) this.state = {showSelf: fromConstructor};
    else this.setState({showSelf: !this.state.showSelf});
  };

  _handleHwBackEvent = () => {
    const {closeOnHardwareBackPress} = this.state;
    if (this.state.showSelf && closeOnHardwareBackPress) {
      this._springHide();
      return true;
    } else if (!closeOnHardwareBackPress && this.state.showSelf) {
      return true;
    }

    return false;
  };

  _onTapOutside = () => {
    const {closeOnTouchOutside} = this.state;
    if (closeOnTouchOutside) this._springHide();
  };

  _onDismiss = () => {
    const {onDismiss} = this.state;
    onDismiss && onDismiss();
  };

  _renderButton = data => {
    const {text, backgroundColor, buttonStyle, buttonTextStyle, onPress} = data;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, {backgroundColor}, buttonStyle]}>
          <Text style={[styles.buttonText, buttonTextStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  _renderCancel = data => {
    const {onPress} = data;

    return (
      <TouchableOpacity
        style={{
          padding: 8,
          width: 36,
          height: 36,
          alignSelf: 'center',
        }}
        onPress={onPress}>
        <Image
          style={{
            padding: 8,
            width: 36,
            height: 36,
            alignSelf: 'center',
          }}
          source={this.getAlertIcon()}
        />
      </TouchableOpacity>
    );
  };

  _renderAlert = () => {
    const animation = {
      transform: [{scale: this.springValue}],
      position: 'absolute',
      top: 10,
      left: 0,
      right: 0,
    };

    const {showProgress} = this.state;
    const {title, message, customView = null} = this.state;

    const {
      showCancelIcon,
      showCancelButton,
      cancelText,
      cancelButtonColor,
      cancelButtonStyle,
      cancelButtonTextStyle,
      onCancelPressed,
    } = this.state;
    const {
      showConfirmButton,
      confirmText,
      confirmButtonColor,
      confirmButtonStyle,
      confirmButtonTextStyle,
      onConfirmPressed,
    } = this.state;

    const {
      alertContainerStyle,
      overlayStyle,
      progressSize,
      progressColor,
      contentContainerStyle,
      contentStyle,
      titleStyle,
      messageStyle,
      actionContainerStyle,
      delay,
    } = this.state;

    const cancelButtonData = {
      text: cancelText,
      backgroundColor: cancelButtonColor,
      buttonStyle: cancelButtonStyle,
      buttonTextStyle: cancelButtonTextStyle,
      onPress: onCancelPressed,
    };

    const confirmButtonData = {
      text: confirmText,
      backgroundColor: confirmButtonColor,
      buttonStyle: confirmButtonStyle,
      buttonTextStyle: confirmButtonTextStyle,
      onPress: onConfirmPressed,
    };

    const fontColor = this.getAlertFontColor();
    return (
      <Modal
        animationType={delay ? 'none' : 'fade'}
        transparent={true}
        visible
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
        }}
        style={[
          styles.container,
          alertContainerStyle,
          {zIndex: 1, backgroundColor: this.getBackgroundColorForType()},
        ]}>
        <TouchableWithoutFeedback onPress={this._springHide}>
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>

        {showCancelIcon && !delay ? (
          <TouchableWithoutFeedback onPress={this._springHide}>
            <Animated.View
              style={[
                styles.contentContainer,
                animation,
                contentContainerStyle,
                {backgroundColor: this.getBackgroundColorForType()},
              ]}
              onPress={this._springHide}>
              <View style={[styles.content, contentStyle]}>
                {title ? (
                  <Text
                    style={[
                      styles.title,
                      titleStyle,
                      {color: fontColor.title},
                    ]}>
                    {title}
                  </Text>
                ) : null}
                {message ? (
                  <Text
                    style={[
                      styles.message,
                      messageStyle,
                      {color: fontColor.message},
                    ]}>
                    {message}
                  </Text>
                ) : null}
                {customView}
              </View>
              <View style={[styles.action, actionContainerStyle]}>
                {showCancelIcon ? this._renderCancel(cancelButtonData) : null}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : showCancelIcon && delay ? (
          <TouchableWithoutFeedback onPress={this._springHide}>
            <View
              style={[
                styles.contentContainer,
                contentContainerStyle,
                {backgroundColor: this.getBackgroundColorForType()},
              ]}
              onPress={this._springHide}>
              <View style={[styles.content, contentStyle]}>
                {title ? (
                  <Text
                    style={[
                      styles.title,
                      titleStyle,
                      {color: fontColor.title},
                    ]}>
                    {title}
                  </Text>
                ) : null}
                {message ? (
                  <Text
                    style={[
                      styles.message,
                      messageStyle,
                      {color: fontColor.message},
                    ]}>
                    {message}
                  </Text>
                ) : null}
                {customView}
              </View>
              <View style={[styles.action, actionContainerStyle]}>
                {showCancelIcon ? this._renderCancel(cancelButtonData) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <Animated.View
            style={[styles.contentContainer, animation, contentContainerStyle]}
            onPress={this._springHide}>
            <View style={[styles.content, contentStyle]}>
              {showProgress ? (
                <ActivityIndicator size={progressSize} color={progressColor} />
              ) : null}
              {title ? (
                <Text style={[styles.title, titleStyle]}>{title}</Text>
              ) : null}
              {message ? (
                <Text style={[styles.message, messageStyle]}>{message}</Text>
              ) : null}
              {customView}
            </View>
            <View style={[styles.action, actionContainerStyle]}>
              {showCancelButton ? this._renderButton(cancelButtonData) : null}
              {showConfirmButton ? this._renderButton(confirmButtonData) : null}
            </View>
          </Animated.View>
        )}
      </Modal>
    );
  };

  render() {
    const {showSelf} = this.state;

    if (showSelf) return this._renderAlert();

    return null;
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     const { show } = nextProps;
  //     const { showSelf } = this.state;

  //     if (show && !showSelf) this._springShow();
  //     else if (show === false && showSelf) this._springHide();
  // }

  componentWillUnmount() {
    HwBackHandler.removeEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }
}

TIBAlert.propTypes = {
  show: PropTypes.bool,
  useNativeDriver: PropTypes.bool,
  showProgress: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  closeOnTouchOutside: PropTypes.bool,
  closeOnHardwareBackPress: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
  customView: PropTypes.object,
};

TIBAlert.defaultProps = {
  show: false,
  useNativeDriver: false,
  showProgress: false,
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  cancelButtonColor: '#D0D0D0',
  confirmButtonColor: '#AEDEF4',
  customView: null,
};
