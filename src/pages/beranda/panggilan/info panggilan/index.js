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
import Header_not_beranda from '../../../../component/Header_not_beranda';

const Info_panggilan = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const [data, setdata] = useState([]);
  const counter = useSelector(data => data.counter);
  var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';

  if (counter.video == true) {
    callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
  }

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 10,
        }}>
        <Text>{item.waktu}</Text>
        {item.status == false ? (
          <Image
            source={{
              uri: 'https://img.icons8.com/metro/26/000000/up-right-arrow.png',
            }}
            style={{height: 20, width: 20}}
          />
        ) : (
          <Image
            source={{
              uri: 'https://img.icons8.com/metro/26/000000/down-left-arrow.png',
            }}
            style={{height: 20, width: 20}}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header_not_beranda title="Info Panggilan" />
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{uri: counter.image}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {counter.name}
              </Text>
              <View style={{justifyContent: 'center'}}>
                <Image style={styles.icon} source={{uri: callIcon}} />
              </View>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.mblTxt}>{counter.date}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <FlatList
        data={counter.detail_riwayat}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Info_panggilan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentList: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#00c6ff',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
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
    height: 20,
    width: 20,
  },
});
