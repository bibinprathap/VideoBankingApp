import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions,Platform,StatusBar,StyleSheet} from 'react-native'
const DevHeight = Dimensions.get('window').height
const DevWidth = Dimensions.get('window').width
const StbrHeight=StatusBar.currentHeight

const greenColor = '#00822C'


class ButtonComp extends Component {
       onSelectButtonX =()=>{
           console.warn('hhhh')
       }
    render() {
        const {Val,Active,onSelect} = this.props
        return (
            <View>
                {Val!='Fri' &&<TouchableOpacity style={Active==Val ? styles.ActiveButtonStyle : styles.buttonStyle } onPress={onSelect}>
                    <Text style={{fontSize:12,color:Active==Val? 'white': 'black'}}>{Val}</Text>
                </TouchableOpacity>}
                {Val=='Fri' &&<View style={styles.FridayButton}>
                    <Text style={{fontSize:12,color:Active==Val? 'white': 'black'}}>{Val}</Text>
                </View>}
            </View>
        )
    }
}

class CustomeRadioButton extends Component {
    render() {
        const {Val,ActiveType,onSelect,Name} = this.props
        return (
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={onSelect}>
                <View style={styles.radio}>
                    {ActiveType==Val &&<View style={{height:10,width:10,borderRadius:5,backgroundColor:'black'}}/>}
                </View>
                <Text style={styles.noti}>{Name}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    buttonStyle:{
        height:40,
        width:(DevWidth-110)/5,
        backgroundColor:'#DBDFE7',
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    ActiveButtonStyle:{
        height:40,
        width:(DevWidth-110)/5,
        backgroundColor:greenColor,
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    FridayButton:{
        height:40,
        width:(DevWidth-110)/5,
        backgroundColor:'rgb(128,128,128)',
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    radio:{
        height:17,width:17,
        borderRadius:10,
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center'
    },
    noti:{
        // fontFamily:font.medium,
        fontSize:13,
        marginLeft:10,
        marginRight:40
    }
});
export {ButtonComp,CustomeRadioButton}
