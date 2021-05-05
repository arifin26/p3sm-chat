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
} from 'react-native';

import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Header_chat from '../../component/Header_chat';

export default function Chat() {
  const [isi_teks, set_isi_teks] = useState(false);
  const [dialog, set_dialog] = useState(false);
  const [msg, setmsg] = useState('');
  const [tinggi, setheight] = useState(0);
  const counter = useSelector(data => data.counter);

  const [messages, setmessage] = useState([
    {
      id: 1,
      sent: true,
      msg: 'Lorem ipsum dolor',
    },
    {
      id: 2,
      sent: true,
      msg: 'sit amet, consectetuer',
    },
    {
      id: 3,
      sent: false,
      msg: 'adipiscing elit. Aenean ',
    },
    {
      id: 4,
      sent: true,
      msg: 'commodo ligula eget dolor.',
    },
    {
      id: 5,
      sent: false,
      msg:
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
    },
    {
      id: 6,
      sent: true,
      msg:
        'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',
    },
    {
      id: 7,
      sent: false,
      msg: 'rhoncus ut, imperdiet',
    },
    {
      id: 8,
      sent: false,
      msg: 'a, venenatis vitae',
    },
    {
      id: 9,
      sent: true,
      msg: 'a, venenatis vitae',
    },
    {
      id: 10,
      sent: true,
      msg: 'a, venenatis vitae',
    },
    {
      id: 11,
      sent: false,
      msg: 'a, venenatis vitae',
    },
  ]);

  useEffect(() => {
    msg != '' ? set_isi_teks(true) : set_isi_teks(false);
  });
  const reply = () => {
    var messa = messages;
    messa.push({
      id: Math.floor(Math.random() * 99999999999999999 + 1),
      sent: false,
      msg: msg,
    });
    setmsg('');
    setmessage(messa);
  };

  const send = () => {
    setheight(0);
    if (msg.length > 0) {
      var messa = messages;
      messa.push({
        id: Math.floor(Math.random() * 99999999999999999 + 1),
        sent: true,
        msg: msg,
      });
      setmessage(messa);
      setTimeout(() => {
        reply();
      }, 1000);
    }
  };

  const _renderItem = ({item}) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    }
  };

  const toggleModal = () => {
    set_dialog(!dialog);
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

            <TouchableOpacity onPress={toggleModal}>
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
        name={counter.name}
        status={counter.status}
        image={counter.image}
        inpress={toggleModal}
      />
      <KeyboardAvoidingView style={styles.keyboard}>
        {/* <FlatList
          style={styles.list}
          data={messages}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={_renderItem}
        /> */}

        <AutoScrollFlatList
          threshold={20}
          data={messages}
          renderItem={_renderItem}
          keyExtractor={item => {
            return item.id;
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
              value={msg}
              onChangeText={msg => setmsg(msg)}
              placeholder="Type a message" //dummy@abc.com
              placeholderTextColor="#00c6ff"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              multiline={true}
              onContentSizeChange={event =>
                setheight(event.nativeEvent.contentSize.height)
              }
              underlineColorAndroid="transparent"
            />
          </View>
          {isi_teks == false ? (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon_text_input}>
                <TouchableOpacity onPress={() => set_dialog(true)}>
                  <Image
                    source={{
                      uri:
                        'https://img.icons8.com/ios-filled/50/000000/attach.png',
                    }}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.icon_text_input}>
                <TouchableOpacity onPress={() => alert('voice')}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={{
                      uri:
                        'https://img.icons8.com/plumpy/48/000000/voice-recorder.png',
                    }}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
          ) : (
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
                <TouchableOpacity onPress={() => send()}>
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
          )}
        </View>
      </KeyboardAvoidingView>
      <Dialog_media />
    </View>
  );
}

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
  msgTxt: {
    fontSize: 15,
    color: '#555',
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
