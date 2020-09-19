import React, { Component } from 'react';
import { View, Text, StatusBar, Alert,StyleSheet } from 'react-native';
 

// import RNSketchCanvas from '../../../ThirdPartyModuleJS/RNSketchCanvas';

import { Icon} from '../Icon/index'
import { Loader} from '../Loader/index' 
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    strokeColorButton: {
        marginVertical: 3,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'center',
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 15,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 12,
        paddingHorizontal: 12,
        fontSize: 25,
        color: 'white',
    },
    buttonStyleSave: {
        marginHorizontal: 10,
        fontSize: 28,
    },
    headerContainerStyle: {
        backgroundColor: '#058DFC',
        paddingHorizontal: 5,
    },
});

class ImageMarker extends Component {
    constructor(props) {
        super();
        this.state = { path: null };
    }

    componentDidMount() {
        this.getLocalPath(this.props.path);
    }

    getLocalPath = imagePath => {
        try {
            let path = imagePath;
            this.setState({ path });
        } catch (e) {}
    };
    generateUniqueIntegerKey = () => {
        var i = new Date().getTime();
        i = i & 0xffffffff; 
        return i; //time stamp upto 999th millisecond
    };
    render() {
        const { path } = this.state;
        if (!path) {
            return <Loader loading={true} />;
        } 
        const imagePath = path.replace('file://', '');
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#058DFC'} barStyle="light-content" />
                {/* <RNSketchCanvas
                    localSourceImage={{ filename: imagePath, directory: null, mode: 'AspectFit' }}
                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    headerContainerStyle={styles.headerContainerStyle}
                    canvasStyle={{ backgroundColor: 'transparent', flex: 1, marginHorizontal: 5 }}
                    strokeColors={[{ color: '#dddddd' }, { color: '#FF0000' }, { color: '#000000' }]}
                    onStrokeEnd={data => {}}
                    closeComponent={<Icon type="MaterialCommunityIcons" name="arrow-left" style={styles.buttonStyle} />}
                    onClosePressed={() => {
                        if (this.props.onRequestClose) {
                            this.props.onRequestClose();
                        }
                    }}
                    undoComponent={<Icon type="MaterialCommunityIcons" name="undo" style={styles.buttonStyle} />}
                    onUndoPressed={id => {
                        // Alert.alert('do something')
                    }}
                    clearComponent={<Icon type="MaterialCommunityIcons" name="close" style={styles.buttonStyle} />}
                    onClearPressed={() => {
                        // Alert.alert('do something')
                    }}
                    eraseComponent={<Icon type="MaterialCommunityIcons" name="eraser" style={styles.buttonStyle} />}
                    strokeComponent={color => <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />}
                    strokeSelectedComponent={(color, index, changed) => {
                        return <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />;
                    }}
                    strokeWidthComponent={w => {
                        return (
                            <View style={styles.strokeWidthButton}>
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        marginHorizontal: 2.5,
                                        width: Math.sqrt(w / 3) * 10,
                                        height: Math.sqrt(w / 3) * 10,
                                        borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                                    }}
                                />
                            </View>
                        );
                    }}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={5}
                    saveComponent={<Icon type="MaterialCommunityIcons" name="check" style={[styles.buttonStyle, styles.buttonStyleSave]} />}
                    savePreference={() => {
                        return {
                            folder: 'admEditedImages',
                            filename: this.generateUniqueIntegerKey(),
                            transparent: false,
                            imageType: 'jpg',
                        };
                    }}
                    onSketchSaved={(success, path) => {
                        if (success) {
                            this.props.onSave(path);
                        } else {
                            Alert.alert('Failed to save image!', path);
                        }
                    }}
                    onPathsChange={pathsCount => {}}
                /> */}
            </View>
        );
    }
}

export default ImageMarker;
