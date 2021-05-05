import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {header_screen_chat} from '../../../redux/action';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
const Kontak = () => {
  const dispacth = useDispatch();

  const navigation = useNavigation();

  const calls = [
    {
      id: 1,
      name: 'Mark Doe',
      status: 'online',
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      unread: 1,
    },
    {
      id: 2,
      name: 'Clark Man',
      status: 'last seen today at 10:54',
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      unread: 4,
    },
    {
      id: 3,
      name: 'Jaden Boor',
      status: 'last seen today at 12:09',
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      unread: 0,
    },
    {
      id: 4,
      name: 'Srick Tree',
      status: 'online',
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      unread: 8,
    },
    {
      id: 5,
      name: 'Erick Doe',
      status: '',
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      unread: 0,
    },
    {
      id: 6,
      name: 'Francis Doe',
      status: 'active',
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      unread: 0,
    },
    {
      id: 8,
      name: 'Matilde Doe',
      status: 'active',
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      unread: 1,
    },
    {
      id: 9,
      name: 'John Doe',
      status: 'active',
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      unread: 2,
    },
    {
      id: 10,
      name: 'Fermod Doe',
      status: 'active',
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      unread: 0,
    },
    {
      id: 11,
      name: 'Danny Doe',
      status: 'active',
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      unread: 0,
    },
  ];

  const renderItem = ({item}) => {
    const pindah = () => {
      navigation.navigate('Chat');
      dispacth(header_screen_chat(item));
    };
    return (
      <TouchableOpacity onPress={pindah}>
        <View style={styles.row}>
          <Image source={{uri: item.image}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              {item.unread != 0 ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: '#667eea',
                    borderRadius: 20,
                  }}>
                  <Text style={styles.mblTxt}>{item.unread}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* <StatusBar color="#fff" /> */}

      <FlatList
        data={calls}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Kontak;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#00c6ff',
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
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 3,
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
