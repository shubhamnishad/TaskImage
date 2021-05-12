import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function Messages() {
  const {imagePath} = useSelector((state) => state.loadImageReducer);
  console.log('@@@@@@@@@@@@@@@@@@2@', imagePath);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
