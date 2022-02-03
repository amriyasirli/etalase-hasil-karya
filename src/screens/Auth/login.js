import React, {useState} from 'react'
import { StyleSheet, ToastAndroid, ScrollView, View, Dimensions, Image } from 'react-native'
import color from '../../style/colors'
import {Card, Headline, TextInput, Caption, IconButton, Button} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import Loading from '../../component/loading'
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const login = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const storeData = async (storeId) => {
            // console.log(storeId);
        if (storeId !== null) {
            AsyncStorage.setItem('@storage_Key', storeId);
            await navigation.replace('MainApp');
          } else {
            ToastAndroid.show('kesalahan!', 2000);
            setIsLoading(false)
          }
      };

    const authProses = (username, password) => {
        // console.log(password)
        setIsLoading(true);
    
        if (username == '' && password == '') {
            ToastAndroid.show('Masukan username dan Password !', 2000);
            setIsLoading(false);
        } else {
          try {
            firestore()
              .collection('Auth')
              // Filter results
              .where('username', '==', username)
              .get()
              .then(querySnapshot => {
                // setIsLoading(false);
    
                /* ... */
                querySnapshot.docs.forEach(doc => {
                  const docData = {...doc.data()};
                //   setDocusername(docData.username);
                //   setDocPassword(docData.password);
                //   setStatus(docData.status);
                  // setId(docData.key);
                  console.log(docData.id)
    
                  if (docData.username == username && docData.password == password) {
                    storeData(docData.id);
                  } else {
                    ToastAndroid.show(
                      'Username dan Password Salah',
                      2000,
                    );
                    setIsLoading(false);
                  }
                });
              });
          } catch (error) {
            ToastAndroid.show('Terjadi kesalahan !', 2000);
            setIsLoading(false);
          }
        }
      };

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo2.png')} style={styles.logo} />
            <View style={styles.card}>
                <Headline style={styles.label}>Login</Headline>
                <ScrollView>
                <TextInput
                    style={{marginTop: 15, width: '100%'}}
                    theme={{
                        colors: {
                        primary: color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                        },
                    }}
                    label="Username"
                    onChangeText={text => setUsername(text)}
                    right={<TextInput.Icon color={color.textPrimary} name="account" />}
                    />
                <TextInput
                    style={{marginTop: 15, width: '100%'}}
                    theme={{
                        colors: {
                        primary: color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                        },
                    }}
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    right={<TextInput.Icon color={color.textPrimary} name="eye" />}
                    />
                    {isLoading?(
                        <Loading />
                    ):(
                        <Button 
                            mode="contained" 
                            labelStyle={{color:color.light, paddingVertical:5, fontFamily:'Poppins-SemiBold'}} 
                            style={{borderRadius:10, marginTop:30}}
                            onPress={()=>authProses(username, password)}
                            color={color.primary}>
                        Login
                        </Button>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    container:{
        backgroundColor:color.primary,
        height:height,
        padding:width*(100/365),
        alignItems:'center'
    },
    card:{
        paddingHorizontal:width*(20/365),
        paddingTop:width*(30/365),
        position:'absolute',
        bottom:0,
        height:height/2,
        width:width,
        backgroundColor:'#FFF',
        borderTopRightRadius:width*(20/365),
        borderTopLeftRadius:width*(20/365),
    },
    label:{
        paddingVertical:10,
        color:color.textPrimary,
        fontFamily:'Poppins-Medium',
        fontSize:width*(20/365),
    },
    input:{
        marginVertical:10,
        borderRadius:10
    },
    logo: {
        marginBottom:20,
      width: width * (240 / 365),
      height: height * (100 / 365),
    },
})
