import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {Power, Info, Ubah_password, Nomor_telf} from '../../../../assets';
import Header_not_beranda from '../../../../component/Header_not_beranda';

const Ubah_sandi = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setpassword] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.page}>
      <Header_not_beranda title="Ubah password" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Reset')}>
            <View style={styles.avatarWrapper}>
              <Image source={Ubah_password} style={{height: 50, width: 50}} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 30}}>
          <Text style={styles.desc}>
            Informasi tentang riset kata sandi akan dikirimkan ke email Anda
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          onChangeText={item => setpassword(item)}
          placeholder="Masukkan alamat email.."
        />
      </View>
    </View>
  );
};

export default Ubah_sandi;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'center',

    flex: 1,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(70, 159, 78, 0.12)',
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 159, 78, 0.12)',
  },
  context: {
    alignSelf: 'center',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    height: 44,
    padding: 10,
    backgroundColor: '#e3e2e1',
    borderRadius: 10,
  },
});
