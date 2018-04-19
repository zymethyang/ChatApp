import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
export default class Content extends React.Component {
  render() {
    let { message } = this.props;
    console.log(message);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderCard(message)}
        </ScrollView>
      </View>
    );
  }

  renderCard = (message) => {
    let result = null;
    result = message.map((value, index) => {
      return (
        <Card transparent key={index}>
          <CardItem>
            <Body>
              <Text>
                {value}
              </Text>
            </Body>
          </CardItem>
        </Card>
      );
    })
    return result;
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
