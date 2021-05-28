// Example of Bottom Sheet in React Native
// https://aboutreact.com/react-native-bottom-sheet/

// import React in our code
import React, {useState, useRef} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {pdf, picture, video, xml, zip} from '../../assets';
//import basic react native components

//import to show social icons

const Share_mode = ({value}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

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
              <TouchableOpacity
                onPress={() => navigation.navigate('NewFeedScreen')}>
                <Image style={styles.avatar} source={pdf} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={value}>
                <Image style={styles.avatar} source={picture} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={video} />
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={xml} />
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={zip} />
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
