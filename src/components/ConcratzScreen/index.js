import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import {ScrollView} from 'react-native-gesture-handler';
import Logo from '../../../assets/MainLogo.png';
import Community from '../../../assets/Community.png';
import Verifiyed from '../../../assets/Verifiyed.png';
import StarRating from 'react-native-star-rating';

const normalizeFont = size => {
  return size * (width * 0.0025);
};

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
  onStarRatingPress=(rating)=> {
    this.setState({
      starCount: rating
    });
  }
  render() {
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <ScrollView
          behavior="padding"
          contentContainerStyle={styles.innerContainer}>
          <Text style={styles.headerText}>Congratulations</Text>
          <View style={styles.mainContainer}>
            <View style={{flex: 0.9, marginVertical: hp('2')}}>
              <View style={styles.successContainer}>
                <View style={{flex: 0.5}}>
                  <Image style={styles.logoImage} source={Logo} />
                </View>

                <View style={{flex: 0.4}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'green'}}>
                      Congratulations Your Bank Account
                    </Text>
                    <Text style={{color: 'green'}}>Has been created</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'green'}}>
                      You will receive an Email shortly
                    </Text>
                    <Text style={{color: 'green'}}>About account details</Text>
                  </View>
                </View>
                <View style={{flex: 0.5}}>
                  <Image style={styles.logoImage} source={Community} />
                </View>
              </View>
              <View style={{height:80,alignItems:'center'}}>
                <Text style={{marginTop:20,color:'green'}}>How was your experience ?</Text>
                <View style={{width:110,height:30,marginTop:20}}>
                  <StarRating
                    disabled={false}
                    starSize={18}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    emptyStarColor={'#abc'}
                    fullStarColor={'#ECB400'}
                  />
                </View>
              
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity activeOpacity={0.9}>
                <Image style={styles.verifiedImage} source={Verifiyed} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: hp('4'),
  },
  headerText: {
    fontFamily: 'Lora-Bold',
    textAlign: 'left',
    fontSize: normalizeFont(21),
  },
  mainContainer: {
    paddingVertical: hp('2'),
    flex: 0.9,
  },
  successContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoImage: {
    width: hp('15'),
    height: hp('15'),
    resizeMode: 'contain',
  },
  verifiedImage: {
    width: hp('10'),
    height: hp('10'),
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
