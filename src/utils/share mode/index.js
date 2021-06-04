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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

import {pdf, picture, video, xml, zip, camera} from '../../assets';
//import basic react native components

//import to show social icons

const Share_mode = ({value}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});

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
        // setFilePath(source);
        console.log('gambar', source);
      }
    });
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
