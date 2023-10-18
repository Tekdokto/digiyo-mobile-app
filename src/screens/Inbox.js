import React from 'react';
import { View, Text, FlatList, StatusBar, SafeAreaView } from 'react-native';
import Chat from '../components/Chat';
import { HEIGHT, WIDTH } from '../constants/sizes';

function Inbox({ staticMessages }) {
  return (
    <View>
        <StatusBar barStyle={"dark-content"} />
        <SafeAreaView style={{top: 20, backgroundColor: "white",  width: WIDTH, height:HEIGHT, }}>
            <Chat staticMessages={staticMessages} />
        </SafeAreaView>
    </View>
  );
}

export default Inbox;
