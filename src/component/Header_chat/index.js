import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Back_button, Menu_chat} from '../../assets';
const Header_chat = ({name, onpress, inpress, status, image}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 45,
        backgroundColor: '#00c6ff',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', width: '100%'}}>
        <Image
          source={Back_button}
          style={{width: 30, height: 30, marginLeft: '1%'}}
        />
      </TouchableOpacity>

      <View style={{marginLeft: '10%'}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: image,
            }}
            style={{height: 35, width: 35, borderRadius: 35 / 2}}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: '5%',
              width: 150,
            }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                width: 100,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
                fontSize: 15,
              }}>
              {name}
            </Text>
            <Text style={{fontSize: 12, color: '#fff'}}>{status}</Text>
          </View>
        </View>
      </View>
      {/* <TouchableOpacity onPress={inpress} style={{width: '100%'}}>
        <Image
          source={Menu_chat}
          style={{width: 20, height: 20, marginLeft: '25%'}}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header_chat;
