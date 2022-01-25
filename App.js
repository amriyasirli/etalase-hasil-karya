import * as React from 'react';
import { Text, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from "./src/images/loading.svg";
function HomeScreen() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
    <Logo />
    <Ionicons name="ios-list" size={50} color="#000" />
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
    </>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
          barStyle="dark-content"
          // animated={true}
          // backgroundColor="#4DD4B2"
          translucent backgroundColor="transparent"
        />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ 
              headerShown : false
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}