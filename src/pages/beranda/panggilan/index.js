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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {info_panggilan} from '../../../redux/action';
import {useNavigation} from '@react-navigation/native';
const Calls = () => {
  const dispacth = useDispatch();
  const navigation = useNavigation();
  const calls = [
    {
      id: 1,
      name: 'Mark Doe',
      date: '12 jan',
      time: '11:14 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      detail_riwayat: [
        {id: 1, waktu: '11:14 am', status: false},
        {id: 2, waktu: '12:14 am', status: true},
      ],
    },
    {
      id: 2,
      name: 'Clark Man',
      date: '12 jul',
      time: '15:58 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      detail_riwayat: [{id: 1, waktu: '15:60 am', status: false}],
    },
    {
      id: 3,
      name: 'Jaden Boor',
      date: '12 aug',
      time: '12:45 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      detail_riwayat: [{id: 1, waktu: '13:50 am', status: true}],
    },

    {
      id: 4,
      name: 'Srick Tree',
      date: '12 feb',
      time: '08:32 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      detail_riwayat: [
        {id: 1, waktu: '08:50 am', status: true},
        {id: 2, waktu: '08:50 am', status: false},
        {id: 3, waktu: '15:60 am', status: true},
        {id: 4, waktu: '15:60 am', status: true},
      ],
    },
    {
      id: 5,
      name: 'John Doe',
      date: '12 oct',
      time: '07:45 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      detail_riwayat: [
        {id: 1, waktu: '08:50 am', status: true},
        {id: 2, waktu: '08:50 am', status: false},
        {id: 3, waktu: '15:60 am', status: true},
        {id: 4, waktu: '15:60 am', status: true},
        {id: 5, waktu: '15:60 am', status: false},
        {id: 6, waktu: '15:60 am', status: true},
        {id: 7, waktu: '15:60 am', status: false},
        {id: 8, waktu: '15:60 am', status: false},
      ],
    },
    {
      id: 6,
      name: 'John Doe',
      date: '12 jan',
      time: '09:54 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    },
    {
      id: 8,
      name: 'John Doe',
      date: '12 jul',
      time: '11:22 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    },
    {
      id: 9,
      name: 'John Doe',
      date: '12 aug',
      time: '13:33 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    },
    {
      id: 10,
      name: 'John Doe',
      date: '12 oct',
      time: '11:58 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    },
    {
      id: 11,
      name: 'John Doe',
      date: '12 jan',
      time: '09:28 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    },
  ];

  const renderItem = ({item}) => {
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }
    const pindah = () => {
      navigation.navigate('Info_panggilan');
      dispacth(info_panggilan(item));
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
              <View style={{justifyContent: 'center'}}>
                <Image style={styles.icon} source={{uri: callIcon}} />
              </View>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.mblTxt}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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

export default Calls;
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
    width: 270,
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
    marginLeft: 15,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
