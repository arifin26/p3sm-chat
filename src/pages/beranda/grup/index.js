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
import {Bangunan} from '../../../assets';
const Grup = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [userSelected, setuserSelected] = useState([]);
  const [data, setdata] = useState([
    {
      id: 1,
      name: 'Comunity',
      image: Bangunan,
      count: 124.711,
    },
    {
      id: 2,
      name: 'Housing',
      image: Bangunan,
      count: 234.722,
    },
    {
      id: 3,
      name: 'Jobs',
      image: Bangunan,
      count: 324.723,
    },
    {
      id: 4,
      name: 'Personal',
      image: Bangunan,
      count: 154.573,
    },
    {
      id: 5,
      name: 'For sale',
      image: Bangunan,
      count: 124.678,
    },
  ]);

  const clickEventListener = item => {
    Alert.alert('Message', 'Item clicked. ' + item.name);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          clickEventListener(item);
        }}>
        <View style={styles.row}>
          <Image style={styles.image} source={item.image} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>{item.count}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>grup</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Grup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentList: {
    flex: 1,
  },

  image: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#00c6ff',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
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
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
