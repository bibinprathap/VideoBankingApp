
import { Dimensions,I18nManager,StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = '#fff';

const scanBarWidth = width * 0.8; // this is equivalent to 180 from a 393 device width
const scanBarHeight = width * 0.0028; //this is equivalent to 1 from a 393 device width
const scanBarColor = 'red';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headingContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    table: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CFD0D3',
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 8,
        minHeight: 100,
        maxHeight: 200,
        width: '98%',
        backgroundColor: 'rgba(1,1,1,0.62)',
    },
    buttonContainer: {
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
        width: '98%',
        marginBottom: 5,
        justifyContent: 'flex-end',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3ACCE1',
        maxHeight: 100,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 22,
        color: '#FFFFFF',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    headingCell: {
        flex: 2,
        fontSize: 18,
        color: '#FFFFFF',
    },
    valueCell: {
        flex: 5,
        fontSize: 18,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CFD0D3',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#FFFFFF',

        flexWrap: 'wrap',
    },
    screenHeading: {
        fontSize: 30,
    },
    screenDescription: {
        fontSize: 22,
        textAlign: 'center',
    },

    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    scannerview: {
        height: 330,
        width: 500,
        flex: 1,
        justifyContent: 'flex-start',
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        zIndex: 200,
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskOutterPreview: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    maskInner: {
        width: 500,
        height: 292,
        backgroundColor: 'transparent',
        // borderColor: 'white',
        // borderWidth: 1,
        // borderRadius: 30,
        borderWidth: 1,
        borderColor: '#CFD0D3',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.3)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { flexDirection: 'row', borderRadius: 30 },
    flashIcon: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: rectBorderColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    topOverlay: {
        flex: 1,
        height: width,
        width: width,
        backgroundColor: overlayColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomOverlay: {
        flex: 1,
        height: width,
        width: width,
        backgroundColor: overlayColor,
        paddingBottom: width * 0.25,
    },

    leftAndRightOverlay: {
        height: width * 0.65,
        width: width,
        backgroundColor: overlayColor,
    },

    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
        backgroundColor: scanBarColor,
    },
    errorMessage: {
        fontSize: 18,

        color: '#FF0000',
        alignSelf: 'flex-start',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    errorWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1,1,1,0.3)',
    },
    buttonPositiveDisabled: {
        backgroundColor: '#959DAD',
    },
    buttonTextDisabled: {
        color: '#cccccc',
    },
});
