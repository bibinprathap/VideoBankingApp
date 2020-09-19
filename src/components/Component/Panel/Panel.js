import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { normalizeFont } from '../../../api/helperServices/language';
import Icons from 'react-native-vector-icons/MaterialIcons';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_visible: false,
      expanded: false,
      animationValue: new Animated.Value(0),
      viewState: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ is_visible: true });
    }, 100);
  }

  toggleAnimation = () => {
    if (this.state.viewState == true) {
      Animated.timing(this.state.animationValue, {
        toValue: 0,
        timing: 1500,
      }).start(() => {
        this.setState({ viewState: false });
      });
    } else {
      Animated.timing(this.state.animationValue, {
        toValue: this.props.maxItem,
        timing: 15000,
      }).start(this.setState({ viewState: true }));
    }
  };

  renderItemvalue = itemData => {
    let item = itemData.item;
    return (
      <TouchableOpacity
        onPress={() => [
          this.props.selectValue(item),
          this.props.action(item),
          Animated.timing(this.state.animationValue, {
            toValue: 0,
            timing: 1500,
          }).start(() => {
            this.setState({ viewState: false });
          }),
        ]}
        style={{ paddingLeft: 10, marginLeft: 10, marginVertical: 15 }}>
        <Text
          style={{
            fontSize: normalizeFont(16),
            textAlign: this.props.language === 'English' ? 'left' : 'right',
          }}>
          {this.props.language === 'English' ? item.Text : item.TextAr}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const animatedStyle = {
      height: this.state.animationValue,
    };
    console.log(this.props.itemValue)
    return (
      <TouchableWithoutFeedback style={{ padding: 10, backgroundColor: '#fff' }}>
        <>
      <TouchableOpacity
            onPress={this.props.itemValue !== '' ? this.toggleAnimation : this.props.onPress}
            activeOpacity={1}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              // backgroundColor: '#F7F7F7',
              height: 40,
              alignItems: 'center',
            }}>
            {this.props.language == 'English' ? (
              <>
                <Text style={styles.text}>{this.props.header}</Text>

                <Icons
                  size={30}
                  name={
                    !this.state.viewState
                      ? 'keyboard-arrow-down'
                      : 'keyboard-arrow-up'
                  }
                  color="#ddd"
                />
              </>
            ) : (
                <>
                  <Icons
                    size={30}
                    name={
                      !this.state.viewState
                        ? 'keyboard-arrow-down'
                        : 'keyboard-arrow-up'
                    }
                    color="#ddd"
                  />

                  <Text style={styles.text}>{this.props.header}</Text>
                </>
              )}
          </TouchableOpacity>
        <Animated.ScrollView style={[styles.animatedBox, animatedStyle]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          nestedScrollEnabled={true}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >


          {this.state.viewState && (
            <View
              style={{
                flex: 1,
                width: '100%',
                paddingTop: 5,
              }}>
              <FlatList
                data={this.props.itemValue}
                renderItem={itemData => this.renderItemvalue(itemData)}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
              />
            </View>
          )}
        </Animated.ScrollView>
        </>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    paddingLeft: 5,
    fontFamily: 'UberMoveText-Light',
  },
  buttonImage: {
    width: 30,
    height: 25,
  },

  animatedBox: {
    height: 0,
    backgroundColor: '#fff',
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 0.2,
    paddingBottom: 5,
  },
});

Panel.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onPress: PropTypes.func,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => {
  return {
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(Panel);
