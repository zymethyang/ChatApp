import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';

export default class Submit extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Button iconRight light transparent onPress={() => this.onSubmit()}>
          <Text style={{ color: '#7E0070' }}>Gửi</Text>
          <Icon name='paper-plane' style={{ fontSize: 20, color: '#7E0070' }} />
        </Button>
      </View>
    );
  }
  onSubmit = () => {
    this.props.sub();
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
