import React, { Component } from 'react';
import AnimatedInput from "react-native-animated-input";
import { View, Text } from 'react-native';

 class CustomeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <View style={{height:60,marginVertical:10,borderBottomWidth:0.5,borderColor:'#abc',}}>
            
            <AnimatedInput
                    useNativeDrive
                    placeholder={this.props.PlaceHolder}
                    valid={true}
                    errorText="Error"
                    onChangeText={this.props.onTexting}
                    value={this.props.Value}
                    styleLabel={{fontSize:12,color:'#D6B045'}}
                    styleBodyContent={{ borderBottomWidth: 0,color:'red' }}
                    // styleInput={{color:'#00A2FF',fontSize:15,fontFamily:config.regular}}
                    // keyboardType={props.keyboardType ? props.keyboardType:'default'}
                    secureTextEntry={this.props.secureTextEntry? true:false}
                    // onFocus={()=>setactive(true)}
                    // onBlur={()=>setactive(false)}

                />
            
    </View>
    );
  }
}

export {CustomeInput}

