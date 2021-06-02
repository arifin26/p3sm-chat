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

const Pusat_bantuan = () => {
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
      <Header_not_beranda title="Pusat bantuan" />

      <View style={style.text}>
        {/* <Image
            style={{height: 100, width: 100, borderRadius: 20}}
            source={require('../../gambar/csi.jpeg')}
          /> */}

        <View style={{paddingTop: 20}}>
          <Text style={style.teks}>ZAMORA</Text>
          <Text style={style.teks_keterangan_versi}>
            CSI Mandiri adalah aplikasi penunjang aktifitas {'\n'}kantor mulai
            dari absensi, lembur, cuti pengajuan {'\n'}dan lain lain
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pusat_bantuan;

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
    color: '#ff8c00',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
