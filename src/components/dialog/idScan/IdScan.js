import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, TouchableOpacity, I18nManager, requireNativeComponent, UIManager, findNodeHandle, DeviceEventEmitter } from 'react-native';
import { Text, Button } from 'react-native-paper';
import {Loader} from '../../Loader/index'
import { Icon} from '../../Icon/index'
import * as Animatable from 'react-native-animatable';
import styles from './styles'; 

/*
const scannedtext = {
    uaeId: '784-1968-6570305-0',
    expiryDate: '05-03-2022',
    firstName: 'Ahmad',
    middleName: 'Mohammed',
    lastName: 'Abdullah',
    familyName: 'Salim',
    birthDate: '27-07-1999',
    nationality: 'United Arab Emirates',
};
*/

class IdScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewText: '',

            running: false,
            scannedtext:  '',
        };
        this.onSaveScanButtonPressed = this.onSaveScanButtonPressed.bind(this);
        this.onReadEmiratesID = this.onReadEmiratesID.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSetFlashOn = this.onSetFlashOn.bind(this);
        this.onResetScan = this.onResetScan.bind(this);
        this.subscriptions = [];
    }
    async onReadEmiratesID(val) {
        this.setState({ scannedtext: val });
    }

    handleAcceptPress = () => {
        this.onSaveScanButtonPressed();
        if (this.props.onAccept) {
            this.props.onAccept(this.state.scannedtext);
        } else {
            this.props.requestClose && this.props.requestClose();
        }
    };

    handleRejectPress = () => {
        this.props.requestClose && this.props.requestClose();
    };
    onResetScan() {
        this.setState({
            running: false,
            scannedtext: '',
        });
        UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.startCamera, ['on']);
    }
    onSaveScanButtonPressed() {
        //return await NativeScanText.setFlashMode('off');
        UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.stopCamera, ['on']);
        // this.setState({ stopScan: true });
        //  UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.saveImage, []);
    }

    onSetFlashOn(flashOn) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.flashMode, [flashOn ? 'off' : 'on']);
    }
   

    async setFlashMode(flashMode = 'no') {
        return await NativeScanText.setFlashMode(flashMode);
    }
    componentDidMount() {
        let sub = DeviceEventEmitter.addListener('onReadEmiratesID', this.onReadEmiratesID);
        this.subscriptions.push(sub);
    }
    componentWillUnmount() {
        this.subscriptions.forEach(sub => sub.remove());
        this.subscriptions = [];
        UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.stopCamera, ['on']);
        if (this.props.setIsScaning) this.props.setIsScaning(false);
    }

    onChange(event) {
        if (event.nativeEvent.text) {
            this.setState({  scannedtext: event.nativeEvent.text });
             
           // UIManager.dispatchViewManagerCommand(findNodeHandle(this._scantext), UIManager.ScanText.Commands.stopCamera, ['on']);
            //if (this.props.setIsScaning) this.props.setIsScaning(false);
        }
    }
    makeSlideOutTranslation(translationType, fromValue, width) {
        return {
            from: {
                [translationType]: width * -0.13,
            },
            to: {
                [translationType]: fromValue,
            },
        };
    }
    render() {
        const textAlign = I18nManager.isRTL ? 'right' : 'left';
        const headingCellStyles = [styles.cell, styles.headingCell, { textAlign: textAlign }];
        const valueCellStyles = [styles.cell, styles.valueCell];
       
        const { height, width } = Dimensions.get('window');
        const maskRowHeight =  height/100 ;
        const maskColWidth = (width - 300) / 2;
        const adjust = 25; 

        return (
            <View style={styles.container}>
                {/* {this.state.showPreview ? (
                    <View style={{ position: 'absolute', top: -67, width: '100%', backgroundColor: '#ffffff', height: 100 }} />
                ) : null} */}
                <View style={styles.headingContainer}>
                    {/* <Text style={styles.screenHeading}>Id Scan screen</Text> */}
                    <View style={{ flex: 1 }}>
                        <ScanText
                            style={[styles.scannerview, { height, width, position: 'absolute', top: 0 }]}
                            {...this.props}
                            torchMode={this.props.flashOn ? 'on' : 'off'}
                            ref={ref => {
                                this._scantext = ref;
                            }}
                            cameraType={'back'}
                            onChange={this.onChange}
                        >
                            <View />
                        </ScanText>
                        <View style={[styles.maskOutter, { height, width }]}>
                            <View
                                style={[
                                    { flex: 11 },
                                    styles.maskRow,
                                    styles.maskFrame,
                                    { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
                                ]}
                            >
                                 
                                {this.props.isScaning && <Text style={{ fontSize: 18, color: 'white' }}>{'Scaning Document'}</Text>}
                                
                            </View>
                            <View style={[{ flex: 30 }, styles.maskCenter]}>
                                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                                <View style={[styles.maskInner, { height:  (height -height/3) }]}>
                                    {this.props.isScaning ? (
                                        <>
                                            <Icon
                                                type="MaterialCommunityIcons"
                                                name="camera-enhance-outline"
                                                size={width * 0.63}
                                                style={{ opacity: 0.0 }}
                                            />
                                            <Animatable.View
                                                style={styles.scanBar}
                                                direction="alternate-reverse"
                                                iterationCount="infinite"
                                                duration={1700}
                                                easing="linear"
                                                animation={this.makeSlideOutTranslation('translateY', width * -0.54, width)}
                                            />
                                        </>
                                    ) : null}
                                </View>
                                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                            </View>
                            <View style={[{ flex: maskRowHeight + adjust }, styles.maskRow, styles.maskFrame]} />
                        </View>
                    </View>
                    {/* {this.state.showPreview ? <Text style={styles.errorTextStyle}>{this.state.previewText}</Text> : null} */}
                    {/* {this.state.startScan ? this.renderSaveScanTextButton() : this.renderScanTextButton()} */}
                </View>

                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        marginHorizontal: 10 
                    }}
                >
                    <View style={styles.table}> 
                    <View style={styles.row}  >
                    <Text style={headingCellStyles}>{'Scanned Text'}</Text>
                    {/* <ScrollView> */}
                    <Text style={valueCellStyles}>{this.state.scannedtext }</Text>
                    {/* </ScrollView> */}
                </View>
                </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, this.props.isScaning || this.props.error ? styles.buttonPositiveDisabled : null]}
                            disabled={this.props.isScaning || this.state.running || this.props.error}
                            onPress={this.handleAcceptPress}
                        >
                            <Loader loading={this.state.running} sprinnerSize={14}>
                                <Text style={[styles.buttonText, this.props.isScaning || this.props.error ? styles.buttonTextDisabled : null]}>
                                    {'Accept'}
                                </Text>
                            </Loader>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
var ScanText = requireNativeComponent('ScanText', IdScan, {
    nativeOnly: { onChange: true },
});

export default IdScan;
