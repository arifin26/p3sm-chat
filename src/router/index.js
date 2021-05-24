import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createCompatNavigatorFactory} from '@react-navigation/compat';

import {
  Signin,
  Beranda,
  Chat,
  Profil,
  Edit_profil,
  Info_panggilan,
  Pengaturan,
  Pengaturan_akun,
  Pusat_bantuan,
  Ubah_sandi,
  SplashScreen,
} from '../pages';
const Stack = createStackNavigator();
const RootStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Splash: {screen: SplashScreen, navigationOptions: {headerShown: false}},
    Signin: {screen: Signin, navigationOptions: {headerShown: false}},
    home: {screen: Screen, navigationOptions: {headerShown: false}},
  },
  {
    initialRouteName: 'Splash',
  },
);
function Screen() {
  return (
    <Stack.Navigator initalRouteName="Signin">
      {/* <Stack.Screen
  name="Splash"
  component={Splash}
  options={{headerShown: false}}
/>*/}

      <Stack.Screen
        name="Beranda"
        component={Beranda}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit_profil"
        component={Edit_profil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Info_panggilan"
        component={Info_panggilan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pengaturan"
        component={Pengaturan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pengaturan_akun"
        component={Pengaturan_akun}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pusat_bantuan"
        component={Pusat_bantuan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ubah_sandi"
        component={Ubah_sandi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const Router = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Router;
