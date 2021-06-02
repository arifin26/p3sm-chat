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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SOCKET_URL} from '../../utils/API';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Header_chat from '../../component/Header_chat';
import IO from 'socket.io-client';
import {send, file_send} from '../../assets';
import Share_mode from '../../utils/share mode';
import moment, {locale} from 'moment';
import 'moment/locale/id';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation} from '@react-navigation/native';

let socket;
const SOCKET_SERVER_URL = 'http://192.168.0.73:5000';

const Chat = props => {
  const navigation = useNavigation();

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
  const scrollToBottom = () => {
    const scroll =
      messagesEndRef.current?.scrollHeight -
      messagesEndRef.current?.clientHeight;
    messagesEndRef.current.scrollToEnd({animated: false});
  };

  const data_chat = () => {
    AsyncStorage.getItem('@access_token').then(value => {
      fetch(
        `${SOCKET_URL}/api/v1/getChat/${props.route.params.tipe}/${props.route.params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${value}`,
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => res.json())
        .then(res => {
          setchatMessages(res.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  };
  useEffect(() => {
    chatMessage != '' ? set_isi_teks(true) : set_isi_teks(false);
  });
  useEffect(() => {
    scrollToBottom();

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
          setchatMessages(item => [...item, message]);
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
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
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
    navigation.replace('Beranda')

    return true;
  };
  const submitChatMessage = e => {
    // socket.on(NEW_CHAT_MESSAGE_EVENT, ({res_id, msg, username}) => {
    //   setchatMessages({msg, res_id, username});
    // });
    if (isi_teks == false) {
      Alert.alert('pesan tidak boleh kosong');
    } else {
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
    }
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
        {/* <FlatList
            data={this.state.chatMessages}
            keyExtractor={item => {
              return item.res_id;
            }}
            renderItem={this._renderItem}
          /> */}
        <AutoScrollFlatList
          ref={messagesEndRef}
          threshold={20}
          data={chatMessages}
          keyExtractor={(item, index) => item.time}
          renderItem={({item}) => {
            if (parseInt(item.send_by) !== id) {
              return (
                <View style={styles.eachMsg}>
                  <View style={styles.msgBlock}>
                    {/* <Text style={styles.msgTxt_name}>{item.sender_name}</Text> */}
                    <Text style={styles.msgTxt}>{item.message}</Text>
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
                    <Text style={styles.msgTxt}>{item.message}</Text>
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
          {/* {isi_teks == false ? null : (
            // <View style={{justifyContent: 'center'}}>
            //   <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            //     <Image
            //       source={file_send}
            //       style={{
            //         height: 40,
            //         width: 40,
            //         alignSelf: 'center',
            //         marginRight: 20,
            //       }}
            //     />
            //   </TouchableOpacity>
            // </View>
          )} */}
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
        </View>
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

  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#e4e4e4',
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
    backgroundColor: '#97c163',
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
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  msgTxt_time: {
    fontSize: 10,
    color: '#000',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});
