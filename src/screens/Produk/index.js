import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
  Alert,
  Menu, Divider, Provider,
  FAB,
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import dataEntry from '../../service/dataEntri'


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Produk = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderItem = (index) => {
    return(
      <>
      <List.Accordion
          key={index}
          title="Produk"
          description="deskripsi produk"
          titleStyle={styles.titleList}
          onPress={openMenu}
          left={() => <List.Icon color={color.textSecondary} icon="apps-box" />}
          // right={() => <List.Icon color={color.textSecondary} icon="dots-vertical" onPress={openMenu} />}
        >
          <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Button
            color={color.danger}
            labelStyle={{color: color.danger, fontSize: 12}}
            icon="delete"
            mode="outlined"
            size={15}
            onPress={() => {
              Alert.alert(
                'Hapus Data ',
                'Yakin ingin menghapus data kontainer ?',
                [
                  {
                    text: 'Ya',
                  },
                  {text: 'Cancel', style: 'cancel'},
                ],
                {cancelable: true},
              );
            }}>
            Hapus
          </Button>

          <Button
            color={color.lightSuccess}
            labelStyle={{color: color.success, fontSize: 12}}
            icon="file-document-edit-outline"
            mode="outlined"
            size={15}>
            Update
          </Button>
          <Button
            color={color.textPrimary}
            labelStyle={{color: color.textPrimary, fontSize: 12}}
            icon="eye"
            mode="outlined"
            size={15}>
            Detail
          </Button>
        </View>
        </List.Accordion>
</>
    )
  }
  return (
      <>
        <View>
          <View style={styles.container}>
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} color={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
            <Subheading style={styles.title}>List Produk</Subheading>
          </View>
          <List.Section>
            {/* <List.Subheader style={{fontFamily:'Poppins-SemiBold'}}>Menu</List.Subheader> */}
            <FlatList 
              data={dataEntry}
              renderItem={renderItem}
            />
          </List.Section>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={color.textWhite}
          onPress={() => navigation.navigate('addProduk')}
        />
    </>

  );
};

export default Produk;

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
  fab: {
    position: 'absolute',
    backgroundColor:color.primary,
    margin: 40,
    right: 0,
    bottom: 0,
  },
});
