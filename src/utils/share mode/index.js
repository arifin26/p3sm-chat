// Example of Bottom Sheet in React Native
// https://aboutreact.com/react-native-bottom-sheet/

// import React in our code
import React, {useState, useRef} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SOCKET_URL} from '../../utils/API';
import ImageResizer from 'react-native-image-resizer';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {pdf, picture, video, xml, zip, camera} from '../../assets';
//import basic react native components
const win = Dimensions.get('window');
//import to show social icons
const Share_mode = ({value}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tinggi, settinggi] = useState('');
  const [chatMessage, setchatMessage] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    Lampiran_gambar();
  };
  const Lampiran_gambar = () => {
    AsyncStorage.getItem('@access_token').then(value => {
      ImageResizer.createResizedImage(filePath.uri, 684, 684, 'JPEG', 80).then(
        resizedImage => {
          var gambar = resizedImage;
          var data = new FormData();
          data.append('lampiran', {
            uri: gambar.uri,
            type: 'image/jpeg',
            name: 'image.jpeg',
          });
          console.log('data gambar', data._parts[0]);
          fetch(`${SOCKET_URL}/api/v1/uploads/image`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${value}`,
              'Content-Type': 'multipart/form-data',
            },
            body: data,
          })
            .then(res => res.json())
            .then(res => {
              console.log('data pesan', res);
            })
            .catch(err => {
              console.log('err', err);
            });
        },
      );
    });
  };

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
        setModalVisible(true);
        console.log('gambar', source);
      }
    });
  };

  const Modal_image = () => {
    return (
      <View style={{}}>
        {filePath == null ? null : (
          <View
            style={{
              flex: 1,
            }}>
            <Modal isVisible={isModalVisible}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: filePath.uri}}
                  style={{
                    height:
                      // filePath.height == filePath.width
                      //   ? filePath.height / 3
                      //   : filePath.height / 10,
                      300,
                    width:
                      // filePath.height == filePath.width
                      //   ? filePath.width / 3
                      //   : filePath.width / 10,
                      300,
                  }}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  justifyContent: 'center',
                  marginRight: 10,
                  height: 43,
                  width: 120,
                  elevation: 5,
                  backgroundColor: '#00c6ff',
                  borderRadius: 10,
                }}>
                {/* <TextInput
                  inputStyle={{color: 'red'}}
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    color: '#000',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#00c6ff',
                    width: 275,
                    alignItems: 'center',
                  }}
                  value={chatMessage}
                  onChangeText={msg => setchatMessage(msg)}
                  placeholder="Type a message" //dummy@abc.com
                  placeholderTextColor="#00c6ff"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  multiline={true}
                  onContentSizeChange={event =>
                    settinggi(event.nativeEvent.contentSize.height)
                  }
                  underlineColorAndroid="transparent"
                /> */}
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={{textAlign: 'center', color: '#FFF'}}>
                    KIRIM GAMBAR
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  };
  const chooseCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // setFilePath(source);
        setFilePath(source);
        setModalVisible(true);
        console.log('gambar', source);
      }
    });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.bottomNavigationView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity>
                <Image style={styles.avatar} source={pdf} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={chooseFile}>
                <Image style={styles.avatar} source={picture} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              {/* onPress={() => navigation.navigate('NewFeedScreen')} */}
              <TouchableOpacity>
                <Image style={styles.avatar} source={video} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity>
                <Image style={styles.avatar} source={xml} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity>
                <Image style={styles.avatar} source={zip} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomNavigationView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={chooseCamera}>
                <Image style={styles.avatar} source={camera} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                }}
              />
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                }}
              />
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                }}
              />
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <Modal_image />
    </View>
  );
};

export default Share_mode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c6ff',
  },
  bottomNavigationView: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(70, 159, 78, 0.12)',
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c6ff',
  },
  avatar: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
