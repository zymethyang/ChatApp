import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sms: '' };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ height: '100%' }}
          placeholder="Nhập tin nhắn!"
          underlineColorAndroid='transparent'
          onChangeText={sms => this.inputData(sms)}
        />
      </View>
    );
  }

  inputData = (sms) => {
    this.setState({ sms: sms });
    setTimeout(() => {
      this.props.sendSms(sms);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
