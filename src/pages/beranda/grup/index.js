import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AppState,
} from 'react-native';
import {Bangunan} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {SOCKET_URL} from '../../../utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
const Grup = () => {
  const NUM_ITEMS = 10;
  const navigation = useNavigation();

  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const [data, setdata] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AsyncStorage.getItem('@access_token').then(value => {
      console.log('token', value);
      fetch(`${SOCKET_URL}/api/v1/groupList`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setdata(res.data);
          console.log(res);
        })
        .catch(err => {
          console.log('err grup list', err);
        });
    });

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    console.log('App State: ' + nextAppState);
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App State: ' + 'App has come to the foreground!');
        alert('App State: ' + 'App has come to the foreground!');
      }
      alert('App State: ' + nextAppState);
      setAppState(nextAppState);
    }
  };

  const clickEventListener = item => {
    let dataSetChat = {
      id: item.target_id,
      room_id: item.room_id,
      name: item.name,
      picture: item.picture,
      tipe: item.tipe,
    };
    navigation.navigate('Chat', dataSetChat);
  };

  return (
    <View style={styles.container}>
      {/* <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item}`}
        onDragEnd={({data}) => setdata(data)}
      /> */}
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={data}
        keyExtractor={(item, index) => item.sent_at}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                clickEventListener(item);
              }}>
              <View style={styles.row}>
                <Image style={styles.image} source={{uri: item.picture}} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text
                      style={styles.nameTxt}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <Text style={styles.mblTxt}>{item.tipe}</Text>
                  </View>
                  <View style={styles.msgContainer}>
                    <Text style={styles.msgTxt}>{item.last_message}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Grup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentList: {
    flex: 1,
  },

  image: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#00c6ff',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },

  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
