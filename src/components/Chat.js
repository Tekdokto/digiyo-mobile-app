import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { staticMessages } from '../Constants';
import { TextInput } from 'react-native';
import styles from '../screens/search/styles';
import { WIDTH } from '../constants/sizes';

function Chat() {
 
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        console.log(textInput)
        // queryUsersByEmail(textInput)
        //     .then(setSearchUsers)
    }, [textInput])
  return (
    <View>
        <View style={styles}>
              <TextInput
                  onChangeText={setTextInput}
                  style={styles.textInput}
                  placeholder={'Search'}
              />
            </View>
      <FlatList
      numColumns={1}
        data={staticMessages}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
            <>
                <View style={{flexDirection: "row", width: WIDTH * 0.85, paddingHorizontal: 20, paddingVertical: 10}}>
                    <View>
                        <Image
                         style={{borderRadius: 49, 
                            width: 50,
                            height: 50,
                         }} 
                         source={item.source}
                         />
                    </View>
                    <View>
                        <Text style={{fontFamily: "Bold"}}>{item.sender}</Text>
                        <Text style={{}}>{item.text}</Text>
                    </View>
                    {/* <Text>{item.timestamp}</Text> */}
                    {/* Display other message details */}
                </View>
            </>
        }
      />
    </View>
  );
}

export default Chat;
