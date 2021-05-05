import React, {useState} from 'react';
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
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header_not_beranda from '../../../component/Header_not_beranda';
import {Power, Info, Ubah_password, Nomor_telf} from '../../../assets';

const Pengaturan_akun = () => {
  const navigation = useNavigation();
  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const [data, setdata] = useState([]);

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
      <TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image source={Power} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Hapus akun
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    fontWeight: 'bold',
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
