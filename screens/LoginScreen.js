import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if(authUser){
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, [navigation])
  
  const signIn = () =>{ 
    const subscribe = auth.signInWithEmailAndPassword(email,password);
    if(subscribe){
      navigation.replace("Home")
    }
    else{
      alert("User Does not Exist ")
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png'
        // uri:'../assets/SignalIcon.png'
      }}
        style={{ width: 150, height: 150 }} />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus 
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
        placeholder='Password' 
        secureTextEntry 
        type="password" 
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title={"Login"}/>
      <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type='outline' title={"Register"}/>
    {/* <View style={{height:40}}/> */}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems :"center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300,
  },
  button:{
    width: 200,
    marginTop: 10,
  }
})