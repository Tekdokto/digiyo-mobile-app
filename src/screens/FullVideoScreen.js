import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullPostComp from '../components/FullPostComp'
import { posts } from '../Constants'
import { FlatList, Image, View, Text} from 'react-native'
import styles from '../constants/styles'

const FullVideoScreen = ({ navigation, route }) => {
    const { item } = route.params;
    // console.log(item)
    const postsArray = posts;
    const currentIndex = postsArray.findIndex((postItem) => postItem.id === item.id);
    // console.log(postsArray)

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
        <View style={{ flex:1 }}>
            <FlatList
                data={postsArray}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={{  }}>
                    
                    {
                    item.content.type == "image" ? 
                        (
                            <Image source={item.content.source} 
                                style={ styles.mediaFullFrame } 
                                />
                            ) : (
                                <View> 
                                <FullPostComp vids={item.content.source} />
                                </View>
                            
                        
                        )
                    }
                    
                </View>
                )}
                initialScrollIndex={currentIndex}
            />
    </View>
    // </SafeAreaView>
  )
}

export default FullVideoScreen