 
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    contentContainer: {
        alignItems: 'flex-start',
    },
    appBar: {
        backgroundColor: '#058DFC',
        zIndex: 1000,
    },
    startContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    endContainer: {
        flexDirection: 'row',
    },
    containerGeneric: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    titleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {},
    buttonWrapper: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
    },
    signatureCaptureWrapper: {
        width: '100%',
        height: 300,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CFD0D3',
    },
    signature: {
        flex: 1,
    },
    signatureBtnSave: {
        backgroundColor: '#665EFF',
        margin: 5,
    },
    signatureBtnSaveText: {
        color: '#FFFFFF',
    },
    resetBtn: {
        margin: 5,
        backgroundColor: '#959DAD',
    },
    resetBtnText: {
        color: '#FFFFFF',
    },
    headetItem: {
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    contentTitle: {
       
        color: '#FFFFFF',
    },
    contentSubtitle: {
        fontFamily: 'AraESNawarRegular',
        color: '#FFFFFF',
    },
    icon: {
        color: 'white',
        fontSize: 28,
    },
});
