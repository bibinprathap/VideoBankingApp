import React from 'react';
import { View, ActivityIndicator, InteractionManager } from 'react-native';
import styles from './styles';

const screenWithSpinner = (WrappedScreen, spinnerProps) => {
    class ScreenWithSpinner extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                didFinishInitialAnimation: false,
                didFinishLoading: false,
            };
        }

        componentDidMount = () => {
            InteractionManager.runAfterInteractions(() => {
                /*
                    Todo: separate the Initial animation and loading/ pre-rendering for even better user experience
                    example: set "didFinishInitialAnimation: true" firs, and show minimal components,
                            such as disabled navigation and breadcrumb, then trigger api calls, or
                            pre-render any heavy/ dynamically generated components, and store them
                            in wrapped component's state and set didFinishLoading = true.
                            When didFinishLoading = true, render the actual component in its entirety.
                */



                //RJ: funny hack to make the spinner thing work, after upgrade to RN0.60, without timeout, the state is set immediately, before all interactions end
                setTimeout(() => {
                    this.setState({
                        didFinishInitialAnimation: true,
                        didFinishLoading: true,
                    });
                }, 0);
            });
        };

        render() {

            if (!this.state.didFinishInitialAnimation) {
                const themeStlye = !!spinnerProps && spinnerProps.theme === 'dark' ? styles.containerDark : styles.containerLight;
                const spinnerStyles = [styles.container, themeStlye];
                return (
                    //first stage spinner
                    <View style={spinnerStyles}>
                        <ActivityIndicator />
                    </View>
                );
            } else if (!this.state.didFinishLoading) {
                const themeStlye = styles.containerDark;
                const spinnerStyles = [styles.container, themeStlye];
                return (
                    //second stage spinner to show progress
                    <View style={spinnerStyles}>
                        <ActivityIndicator />
                    </View>
                );
            } else {
                //actual screen
                return <WrappedScreen {...this.props} />;
            }
        }
    }
    return ScreenWithSpinner;
};

export default screenWithSpinner;
