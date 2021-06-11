import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import Header_not_beranda from '../../../component/Header_not_beranda';
import {useNavigation} from '@react-navigation/native';

const Tentang = () => {
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back_Button_Press);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', back_Button_Press);
    };
  });

  const back_Button_Press = () => {
    navigation.goBack();

    return true;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header_not_beranda title="Tentang" />

      <View style={style.text}>
        {/* <Image
            style={{height: 100, width: 100, borderRadius: 20}}
            source={require('../../gambar/csi.jpeg')}
          /> */}

        <View style={{paddingTop: 20}}>
          <Text style={style.teks}>P3SM MESSENGER</Text>
          <Text style={style.teks_keterangan_versi}>
            P3sm Messenger adalah komunikasi berbasis teks {'\n'} yang dilakukan
            secara langsung atau dalam waktu {'\n'} nyata (real time).
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Tentang;

const style = StyleSheet.create({
  text: {
    alignItems: 'center',
    paddingTop: '15%',
  },
  teks_keterangan_versi: {
    color: '#ff8c00',
    textAlign: 'center',
  },
  teks_versi: {
    color: '#ff8c00',
    fontSize: 20,
    textAlign: 'center',
  },
  teks: {
    fontFamily: 'Poppins-Bold',
    color: '#ff8c00',
    fontSize: 25,
    textAlign: 'center',
  },
});
