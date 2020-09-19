import React, { Component } from 'react'
import { Text, View,ImageBackground,Image,TouchableOpacity } from 'react-native'

export default class index extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1}} source={require('./bground.jpeg')}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:170,width:170}} source={require('./logo.jpeg')}/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Text>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:20}}>
                            <Text>العربية</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}></View>
                </ImageBackground>
            </View>
        )
    }
}
