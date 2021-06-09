import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {User, Menu} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({title, onpress}) => {
  const [image, setimage] = useState(null);
  const navigation = useNavigation();

  AsyncStorage.getItem('@image').then(value => {
    if (value != null) {
      setimage(value);
    } else {
      setimage(null);
    }
  });
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}>
      <View style={{paddingTop: 10, paddingHorizontal: 15}}>
        <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
          {image == null ? (
            <Image source={User} style={{width: 25, height: 25}} />
          ) : (
            <Image
              source={{uri: JSON.parse(image)}}
              style={{width: 35, height: 35, borderRadius: 35 / 2}}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            textAlign: 'center',

            fontSize: 16,
            fontFamily: 'Poppins-Bold',
          }}>
          {title}
        </Text>
      </View>
      <View style={{paddingTop: 10, paddingHorizontal: 15}}>
        <TouchableOpacity onPress={onpress}>
          <Image source={Menu} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
