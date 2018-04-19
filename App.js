import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import Content from './components/content';
import Input from './components/input';
import Submit from './components/submit';

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

export const client = new Client({ uri: 'wss://m10.cloudmqtt.com:32569/', clientId: "android_" + parseInt(Math.random() * 100, 10), storage: myStorage });
var options = {
  useSSL: true,
  userName: "dgtcpkfm",
  password: "C1nQYkDHo5i2",
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mqttConnect: false,
      message: [],
      text: ''
    }
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({
      loading: false
    });

    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });

    client.on('messageReceived', (message) => {
      let tmpMessage = this.state.message;
      tmpMessage.push(message.payloadString);
      this.setState({
        message: tmpMessage
      })
    });

    client.connect(options)
      .then(() => {
        this.setState({
          mqttConnect: true
        });
        console.log('connected');
        return client.subscribe('chat');
      }).catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          this.setState({
            mqttConnect: false
          })
        }
      });
  }

  sendSms = (data) => {
    this.setState({
      text: data
    });
  }

  sub = () => {
    const message = new Message(this.state.text);
    message.destinationName = 'chat';
    client.send(message);
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      [<StatusBar
        hidden={true}
        key={"Status Bar"}
      />,
      <View style={{ flex: 1, flexDirection: 'column' }} key={"content"}>
        {this.state.loading === false ?
          [<View style={{ flex: 8 }} key={"Content"}>
            <Content message={this.state.message}></Content>
          </View>,
          <View style={{ flex: 1, flexDirection: 'row' }} key={"Input"}>
            <View style={{ flex: 4 }}>
              <Input sendSms={this.sendSms}></Input>
            </View>
            <View style={{ flex: 2 }}>
              <Submit sub={this.sub}></Submit>
            </View>
          </View>]
          : <View></View>
        }
      </View>
      ]
    );
  }
}
