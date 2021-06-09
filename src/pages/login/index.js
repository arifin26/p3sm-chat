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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SOCKET_URL} from '../../utils/API';
const Signin = props => {
  let [user_id, id] = useState('');
  let [username, setusername] = useState('');
  let [password, setpassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const Kirim = () => {
    setErrortext('');
    if (!username) {
      Alert.alert('Tolong isi username !');
      return;
    }
    if (!password) {
      Alert.alert('Tolong isi password !');
      return;
    }
    setLoading(true);
    let details = {
      username: username,
      password: password,
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(user_id);
    fetch(`${SOCKET_URL}/api/v1/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then(response => response.json())

      .then(response => {
        setLoading(false);
        console.log('tes login', response);
        if (response.status === true) {
          console.log(response);
          AsyncStorage.setItem('@id', JSON.stringify(response.data.id));
          AsyncStorage.setItem('@email', response.data.email);
          AsyncStorage.setItem('@access_token', response.data.token);
          AsyncStorage.setItem('@image', JSON.stringify(response.data.picture));
          AsyncStorage.setItem('@name', JSON.stringify(response.data.name));
          AsyncStorage.setItem('@no_hp', JSON.stringify(response.data.no_hp));

          props.navigation.navigate('home');
        } else {
          Alert.alert(response.message);
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
              <Text
                style={{
                  color: '#fff',
                  fontSize: 40,
                  fontFamily: 'Poppins-Black',
                }}>
                P3SM MESSENGER
              </Text>
            </View>
            <View style={{paddingTop: 50}}>
              <View style={styles.SectionStyle}>
                <TextInput
                  inputStyle={{color: 'red'}}
                  style={styles.inputStyle}
                  onChangeText={username => setusername(username)}
                  placeholder="Masukkan Username" //dummy@abc.com
                  placeholderTextColor="#00c6ff"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  inputStyle={{color: 'red'}}
                  style={styles.inputStyle}
                  onChangeText={password => setpassword(password)}
                  placeholder="Masukkan Password" //12345
                  placeholderTextColor="#00c6ff"
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
              onPress={() => Kirim()}>
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
    fontFamily: 'Poppins-Bold',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    color: '#000',
    borderRadius: 10,
    borderColor: '#fff',
    fontFamily: 'Poppins-Bold',
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
