import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {Back_button} from '../../assets';
const Header_not_beranda = ({title, onpress}) => {
  return (
    <View
      style={{
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={onpress}
        style={{position: 'absolute', width: '100%'}}>
        <Image
          source={Back_button}
          style={{width: 30, height: 30, marginLeft: '6%'}}
        />
      </TouchableOpacity>

      <View style={{}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header_not_beranda;
