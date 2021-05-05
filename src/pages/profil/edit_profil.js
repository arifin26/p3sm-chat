import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Gap} from '../../utils';
import Header_not_beranda from '../../component/Header_not_beranda';

const Edit_profil = () => {
  const [email, setemail] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header_not_beranda title="Ubah Profil" />
      <View style={styles.container}>
        <Text style={styles.title}>Nama :</Text>
        <TextInput
          style={styles.teks_input}
          value={email}
          placeholder="Alamat Email"
          onChangeText={teks => setemail({teks})}
        />
      </View>
      <Gap height={20} />
      <View style={styles.container}>
        <Text style={styles.title}>Email :</Text>
        <TextInput
          style={styles.teks_input}
          value={email}
          placeholder="Alamat Email"
          onChangeText={teks => setemail({teks})}
        />
      </View>
      <Gap height={20} />
      <View style={styles.container}>
        <Text style={styles.title}>Alamat :</Text>
        <TextInput
          style={styles.teks_input}
          value={email}
          placeholder="Alamat Email"
          onChangeText={teks => setemail({teks})}
        />
      </View>
      <Gap height={20} />
      <View style={styles.container}>
        <Text style={styles.title}>No.telf :</Text>
        <TextInput
          style={styles.teks_input}
          value={email}
          placeholder="Alamat Email"
          onChangeText={teks => setemail({teks})}
        />
      </View>
      <Gap height={80} />
      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>Upload Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Edit_profil;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  title: {
    width: '90%',
    marginBottom: 5,
    fontSize: 12,
  },
  teks_input: {
    width: '90%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#e3e2e1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonStyle: {
    backgroundColor: '#ff8c00',

    color: '#FFFFFF',

    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 55,
    marginRight: 55,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
