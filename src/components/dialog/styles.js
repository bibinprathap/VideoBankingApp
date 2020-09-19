import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    imagecontainer: {
        flex: 1,
        backgroundColor: '#F7F7FA',
    },
    previewContainer: {
        flex: 1,
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7FA',
    },
    previewInnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewNoImageSelectedText: {
        color: '#959DAD',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
    },
    previewImage: {},
    addPictureButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPictureButton: {
        padding: 10,
    },
    addPictureButtonIcon: {
        color: '#FFFFFF',
    },
    imageListContainer: {
        flex: 1,
        maxHeight: 100,
        paddingVertical: 0,
        paddingHorizontal: 5,
        backgroundColor: '#2A2E43',
        flexDirection: 'row',
    },
    doneButton: {
        backgroundColor: '#3ACCE1',
        alignSelf: 'center',
        width: '98%',
        marginVertical: 5,
        paddingVertical: 5,
        fontFamily: 'HelveticaNeueLTArabicRoman',
        fontSize: 14
    },
    imageList: {},
    pdf: {
        flex: 1,
        width: 500,
        height: 500,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 2,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        paddingRight: 5,
    },
    image: {},
    selectedImage: {
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#058DFC',
    },
    brokenImageIcon: {
        color: '#FFFFFF',
    } 
    
    
});
