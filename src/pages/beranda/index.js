import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, StatusBar, useWindowDimensions} from 'react-native';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Grup from './grup';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SOCKET_URL} from '../../utils/API';

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
        console.log('TOKEN:', token.token);
        AsyncStorage.getItem('@access_token').then(value => {
          fetch(`${SOCKET_URL}/api/v1/tokenFirebase`, {
            method: 'POST',
            headers: {
              Authorization: `bearer ${value}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: `${token.token}`}),
          })
            .then(res => res.json())
            .then(res => {});
        });
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION 1:', notification);
        if (notification.foreground) {
          PushNotification.localNotification({
            channelId: notification.channelId,
            title: notification.title,
            message: notification.message,
          });
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION 2:', notification);
        if (notification.foreground) {
          PushNotification.localNotification({
            title: notification.title,
            message: notification.message,
          });
        }
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
        title="P3SM MESSENGER"
        onpress={() => navigation.navigate('Pengaturan')}
      />
      <Grup />
    </View>
  );
}

const styles = StyleSheet.create({});
