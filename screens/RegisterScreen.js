import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imgaeUrl, setImgaeUrl] = useState('')
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle:"Login"
    });
  }, [navigation])
  const register = () => {
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser=>{
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imgaeUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      })
    }).catch(error => alert(error.message))
  }
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          autoFocus
          type='text'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='Profile Picture (Optional)'
          type='text'
          value={imgaeUrl}
          onChangeText={(text) => setImgaeUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title='Register'
      />
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'white'
  },
  button: {
    width:200,
    marginTop:10,
  },
  inputContainer:{
    width:300
  }
  
})