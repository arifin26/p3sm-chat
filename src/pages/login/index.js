import React, {useState} from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  Alert,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

const Signin = props => {
  let [user_id, id] = useState('');
  let [username, setusername] = useState('');
  let [password, setpassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const Signin = () => {
    setErrortext('');
    if (!username) {
      Alert.alert('Tolong isi no.telp !');
      return;
    }
    if (!password) {
      Alert.alert('Tolong isi password !');
      return;
    }
    setLoading(true);

    console.log(user_id);
    fetch('https://csi-api.mandiritk.com/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())

      .then(response => {
        setLoading(false);
        // console.log(response);
        if (response.status === true) {
          AsyncStorage.setItem('@access_token', response.data.token);
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert('PERIKSA KONEKSI ANDA !!');
      });
  };

  if (loading === true) {
    StatusBar.setHidden(true);
  } else {
    StatusBar.setHidden(false);
  }
  return (
    <View style={styles.mainBody}>
      <StatusBar barStyle="dark-content" backgroundColor="#00c6ff" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: 40}}>ZAMORA</Text>
            </View>
            <View style={{paddingTop: 50}}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={username => setusername(username)}
                  placeholder="Masukkan No.telp" //dummy@abc.com
                  placeholderTextColor="#00c6ff"
                  onSubmitEditing={Keyboard.dismiss}
                  keyboardType="numeric"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={password => setpassword(password)}
                  placeholder="Masukkan Password" //12345
                  placeholderTextColor="#00c6ff"
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
            </View>

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('Beranda')}>
              <Text style={styles.buttonTextStyle}>Masuk</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Signin;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00c6ff',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonStyle: {
    backgroundColor: '#ff8c00',

    color: '#FFFFFF',

    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 55,
    marginRight: 55,
    marginTop: 40,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
