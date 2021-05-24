import React, {useState, useEffect} from 'react';
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

import Modal from 'react-native-modal';
import {SOCKET_URL} from '../../utils/API';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Header_chat from '../../component/Header_chat';
import IO from 'socket.io-client';

let socket;
const NEW_CHAT_MESSAGE_EVENT = 'chatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://192.168.0.23:5000';

const Chat = props => {
  const [dialog, setDialog] = useState(false);
  const [id, setid] = useState(null);
  const [msg, setmsg] = useState('');
  const [chatMessage, setchatMessage] = useState('');
  const [chatMessages, setchatMessages] = useState([]);
  const [tinggi, settinggi] = useState('');
  const [isi_teks, set_isi_teks] = useState(false);
  const [messages, setmessages] = useState('');

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
          console.log('data pesan');
          setchatMessages(res.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  };
  useEffect(() => {
    AsyncStorage.getItem('@id').then(value => {
      setid(JSON.parse(value));
    });
    // chatMessage != '' ? set_isi_teks(true) : set_isi_teks(false);
    let isMounted = true;
    AsyncStorage.getItem('@access_token').then(value => {
      socket = IO(SOCKET_SERVER_URL, {
        auth: {
          jwtToken: value,
        },
      });
      socket.on('message', message => {
        console.log('pesan blm masuk', message);
        if (message.send_by !== null) {
          // var mes = {
          //   message: message.message,
          //   room_id: message.room_id,r
          //   send_by: message.send_by,
          //   sender_name: message.sender_name,
          //   time: message.time,
          //   type_message: message.type_message,
          // };

          setchatMessages(item => [...item, message]);
          console.log('pesan blm ', chatMessages);
        }
      });
    });

    data_chat();
    return () => {
      data_chat();
      isMounted = false;
      setchatMessages([]);
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@email').then(value => {
      socket.emit('joinRoom', {
        username: value,
        room: props.route.params.room_id,
        tipe: props.route.params.tipe,
        targetId: props.route.params.id,
      });
    });
  });
  const submitChatMessage = e => {
    // socket.on(NEW_CHAT_MESSAGE_EVENT, ({res_id, msg, username}) => {
    //   setchatMessages({msg, res_id, username});
    // });
    AsyncStorage.getItem('@id').then(value => {
      socket.emit('chatMessage', {
        msg: chatMessage,
        username: JSON.parse(value),
        room: props.route.params.room_id,
        tipe: props.route.params.tipe,
        targetId: props.route.params.id,
      });
      setchatMessage('');
      data_chat();
    });
  };

  const toggleModal = () => {
    setDialog(!dialog);
  };
  const Dialog_media = () => {
    return (
      <View style={styles.view_modal_position}>
        <Modal isVisible={dialog}>
          <View style={styles.view_modal_object}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.profile}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                      }}
                    />
                  </View>
                </View>

                <View style={styles.profile}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                      }}
                    />
                  </View>
                </View>

                <View style={styles.profile}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://img.icons8.com/fluent/48/000000/file.png',
                      }}
                    />
                  </View>
                </View>

                <View style={styles.profile}>
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

            <TouchableOpacity onPress={() => this.toggleModal}>
              <Text style={styles.view_modal_teks}>
                Your Password is reset. Check your email to complete the action.
              </Text>
            </TouchableOpacity>

            {/* <Button title="Kembali"  /> */}
          </View>
        </Modal>
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
        inpress={toggleModal}
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
                      {/* <Text style={styles.msgTxt_time}>
                        {
                          new Date(Date.parse(item.time))
                            .toTimeString()
                            .split(' ')[0]
                        }
                      </Text> */}
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
                      {/* <Text style={styles.msgTxt_time}>
                        {
                          new Date(Date.parse(item.time))
                            .toTimeString()
                            .split(' ')[0]
                        }
                      </Text> */}
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
          {/* {isi_teks == false ? (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon_text_input}>
                <TouchableOpacity onPress={() => setDialog(true)}>
                  <Image
                    source={{
                      uri:
                        'https://img.icons8.com/ios-filled/50/000000/attach.png',
                    }}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : ( */}
          <View style={{justifyContent: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                marginRight: 20,
                height: 40,
                width: 40,
                elevation: 5,
                backgroundColor: '#00c6ff',
                borderRadius: 20,
              }}>
              <TouchableOpacity onPress={submitChatMessage}>
                <Image
                  style={{height: 25, width: 25, alignSelf: 'center'}}
                  source={{
                    uri:
                      'https://img.icons8.com/material-rounded/48/000000/filled-sent.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* )} */}
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
  view_modal_position: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_modal_object: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 20,
  },
  view_modal_teks: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 70,
  },
  avatar: {
    width: 40,
    height: 40,
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
    backgroundColor: 'rgba(70, 159, 78, 0.12)',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
