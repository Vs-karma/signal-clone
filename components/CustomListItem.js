import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({id, chatName, enterChat}) => {
  const [chatMessages, setChatMessages] = useState([])
  useEffect(() => {
    const unsubscribe = db
    .collection('chat')
    .doc(id).collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>
      setChatMessages(snapshot.docs.map((doc)=> doc.data()))
    )
    return unsubscribe
  })
  
  return (
    <ListItem key={id} onPress={()=>enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight:'800'}}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})