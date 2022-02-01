import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  IconButton,
  Searchbar,
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
import Carousel, {Pagination} from 'react-native-snap-carousel';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Settings = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Subheading style={styles.title}>Administrator</Subheading>
      </View>
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
        {/* <List.Item
          title="User Management"
          titleStyle={styles.titleList}
          onPress={() => navigation.navigate('User')}
          left={() => <List.Icon color={color.textSecondary} icon="account" />}
        />
        <List.Item
          title="Pengaturan"
          titleStyle={styles.titleList}
          onPress={() => navigation.navigate('Settings')}
          left={() => <List.Icon color={color.textSecondary} icon="cogs" />}
        /> */}
        <List.Item
          title="Logout"
          titleStyle={styles.titleList}
          onPress={() => navigation.navigate('Logout')}
          left={() => <List.Icon color={color.textSecondary} icon="exit-to-app" />}
        />
      </List.Section>
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

  }
});
