import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
// import Logo from '../../images/logo.png';
// import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// import {
//   GoogleSigninButton,
//   GoogleSignin,
//   statusCodes
// } from '@react-native-google-signin/google-signin'
// import { WEB_CLIENT_ID } from '../../services'

const Splash = ({navigation}) => {
  const [id, setId] = useState('');

  const [authenticated, setAuthenticated] = useState(false);
  // const [users, setUsers] = useState(null);
  // const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  // Handle user state changes

  const getData = async () => {
    try {
        setTimeout( () => {
          navigation.replace('MainApp');
      }, 2000)
        
    } catch(e) {
      // error reading value
        console.log(e)
    }
  }

  useEffect(()  => {
    getData()
}, []);
  

//   if(authenticated == false) { return (
//     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//         <StatusBar
//           barStyle="light-content"
//           animated={true}
//           backgroundColor="#4DD4B2"
//           translucent
//           backgroundColor="transparent"
//         />
//         <ActivityIndicator color="#2DDA93" size="small" />
//       </View>
//   )}else{
    return (
      <View style={styles.background}>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor="#4DD4B2"
          translucent
          backgroundColor="transparent"
        />
        {/* <View style={styles.background}> */}
        <Image source={require('../../images/logo-smk.jpeg')} style={styles.logo} />

        {/* <Menu2 width={100} height={100} /> */}
        {/* </View> */}
        <Text
          style={{
            fontSize: 18,
            color: '#36455A',
            marginTop: 20,
            fontFamily: 'Poppins-Medium',
          }}>
          SMKN 1 Ampek Angkek
        </Text>
        {/* </ImageBackground> */}
      </View>
    );
//   }

  
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    // height:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    //   padding:100,
    width: 180,
    height: 180,
  },
});
