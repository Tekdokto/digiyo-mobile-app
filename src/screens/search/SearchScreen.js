import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchUser from '../../components/search/SearchUser'
// import { queryUsersByEmail } from '../../services/user'
import styles from './styles'
import ThemeContext from '../../theme/ThemeContext'

const SearchScreen = () => {

  const theme = useContext(ThemeContext)
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        console.log(textInput)
        // queryUsersByEmail(textInput)
        //     .then(setSearchUsers)
    }, [textInput])

    return (
      <>
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={[{ flex: 1, backgroundColor: theme.backgroundColor}]}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Search'}
            />
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUser item={item} />}
                keyExtractor={(item) => item.id}

            />
        </SafeAreaView>
      </>
    )
}

export default SearchScreen
