import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Grup from './grup';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const SecondRoute = () => <Grup />;
export default function Beranda() {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'second', title: 'Grup'}]);

  const renderScene = SceneMap({
    second: SecondRoute,
  });

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" />
      <Header
        title="P3SM CHAT"
        onpress={() => navigation.navigate('Pengaturan')}
        inpress={() => navigation.navigate('Profil')}
      />
      <Grup />
    </View>
  );
}

const styles = StyleSheet.create({});
