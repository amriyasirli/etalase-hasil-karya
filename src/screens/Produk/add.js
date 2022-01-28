import React, {useState} from 'react';
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
  TextInput,
  Headline,
  Text,
  Caption,
  Subheading,
  Card,
  Button,
  List,
  Modal,
  Menu, Divider, Provider,
  FAB,
  Portal
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import dataEntry from '../../service/dataEntri'


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const addProduk = ({navigation}) => {
  const [produk, setProduk] = useState("");
  const [kategori, setKategori] = useState("Pilih Kategori");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderItem = ({item}) => {
    return(
      <List.Item
        title="Kategori"
        titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
        onPress={() => {
          hideModal();
          setKategori(item.title)
        }}
        left={props => <List.Icon {...props} icon="tag-outline" />}
      />
    )
  }

  
  return (
    <Provider>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} color={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
            <Subheading style={styles.title}>Tambah Produk</Subheading>
          </View>
          <List.Section>
            <TextInput
              label="Nama Produk"
              value={produk}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textPrimary, underlineColor: 'transparent'},
              }}
              onChangeText={text => setProduk(text)}
            />
            <Button uppercase={false} color={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonKategori} onPress={showModal}>
              {kategori}
          </Button>
            <TextInput
              label="Harga"
              value={harga}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textPrimary, underlineColor: 'transparent'},
              }}
              onChangeText={text => setHarga(text)}
            />
            <TextInput
              label="Deskripsi Produk"
              value={deskripsi}
              multiline={true}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textPrimary, underlineColor: 'transparent'},
              }}
              numberOfLines={6}
              onChangeText={text => setDeskripsi(text)}
            />
          </List.Section>
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
            <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Pilih Kategori</List.Subheader>
            <FlatList 
              data={dataEntry}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </Modal>
        </Portal>
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => console.log('Pressed')}>
          Simpan
      </Button>
    </View>
</Provider>
  );
};

export default addProduk;

const styles = StyleSheet.create({
  container: {
    height: height / 6,
    backgroundColor: color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height / 10,
  },
  containerModal :{
    backgroundColor: 'white', 
    padding: 20,
    margin:30,
    borderRadius:6
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
  input:{
    marginHorizontal:20,
    marginVertical:10,
  },
  button:{
    color:color.textWhite,
    fontFamily:'Poppins-Medium',
    fontSize:font.size.font12,
  },
  buttonKategori:{
    color:color.textSecondary,
    fontFamily:'Poppins-Medium',
    fontSize:font.size.font12,
  },
});
