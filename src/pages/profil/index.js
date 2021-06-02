import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Touchable,
} from 'react-native';
import {Gap} from '../../utils';
import {Edit} from '../../assets';
import Header_not_beranda from '../../component/Header_not_beranda';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profil = () => {
  const navigation = useNavigation();
  const [image, setimage] = useState(null);
  AsyncStorage.getItem('@image').then(value => {
    if (value != null) {
      setimage(value);
    } else {
      setimage(null);
    }
  });
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Header_not_beranda title="Profil" />
        {/* <View
        style={{
          //To make Triangle Shape
          alignSelf: 'center',
          width: 0,
          height: 0,
          borderLeftWidth: 360,
          borderTopWidth: 200,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: '#606070',
          borderTopColor: '#606070',
        }}
        />
        <View style={{position: 'absolute', marginLeft: 190, marginTop: 30}}>
        <Image
        style={{
          height: 150,
          width: 150,
        }}
        source={require('../../assets/image/user.png')}
        />
      </View> */}
        <ImageBackground
          source={
            image == null
              ? require('../../assets/image/background.png')
              : {uri: JSON.parse(image)}
          }
          style={Styles.background}>
          <Gap height={180} />

          <TouchableOpacity
            onPress={() => alert('edit foto')}
            style={{
              marginLeft: 10,
            }}>
            <Image
              source={Edit}
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={Styles.content}>
          <View style={{alignItems: 'center'}}>
            <View style={Styles.view_teks_data}>
              <View style={Styles.icon}>
                <Text style={Styles.teks_in_icon}>MN</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={Styles.name}>
                  삼국시대 이전 이름 [출처: 한국민족문화대백과사전(이름)]
                </Text>
              </View>
            </View>
          </View>

          <Gap height={20} />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '93%'}}>
              <Text style={Styles.title}>EMAIL :</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{
                  paddingLeft: 15,

                  fontSize: 12,
                }}>
                test@gmail.com
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '93%'}}>
              <Text style={Styles.title}>ALAMAT :</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{
                  paddingLeft: 15,
                  fontSize: 12,
                }}>
                Perumahan Griya Mandala, Jl. Kehormatan Blok A No.19 Rt.002
                Rw.08
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '93%'}}>
              <Text style={Styles.title}>NO.TELF :</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{
                  paddingLeft: 15,

                  fontSize: 12,
                }}>
                08578483909
              </Text>
            </View>
          </View>

          <Gap height={35} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Edit_profil')}
            style={Styles.buttonStyle}
            activeOpacity={0.5}>
            <Text style={Styles.buttonTextStyle}>Edit Profil</Text>
          </TouchableOpacity>
          <Gap height={35} />
        </View>
      </ScrollView>
    </View>
  );
};
export default Profil;

const Styles = StyleSheet.create({
  view_teks_data: {
    margin: 10,
    width: '93%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(202, 226, 239, 1)',
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
  teks_in_icon: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  title: {
    fontSize: 15,
    color: '#000',
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 15,
    color: '#000',
    width: 250,
  },
  teks_unit: {
    width: 255,
    fontSize: 12,
    marginBottom: 5,
  },
  teks_price: {
    width: 255,
    fontSize: 12,
    marginTop: 5,
    color: '#ef473a',
  },
  background: {
    height: 350,
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 34,
    paddingTop: 50,
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    marginTop: -100,
    paddingTop: 15,
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
