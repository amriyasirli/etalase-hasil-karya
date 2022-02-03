import React, {useState, useEffect} from 'react';
import { Text, StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from './src/style/colors'

import Splash from './src/screens/Splash';
import Login from './src/screens/Auth/login';
import Home from './src/screens/Home';
import Katalog from './src/screens/Katalog';
import Settings from './src/screens/Settings';
import Detail from './src/screens/Katalog/detail';
import Produk from './src/screens/Produk';
import Kategori from './src/screens/Kategori';
import addProduk from './src/screens/Produk/add';
import updateProduk from './src/screens/Produk/update';
import addKategori from './src/screens/Kategori/add';
import updateKategori from './src/screens/Kategori/update';
// import User from './src/screens/User';

const MainApp = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  


  if (loading) {
    // navigation.replace('authLogin')
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor="#4DD4B2"
          // translucent backgroundColor="transparent"
        />
        <ActivityIndicator color='#2DDA93' size="small" />
      </View>
    )
  }else{
    return (
      <Tab.Navigator
            screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Katalog') {
                iconName = focused ? 'apps' : 'apps-outline';
              } else if (route.name === 'Saya') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { 
              position: 'absolute', 
              // bottom:25 , 
              // left:20, 
              paddingBottom:5,
              // right:20, 
              elevation:0, 
              backgroundColor:'#FFFFFF', 
              // borderRadius:15,
              borderTopColor: "#fff",
              // padding:5, 
              hight:90, 
              ...styles.shadow
            },
            tabBarActiveTintColor: color.primary,
            tabBarInactiveTintColor: 'gray',
            
          })}
        >
          <Tab.Screen name="Home" component={Home} 
            options={{ headerShown: false,}}/>
          <Tab.Screen name="Katalog" component={Katalog} 
            options={{ 
              headerShown: false,
            }}/>
          <Tab.Screen name="Saya" component={Settings} 
          options={{ 
            headerShown: false,
          }}/>
        </Tab.Navigator>
    );
  }
}


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
          barStyle="dark-content"
          // animated={true}
          // backgroundColor="#4DD4B2"
          translucent backgroundColor="transparent"
        />
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="Login" component={Login} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="MainApp" component={MainApp} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="Detail" component={Detail} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="Produk" component={Produk} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="Kategori" component={Kategori} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="addProduk" component={addProduk} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="updateProduk" component={updateProduk} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="addKategori" component={addKategori} options={{ 
              headerShown : false
          }} />
          <Stack.Screen name="updateKategori" component={updateKategori} options={{ 
              headerShown : false
          }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: color.primary,
    shadowOffset: {
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius: 3.5,
    elevation:5,
  },
});