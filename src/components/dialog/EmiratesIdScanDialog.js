import React from 'react';
import { View, TouchableOpacity,StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { withNavigation } from 'react-navigation'; 
import IdScan from './idScan/IdScan';
import IdScanHeader from '../InputControls/IdScanHeader';
import { Icon} from '../Icon/index';  
import {Modal} from '../Modal';

class EmiratesIdScanDialog extends React.PureComponent {
    state = { idScanModalVisible: false, flashOn: this.props.flashOn, isScaning: true, error: false };
    constructor(props) {
        super(props);
        this.toggleIdScanDialog = this.toggleIdScanDialog.bind(this);
        this.flashButtonClick = this.flashButtonClick.bind(this);
        this.setIsScaning = this.setIsScaning.bind(this);
    }
    toggleIdScanDialog = () => {
        this.setState({
            idScanModalVisible: !this.state.idScanModalVisible,
            flashOn: this.props.flashOn,
            isScaning: true,
            error: false,
        });
    };
    flashButtonClick = () => {
       // if (this.props.dispatch) this.props.dispatch(setCameraFlash(!this.props.flashOn));
        //  this.setState({ flashOn: !this.props.flashOn });
        this._idScan.onSetFlashOn(this.props.flashOn);
    };
    reScanButtonClick = () => {
        this._idScan.onResetScan();
        this.setState({ isScaning: true, error: false });
    };
    setIsScaning = val => {
        this.setState({ isScaning: val });
    };
    onAccept = result => {
        this.setState({ idScanModalVisible: false, isScaning: true, error: false });
        this.props.onAccept(result);
    };

    onError = e => {
        this.props.onError(e);
        this.setState({ error: e, idScanModalVisible: true, isScaning: false });
    };

    render() {
        const containerStyle = this.props.formTitle ? {} : { flex: 0, width: 50 };
        return (
            <View style={[styles.titleContainer, containerStyle]}>
                {this.props.formTitle ? <Text style={styles.title}>{this.props.formTitle}</Text> : null}
                {this.props.formTitle ? (
                    <View style={styles.scanButtonContainer}>
                        <TouchableOpacity onPress={this.toggleIdScanDialog} disabled={!this.props.editable} style={styles.scanButtonTouchWrapper}>
                            <Text style={styles.scanButton} numberOfLines={1}>
                                {'Scan Document'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={this.toggleIdScanDialog} disabled={!this.props.editable} style={styles.scanButtonTouchWrapper}>
                        <View style={this.props.isbutton ? styles.button : styles.flat}>
                            <Icon type="MaterialCommunityIcons" name="credit-card-scan" size={40} />
                        </View>
                    </TouchableOpacity>
                )}
                <Modal animationType="slide" transparent={false} visible={this.state.idScanModalVisible} onRequestClose={this.toggleIdScanDialog}>
                    <IdScanHeader
                        backAction={this.toggleIdScanDialog}
                        flashButtonClick={this.flashButtonClick}
                        ReScanButtonClick={this.reScanButtonClick}
                        flashOn={this.props.flashOn}
                        isScaning={this.state.isScaning}
                        title={'Scan Document'}
                    />
                    <IdScan
                        ref={ref => {
                            this._idScan = ref;
                        }}
                        {...this.props}
                        requestClose={this.toggleIdScanDialog}
                        onReject={this.toggleIdScanDialog}
                        onAccept={this.onAccept}
                        isScaning={this.state.isScaning}
                        onError={this.onError}
                        error={this.state.error}
                        setIsScaning={this.setIsScaning}
                        idScanModalVisible={this.state.idScanModalVisible}
                    />
                </Modal>
            </View>
        );
    }
}

export default withNavigation(EmiratesIdScanDialog);
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        width: 90,
        height: 50,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#959DAD',
        backgroundColor: '#F4F8FC',
    },
    flat: { flex: 1, height: 50, width: 50, marginHorizontal: 5, paddingTop: 4 },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 26,
        color: '#454F63',
        marginStart: 10,
    },
    scanButtonContainer: {
        flex: 1,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#BBC1C9',
        marginHorizontal: 10,
        maxWidth: 100,
    },
    scanButtonTouchWrapper: {
        flex: 1,
    },
    scanButton: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
    },
});
