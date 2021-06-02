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

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" />
      <Header
        title="P3SM CHAT"
        onpress={() => navigation.navigate('Pengaturan')}
      />
      <Grup />
    </View>
  );
}

const styles = StyleSheet.create({});
