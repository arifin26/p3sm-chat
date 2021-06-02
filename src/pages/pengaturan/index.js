import React, {useState, useRef, useEffect} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import Header_not_beranda from '../../component/Header_not_beranda';
import {Key_akun, Logo_chat, Storage, Infite_friend, Help} from '../../assets';

const Pengaturan = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const navigation = useNavigation();
  const refRBSheet = useRef();
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
    <View style={styles.container}>
      <Header_not_beranda title="Pengaturan" />
      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Key_akun} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Pengaturan_akun')}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                akun
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* sekat */}
      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Logo_chat} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Chat
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* sekat */}

      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Infite_friend} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Undang teman
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* sekat */}

      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Storage} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Penyimpanan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* sekat */}

      <View style={styles.row}>
        <View style={styles.icon}>
          <Image source={Help} style={styles.pic} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Pusat_bantuan')}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                Pusat bantuan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* sekat */}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff8c00',

              color: '#FFFFFF',
              width: 200,
              height: 40,
              alignItems: 'center',
              borderRadius: 10,
              marginLeft: 55,
              marginRight: 55,
              marginTop: 80,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                paddingVertical: 7,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Klik untuk berbagi aplikasi
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default Pengaturan;
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
