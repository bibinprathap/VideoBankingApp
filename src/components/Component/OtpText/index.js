import React, {Component} from 'react';
import {View, TextInput, Dimensions, Keyboard} from 'react-native';
const {width, height} = Dimensions.get('screen');
const normalizeFont = size => {
  return size * (width * 0.0025);
};

class OtpText extends Component {
  inputs = {};
  focusTheField = id => {
    this.inputs[id].focus();
  };
  constructor(props) {
    super(props);
    this.state = {
      textinputOne: '',
      textinputTwo: '',
      textinputThree: '',
      textinputFour: '',
    };
  }

  firstText = text => {
    this.setState(
      {
        textinputOne: text,
        textinputTwo: '',
        textinputThree: '',
        textinputFour: '',
      },
      () => this.focusTheField('field2'),
    );
  };

  secondText = text => {
    this.setState({textinputTwo: text}, () => this.focusTheField('field3'));
  };

  thirdText = text => {
    this.setState({textinputThree: text}, () => this.focusTheField('field4'));
  };

  fourthText = text => {
    this.setState({textinputFour: text}, () => {
      Keyboard.dismiss();
      const {
        textinputOne,
        textinputTwo,
        textinputThree,
        textinputFour,
      } = this.state;
      this.props.onChange(
        textinputOne + textinputTwo + textinputThree + textinputFour,
      );
    });
  };

  render() {
    return (
      <View
        style={{
          height: 70,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <TextInput
            value={this.state.textinputOne}
            onChangeText={text =>
              this.setState({textinputOne: ''}, () => this.firstText(text))
            }
            style={{
              fontSize: normalizeFont(24),
              width: 40,
              height: 40,
              textAlign: 'center',
            }}
            onFocus={() =>
              this.setState({
                textinputOne: '',
                textinputTwo: '',
                textinputThree: '',
                textinputFour: '',
              })
            }
            keyboardType="number-pad"
            returnKeyType="done"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusTheField('field2');
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <TextInput
            value={this.state.textinputTwo}
            onChangeText={text => this.secondText(text)}
            onFocus={() =>
              this.setState({
                textinputTwo: '',
              })
            }
            returnKeyType="done"
            keyboardType="number-pad"
            blurOnSubmit={false}
            ref={input => {
              this.inputs['field2'] = input;
            }}
            style={{
              fontSize: normalizeFont(24),
              width: 40,
              height: 40,
              textAlign: 'center',
            }}
            onSubmitEditing={() => {
              this.focusTheField('field3');
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <TextInput
            value={this.state.textinputThree}
            onChangeText={text => this.thirdText(text)}
            ref={input => {
              this.inputs['field3'] = input;
            }}
            onFocus={() =>
              this.setState({
                textinputThree: '',
              })
            }
            keyboardType="number-pad"
            returnKeyType="done"
            blurOnSubmit={false}
            style={{
              fontSize: normalizeFont(24),
              width: 40,
              height: 40,
              textAlign: 'center',
            }}
            onSubmitEditing={() => {
              this.focusTheField('field4');
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <TextInput
            value={this.state.textinputFour}
            onFocus={() =>
              this.setState({
                textinputFour: '',
              })
            }
            onChangeText={text => this.fourthText(text)}
            keyboardType="number-pad"
            // returnKeyType="done"
            blurOnSubmit={false}
            ref={input => {
              this.inputs['field4'] = input;
            }}
            style={{
              fontSize: normalizeFont(24),
              width: 40,
              height: 40,
              textAlign: 'center',
            }}
          />
        </View>
      </View>
    );
  }
}

export default OtpText;
