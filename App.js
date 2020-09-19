import React, {Component} from 'react';
import Navigator from './src/navigator';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {AuthService} from './src/services';
import {SafeAreaView} from 'react-native';
import alertsHelper from './src/api/helperServices/alerts';
import {TIBAlert} from './src/components/TIBAlert';
// Imports: Redux Persist Persister
import {store, persistor} from './src/redux/store/store';
import {connect} from 'react-redux';
import {StackNavigator} from './src/navigator';
// import {createAppContainer} from 'react-navigation';
import {createAppContainer} from 'react-navigation';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'English',
    };
    AuthService.init();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <SafeAreaView style={{flex: 1}}> */}
          <Navigator />
          <TIBAlert ref={ref => alertsHelper.setAlertProviderNew(ref)} />
          {/* </SafeAreaView> */}
        </PersistGate>
      </Provider>
    );
  }

  // render = () => (
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <SafeAreaView style={{flex: 1}}>
  //         <Navigator />
  //         <TIBAlert ref={ref => alertsHelper.setAlertProviderNew(ref)} />
  //       </SafeAreaView>
  //     </PersistGate>
  //   </Provider>
  // );
}

// function mapStateToProps(state) {
//   console.log(state, 'state');
//   return {
//     Language: state.language.defaultLanguage,
//   };
// }

// export default connect(mapStateToProps)(App);
