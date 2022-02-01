import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
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
import DatePicker from 'react-native-date-picker';
import dataEntry from '../../service/dataEntri'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loading from '../../component/loading'


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const updateProduk = ({route, navigation}) => {
  const {
    route_id,
    route_namaProduk,
    route_kategori,
    route_tanggal,
    route_creator,
    route_wa,
    route_deskripsi
  } = route.params;

  const [namaProduk, setNamaProduk] = useState(route_namaProduk);
  const [kategori, setKategori] = useState(route_kategori);
  const [tanggal, setTanggal] = useState(route_tanggal);
  const [creator, setCreator] = useState(route_creator);
  const [wa, setWa] = useState(route_wa);
  const [deskripsi, setDeskripsi] = useState(route_deskripsi);
  const [visible, setVisible] = useState(false);
  const [modalDate, setModalDate] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [dataKategori, setDataKategori] = useState([]);

  

  const showModal = () => setVisible(true);
  const showModalDate = () => setModalDate(true);
  const hideModal = () => setVisible(false);
  const hideModalDate = () => setModalDate(false);

  useEffect(() => {
    
    loadKategori()
    
  }, [])

  const loadKategori = () => {
    firestore()
      .collection('Kategori')
      .orderBy('kategori', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setDataKategori(data => [...data, documentSnapshot.data()]);
          setIsLoading(false)
        });
      });
  }

  const updateProduk = () => {
    
    firestore()
      .collection('Produk')
      .doc(route_id)
      .update({
          namaProduk: namaProduk,
          kategori: kategori,
          tanggal: tanggal,
          creator: creator,
          wa: wa,
          deskripsi: deskripsi,
      })
      .then(() => {
          ToastAndroid.show('Data diupdate, tarik kebawah untuk refresh !', 2000);
          setTimeout(() => {
            navigation.navigate('Produk');
          }, 1000);
      });
  }

  const renderItem = ({item}) => {
    return(
      <List.Item
        title={item.kategori}
        titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
        onPress={() => {
          hideModal();
          setKategori(item.kategori)
        }}
        left={props => <List.Icon {...props} icon="tag-outline" />}
      />
    )
  }

  if(isLoading) return <Loading />
  
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
              value={namaProduk}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setNamaProduk(text)}
            />
            {/* <Button uppercase={false} color={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonKategori} onPress={showModal}>
                {kategori}
            </Button> */}
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <TextInput
                label="Kategori"
                value={kategori}
                disabled={true}
                mode="outlined"
                style={styles.tanggal}
                theme={{
                  colors: {primary: color.textLight, underlineColor: 'transparent'},
                }}
              />
              <Button uppercase={false} color={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModal}>
                  Pilih
              </Button>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <TextInput
                label="Tanggal"
                value={
                  new Date(tanggal.toMillis()).getDate() +
                  '/' +
                  (new Date(tanggal.toMillis()).getMonth() + 1) +
                  '/' +
                  new Date(tanggal.toMillis()).getFullYear()
                }
                disabled={true}
                mode="outlined"
                style={styles.tanggal}
                theme={{
                  colors: {primary: color.textLight, underlineColor: 'transparent'},
                }}
                onChangeText={text => setCreator(text)}
              />
              <Button uppercase={false} color={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModalDate}>
                  Atur
              </Button>
            </View>
            <TextInput
              label="Kreator"
              value={creator}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setCreator(text)}
            />
            <TextInput
              label="Nomor Whatsapp"
              value={wa}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setWa(text)}
            />
            <TextInput
              label="Deskripsi Produk"
              value={deskripsi}
              multiline={true}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
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
              data={dataKategori}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </Modal>
        </Portal>
        <Portal>
          <Modal visible={modalDate} onDismiss={hideModalDate} contentContainerStyle={styles.containerModal}>
            <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Atur Tanggal</List.Subheader>
            <DatePicker
              mode={'date'}
              date={new Date(tanggal.toMillis())}
              value={new Date(tanggal.toMillis())}
              onDateChange={date => {
                setTanggal(date);
              }}
            />
          </Modal>
        </Portal>
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => updateProduk()}>
          Simpan
      </Button>
    </View>
</Provider>
  );
};

export default updateProduk;

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
  tanggal:{
    marginHorizontal:20,
    marginVertical:10,
    width:Dimensions.get('screen').width/2,
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
  btnTanggal:{
    color:color.textWhite,
    fontFamily:'Poppins-Medium',
    fontSize:font.size.font10,
  }
});
