import React, {useState, useRef} from 'react';
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
  Touchable,
} from 'react-native';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Kontak from './contac';
import Grup from './grup';
// import Panggilan from './panggilan';

const FirstRoute = () => <Kontak />;

const SecondRoute = () => <Grup />;
// const TrheeRoute = () => <Panggilan />;
export default function Beranda() {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Kontak'},
    {key: 'second', title: 'Grup'},
    // {key: 'trhee', title: 'panggilan'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // trhee: TrheeRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#00c6ff'}}
      style={{backgroundColor: '#FFF'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused == true ? '#00c6ff' : '#000',
            fontSize: 10,
            fontWeight: 'bold',
          }}
          ellipsizeMode="tail">
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" />
      <Header
        title="ZAMORA"
        onpress={() => navigation.navigate('Pengaturan')}
        inpress={() => navigation.navigate('Profil')}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
