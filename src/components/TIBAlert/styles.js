import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
    },
    contentContainer: {
        maxWidth: width,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    title: {
        paddingVertical: 5,
        paddingHorizontal: 15,

        fontSize: 18,
    },
    message: {
        paddingTop: 5,

        fontSize: 14,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
});

export default styles;
