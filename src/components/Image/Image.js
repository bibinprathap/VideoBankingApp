import React, { Component } from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, I18nManager, TouchableHighlight,StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
 

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    animatedContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: '#FFFFFF',
    },
    zoomableAnimatedContainer: {
        position: 'absolute',
        top: 5,
        left: 700,
        color: '#FFFFFF',
    },
});

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isError: false,
        };
        this.handleOnLoadEnd = this.handleOnLoadEnd.bind(this);
        this.handleOnLoadStart = this.handleOnLoadStart.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
    }
    setIsLoading = loading => {
        this.setState({ isLoading: loading });
    };

    handleOnError = error => {
        this.setState({ isError: true });
    };

    handleOnLoad = () => {
        this.setState({ isError: false });
    };

    handleOnLoadEnd = () => {
        this.setIsLoading(false);
    };

    handleOnLoadStart = () => {
        this.setIsLoading(true);
    };

    render() {
       

         const { isLoading, isError } = this.state;
         const {attachmenturi } = this.props;
         
        const handleRef = ref => (this.theImage = ref);

         
        return (
            <>
                <FastImage
                    ref={handleRef}
                    onLoadStart={this.handleOnLoadStart}
                    onLoadEnd={this.handleOnLoadEnd}
                    onError={this.handleOnError}
                    onLoad={this.handleOnLoad}
                    {...{
                        ...this.props,
                        source: {
                            uri: attachmenturi,
                            priority: FastImage.priority.normal
                        },
                    }}
                />
            
                 
                {isLoading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="small" animating color={'#3ACCE1'} />
                     </View>
                )}
              
            </>
        );
    }
}
 

export default  Image;
 
