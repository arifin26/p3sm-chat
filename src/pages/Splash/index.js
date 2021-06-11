/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, {useState, useEffect} from 'react';

//Import all required component
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import {LOGO_SPLASH} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('@access_token').then(value =>
        props.navigation.navigate(value === null ? 'Signin' : 'home'),
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eef2f3" barStyle="dark-content" />
      <Image
        source={LOGO_SPLASH}
        style={{
          width: 200,
          resizeMode: 'contain',
          margin: 30,
          height: 200,
          borderRadius: 60 / 2,
        }}
      />

      {/* <ActivityIndicator
        animating={animating}
        color="#00c6ff"
        size="large"
        style={styles.activityIndicator}
      /> */}
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef2f3',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
