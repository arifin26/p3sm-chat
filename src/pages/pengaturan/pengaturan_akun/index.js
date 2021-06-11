import React, {useState, useEffect} from 'react';
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
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header_not_beranda from '../../../component/Header_not_beranda';
import {Power, Info, Ubah_password, Nomor_telf} from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pengaturan_akun = props => {
  const navigation = useNavigation();
  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const [data, setdata] = useState([]);

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
  const logout = () => {
    if (logout) {
      Alert.alert(
        'P3SM CHAT',
        'Yakin Mau Keluar ?',
        [
          {
            text: 'Batal',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Iya',
            onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate('Signin');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      global.currentScreenIndex = 'home';
      props.navigation.navigate('home');
    }
  };
  return (
    <View style={styles.container}>
      <Header_not_beranda title="Pengaturan Akun" />
      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Ubah_password} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Ubah_sandi')}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Ubah password
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image source={Nomor_telf} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Ganti nomor
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image source={Info} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Info akun
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Power} style={styles.pic} />
        </View>
        <View>
          <View style={styles.nameContainer}>
            <TouchableOpacity onPress={logout}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Hapus akun
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pengaturan_akun;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentList: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontFamily: 'Poppins-SemiBold',

    color: '#222',
    fontSize: 15,
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
    justifyContent: 'center',
    marginRight: 10,
    height: 43,
    width: 43,
    elevation: 5,
    backgroundColor: '#00c6ff',
    borderRadius: 10,
  },
});
