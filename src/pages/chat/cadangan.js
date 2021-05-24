import React, {useState, useCallback, useEffect} from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {send, scroolBottom} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SOCKET_URL} from '../../utils/API';
import Header_chat from '../../component/Header_chat';

const Chat = props => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        message: 'asd',
        room_id: '43_45',
        send_by: 43,
        sender_name: 'Gandhi',
        time: '2021-05-11T13:24:08.000Z',
      },
      {
        message: 'malem bro',
        room_id: '43_45',
        send_by: 45,
        sender_name: 'Ipin',
        time: '2021-05-11T13:24:07.000Z',
      },
      {
        message: 'hello',
        room_id: '43_45',
        send_by: 43,
        sender_name: 'Gandhi',
        time: '2021-05-18T08:40:05.000Z',
      },
      {
        message: 'Halo',
        room_id: '43_45',
        send_by: 45,
        sender_name: 'Ipin',
        time: '2021-05-19T07:58:23.000Z',
      },
    ]);
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
          console.log('data pesan', res);
          // setchatMessages(res.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{right: {backgroundColor: '#2e64e5'}}}
        textStyle={{right: {color: '#fff'}}}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginBottom: 5, marginRight: 5}}>
          <Image
            style={{height: 35, width: 35, alignSelf: 'center'}}
            source={send}
          />
        </View>
      </Send>
    );
  };
  const scrollToBottomComponent = () => {
    return (
      <View>
        <Image
          style={{height: 35, width: 35, alignSelf: 'center'}}
          source={scroolBottom}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#00c6ff" />

      <Header_chat
        name={props.route.params.name}
        // status={counter.status}
        image={props.route.params.picture}
        inpress
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend={true}
        multiline={true}
        renderSend={renderSend}
        textInputStyle={{color: '#000'}}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default Chat;
