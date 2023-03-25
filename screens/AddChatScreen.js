import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
  const [input, setInput] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Add a new Chat',
      headerBackTitle:"Chats",
      // headerBackTitleVisible:'true',
    })
  }, [navigation])
  const creatChat = async ()=>{
    await db
    .collection('chat')
    .add({
      chatName: input,
    })
    .then(()=>{
      navigation.goBack()
    })
    .catch((error)=>alert(error))
  }
  return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <Input
          placeholder='Enter a chat name'
          value={input}
          onChangeText={(text)=>setInput(text)}
          onSubmitEditing={creatChat}
          leftIcon={
            <Icon name="wechat" type='antdesign' size={24} color="black"/>
          }
        />
        <Button disabled={!input} title={"Create new Chat"} onPress={creatChat}/>
    </View>
  ) 
}

export default AddChatScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    padding: 30,
    height:"100%"
  },
})