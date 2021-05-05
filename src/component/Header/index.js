import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {User, Menu} from '../../assets';
const Header = ({title, onpress, inpress}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}>
      <View style={{paddingTop: 10, paddingHorizontal: 15}}>
        <TouchableOpacity onPress={inpress}>
          <Image source={User} style={{width: 25, height: 25}} />
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
            fontWeight: 'bold',
            fontSize: 16,
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
