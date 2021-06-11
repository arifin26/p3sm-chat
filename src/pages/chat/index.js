import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  Touchable,
  BackHandler,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SOCKET_URL} from '../../utils/API';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Header_chat from '../../component/Header_chat';
import IO from 'socket.io-client';
import {send, file_send, Background} from '../../assets';
import Share_mode from '../../utils/share mode';
import moment, {locale} from 'moment';
import 'moment/locale/id';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
let socket;
const SOCKET_SERVER_URL = 'http://192.168.0.73:5000';

const Chat = props => {
  const navigation = useNavigation();
  const counter = useSelector(data => data.counter);
  moment.locale();
  const [id, setid] = useState(null);
  const [msg, setmsg] = useState('');
  const [chatMessage, setchatMessage] = useState('');
  const [chatMessages, setchatMessages] = useState([]);
  const [tinggi, settinggi] = useState('');
  const [isi_teks, set_isi_teks] = useState(false);
  const [messages, setmessages] = useState('');
  const messagesEndRef = useRef(null);
  const refRBSheet = useRef();
  const [limit, setlimit] = useState(0);

  const data_chat = () => {
    console.log('route', props.route.params);

    AsyncStorage.getItem('@access_token').then(value => {
      fetch(
        `${SOCKET_URL}/api/v1/lazyChat/${props.route.params.tipe}/${props.route.params.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${value}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({limit: limit}),
        },
      )
        .then(res => res.json())
        .then(res => {
          console.log('data pesan', res.data);
          // if (res.data.length > 0) {
          setlimit(limit + 10);

          setchatMessages([...chatMessages, ...res.data]);
          // }
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  };

  useEffect(() => {
    chatMessage != '' ? set_isi_teks(true) : set_isi_teks(false);
    if (counter === undefined) {
      return null;
    } else {
      submitChatMessage;
    }
    console.log('redux coba', limit);
  });

  const set = message => {
    setchatMessages(item => [message, ...item]);
  };

  useEffect(() => {
    AsyncStorage.getItem('@id').then(value => {
      setid(JSON.parse(value));
    });
    let isMounted = true;
    AsyncStorage.getItem('@access_token').then(value => {
      socket = IO(SOCKET_SERVER_URL, {
        auth: {
          jwtToken: value,
        },
      });
      socket.on('message', message => {
        if (
          message.send_by !== null &&
          props.route.params.room_id == message.room_id
        ) {
          data_chat();
        }
      });
    });
    AsyncStorage.getItem('@email').then(value => {
      socket.emit('joinRoom', {
        username: value,
        room: props.route.params.room_id,
        tipe: props.route.params.tipe,
        targetId: props.route.params.id,
      });
    });

    BackHandler.addEventListener('hardwareBackPress', back_Button_Press);

    data_chat();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', back_Button_Press);

      data_chat();
      isMounted = false;
      setchatMessages([]);
    };
  }, []);
  const back_Button_Press = () => {
    navigation.replace('Beranda');

    return true;
  };
  const submitChatMessage = e => {
    // socket.on(NEW_CHAT_MESSAGE_EVENT, ({res_id, msg, username}) => {
    //   setchatMessages({msg, res_id, username});
    // });
    setlimit(limit + 1);
    AsyncStorage.getItem('@id').then(value => {
      socket.emit('chatMessage', {
        msg: chatMessage,
        username: JSON.parse(value),
        room: props.route.params.room_id,
        tipe: props.route.params.tipe,
        targetId: props.route.params.id,
      });
      setchatMessage('');
    });
  };

  const Dialog_media = () => {
    return (
      <View>
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
          {/*Bottom Sheet inner View*/}
          <Share_mode />
        </RBSheet>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#00c6ff" />
      <Header_chat
        name={props.route.params.name}
        // status={counter.status}
        image={props.route.params.picture}
        // inpress
      />

      <KeyboardAvoidingView style={styles.keyboard}>
        <ImageBackground
          source={Background}
          blurRadius={1}
          style={{backgroundColor: '#787776', height: '100%', width: '100%'}}>
          {/* <FlatList
            data={this.state.chatMessages}
            keyExtractor={item => {
              return item.res_id;
            }}
            renderItem={this._renderItem}
          /> */}
          <FlatList
            ref={messagesEndRef}
            threshold={20}
            inverted={true}
            data={chatMessages}
            keyExtractor={(item, index) => item.time}
            onEndReached={data_chat}
            renderItem={({item}) => {
              if (parseInt(item.send_by) !== id) {
                return (
                  <View style={styles.eachMsg}>
                    <View style={styles.leftBlock}>
                      {/* <Text style={styles.msgTxt_name}>{item.sender_name}</Text> */}
                      <Text style={styles.msgTxt_kanan}>{item.message}</Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginTop: 20,
                        }}>
                        <Text style={styles.msgTxt_time}>
                          {moment(item.time)
                            .locale('id')
                            .format('MMMM Do YYYY, h:mm:ss a')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.rightMsg}>
                    <View style={styles.rightBlock}>
                      {/* <Text
                      style={{fontSize: 13, color: '#fff', fontWeight: 'bold'}}>
                      {item.sender_name}
                    </Text> */}
                      <Text style={styles.msgTxt_kiri}>{item.message}</Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginTop: 20,
                        }}>
                        <Text style={styles.msgTxt_time}>
                          {moment(item.time)
                            .locale('id')
                            .format('MMMM Do YYYY, h:mm:ss a')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
              // return (
              //   <View style={styles.eachMsg}>
              //     <View style={styles.msgBlock}>
              //       <Text style={styles.msgTxt_name}>{item.sender_name}</Text>
              //       <Text style={styles.msgTxt}>{item.message}</Text>
              //       <View
              //         style={{flex: 1, alignItems: 'flex-end', marginTop: 20}}>
              //         <Text style={styles.msgTxt_time}>
              //           {
              //             new Date(Date.parse(item.time))
              //               .toTimeString()
              //               .split(' ')[0]
              //           }
              //         </Text>
              //       </View>
              //     </View>
              //   </View>
              // );
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: Math.min(120, Math.max(35, tinggi)),
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                width: 270,
              }}>
              <TextInput
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
              />
            </View>
            {isi_teks == false ? (
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <Image
                    source={file_send}
                    style={{
                      height: 40,
                      width: 40,
                      alignSelf: 'center',
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={submitChatMessage}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      alignSelf: 'center',
                      marginRight: 20,
                    }}
                    source={send}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      <Dialog_media />
      {/* {chatMessages} */}
    </View>
  );
};
export default Chat;
const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingTop: 8,
    textAlign: 'left',
    borderRadius: 5,
  },
  keyboard: {
    flex: 1,
  },
  icon_text_input: {
    paddingRight: 20,
    justifyContent: 'center',
  },

  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },

  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },

  leftBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#767778',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#479840',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt_name: {
    fontSize: 13,
    color: '#00c6ff',
    fontWeight: 'bold',
  },
  msgTxt_kanan: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  msgTxt_kiri: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  msgTxt_time: {
    fontSize: 9,
    color: '#fff',
    fontFamily: 'Poppins-LightItalic',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});
