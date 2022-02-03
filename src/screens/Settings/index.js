import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {
  IconButton,
  ActivityIndicator,
  Headline,
  Text,
  Caption,
  Subheading,
  Card,
  Button,
  List,
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../component/loading'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Settings = ({navigation}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()  => {
      getData()
  }, []);

  const getData = async () => {
      const value = await AsyncStorage.getItem('@storage_Key')
      setToken(value)
      if(value) {
        setAuthenticated(true)
        setIsLoading(false)
      }else{
        setIsLoading(false)

      }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      navigation.replace('Splash');
      return true;
    } catch (exception) {
      return false;
    }
  };



  if (isLoading) return <Loading />
  return (
    <ScrollView>
      <View style={styles.container}>
        <Subheading style={styles.title}>
          {authenticated? 'Administrator':'Login'}
        </Subheading>
      </View>
      {!authenticated ? (
        <View style={styles.containerAuth}>
        <Image source={require('../../images/logo2.png')} style={styles.logo} />

          <Button onPress={()=>navigation.replace('Login')} icon="account" mode="contained" color={color.textPrimary} >
              Login
          </Button>
        </View>
      ):(
        <List.Section>
          <List.Subheader style={{fontFamily:'Poppins-SemiBold'}}>Menu</List.Subheader>
          <List.Item
            title="Produk"
            titleStyle={styles.titleList}
            onPress={() => navigation.navigate('Produk')}
            left={() => <List.Icon color={color.textSecondary} icon="apps-box" />}
          />
          <List.Item
            title="Kategori"
            titleStyle={styles.titleList}
            onPress={() => navigation.navigate('Kategori')}
            left={() => <List.Icon color={color.textSecondary} icon="tag-outline" />}
          />
          <List.Item
            title="Logout"
            titleStyle={styles.titleList}
            onPress={() => logout()}
            left={() => <List.Icon color={color.textSecondary} icon="exit-to-app" />}
          />
        </List.Section>
      )}
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    height: height / 6,
    backgroundColor: color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height / 10,
  },
  title: {
    color: color.textWhite,
    fontFamily: 'Poppins-SemiBold',
    fontSize: font.size.font16,
  },
  titleList:{
      fontFamily:'Poppins-Regular',
      color:color.textSecondary,
  },
  containerAuth:{
    justifyContent:'center',
    alignItems:'center',
    height:height/2
  },
  logo: {
      marginBottom:20,
    width: Metrics.screenWidth * (240 / 365),
    height: Metrics.screenHeight * (100 / 365),
  },
});
