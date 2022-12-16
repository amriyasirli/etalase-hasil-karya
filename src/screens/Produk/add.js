import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  Dimensions,
  FlatList,
  Alert,
  Platform,
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
  Portal
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import DatePicker from 'react-native-date-picker';
import dataEntry from '../../service/dataEntri'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import Loading from '../../component/loading'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AddProduk = ({navigation}) => {
  const [namaProduk, setNamaProduk] = useState("");
  const [kode, setKode] = useState("");
  const [harga, setHarga] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const [creator, setCreator] = useState("");
  const [idCreator, setIdCreator] = useState("");
  // const [wa, setWa] = useState("+62");
  const [deskripsi, setDeskripsi] = useState("");

  const [image, setImage] = useState("");
  const [uriImage, setUriImage] = useState("");
  const [upload, setUpload] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalCreator, setModalCreator] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);

  const [dataJurusan, setDataJurusan] = useState([]);
  const [dataCreator, setDataCreator] = useState([]);

  

  // const showModal = () => setVisible(true);
  const showModalDate = () => setModalDate(true);
  const showModalCreator = () => setModalCreator(true);
  // const hideModal = () => setVisible(false);
  const hideModalDate = () => setModalDate(false);
  const hideModalCreator = () => setModalCreator(false);

  let id = uuid.v4();
  useEffect(() => {
    
    // loadJurusan()
    loadCreator()
    
    
  }, [])

  

  const loadCreator = () => {
    firestore()
      .collection('Creator')
      .orderBy('nama', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setDataCreator(data => [...data, documentSnapshot.data()]);
          setIsLoading(false)
        });
      });
  }


  const addFirestore = async (id, url, filename) => {
    await firestore()
        .collection('Produk')
        .doc(id)
        .set({
            id:id,
            namaProduk: namaProduk,
            kode: kode,
            harga: harga,
            jurusan: jurusan,
            tanggal: tanggal,
            creator: creator,
            idCreator: idCreator,
            uri: url,
            fileName: filename,
            deskripsi: deskripsi,
        })
        .then(() => {
            ToastAndroid.show('Data disimpan, tarik kebawah untuk refresh !', 2000);
            setTimeout(() => {
              navigation.navigate('Produk');
            }, 1000);
        });
  }

  const loadKode = async (kode) => {
    firestore()
      .collection('Produk')
      .where('kode', '==', kode)
    //   .orderBy('tanggal', 'desc')
      .get()
      .then(querySnapshot => {
        const size = querySnapshot.size;
        if (size == 0) {
          setbtnLoading(true);
          uploadImage();
        }else{
          ToastAndroid.show('Kode Sudah digunakan !', 2000);
        }


      });
  };

  const getlink = (fileName) => {
    let imageRef = storage().ref('Gambar/'+ id + '/' + fileName);
      imageRef
        .getDownloadURL()
        .then(url  => {
          // setUriImage(url)
          addFirestore(id, url, fileName)
          console.log('Sukses')
        })
        .catch(e => console.log('getting downloadURL of image error => ', e));
  }

  const addProduk = async () => {
    if(image == "" || namaProduk == "" || harga == "" || kode == "" ||  jurusan == "" || tanggal == "" || creator == ""){
      ToastAndroid.show('Lengkapi Form !', 2000);
    }
    else{
      loadKode(kode);
    }
  }

  const uploadImage = () => {
    const uri = image;
        //------- upload gambar -------//
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
          .ref('Gambar/' + id + '/')
          .child(filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          ToastAndroid.show('Harap tunggu!', 1000);
          getlink(filename)
        });
  };

  const openGallery = () => {
    const options = {
      quality: 1,
      selectionLimit: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Warning!', 'Ambil foto dari galeri atau kameramu');
      } else if (response.error) {
        Alert.alert('Warning!', 'Terjadi kesalahan !');
      } else if (response.customButton) {
        Alert.alert(
          'Warning!',
          'User tapped custom button: ',
          response.customButton,
        );
      } else {
        setImage(response.assets[0].uri);
        setUpload(true)
        // console.log(arrayImages[0]);
      }
    });
  };

  // const renderItem = ({item}) => {
  //   return(
  //     <List.Item
  //       title={item.jurusan}
  //       titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
  //       onPress={() => {
  //         hideModal();
  //         setJurusan(item.jurusan)
  //       }}
  //       left={props => <List.Icon {...props} icon="tag-outline" />}
  //     />
  //   )
  // }

  const renderItemCreator = ({item}) => {
    return(
      <List.Item
        title={item.nama}
        titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
        onPress={() => {
          hideModalCreator();
          setCreator(item.nama)
          setIdCreator(item.id)
          setJurusan(item.jurusan)
        }}
        left={props => <List.Icon {...props} icon="account-check-outline" />}
      />
    )
  }

  if(isLoading) return <Loading />
  
  return (
    <Provider>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} iconColor={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
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
            <TextInput
              label="Kode Produk"
              value={kode}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setKode(text)}
            />
            <TextInput
              label="Harga"
              value={harga}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setHarga(text)}
            />
            {/* <Button uppercase={false} buttonColor={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonJurusan} onPress={showModal}>
                {jurusan}
            </Button> */}
            {/* <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <TextInput
                label="Jurusan"
                value={jurusan}
                disabled={true}
                mode="outlined"
                style={styles.tanggal}
                theme={{
                  colors: {primary: color.textLight, underlineColor: 'transparent'},
                }}
              />
              <Button uppercase={false} buttonColor={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModal}>
                  Pilih
              </Button>
            </View> */}
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <TextInput
                label="Tanggal"
                value={
                  tanggal.getDate() +
                  '/' +
                  (tanggal.getMonth() + 1) +
                  '/' +
                  tanggal.getFullYear()
                }
                disabled={true}
                mode="outlined"
                style={styles.tanggal}
                theme={{
                  colors: {primary: color.textLight, underlineColor: 'transparent'},
                }}
                onChangeText={text => setTanggal(text)}
              />
              <Button uppercase={false} buttonColor={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModalDate}>
                  Atur
              </Button>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <TextInput
                label="Creator"
                value={creator}
                disabled={true}
                mode="outlined"
                style={styles.tanggal}
                theme={{
                  colors: {primary: color.textLight, underlineColor: 'transparent'},
                }}
              />
              <Button uppercase={false} buttonColor={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModalCreator}>
                  Pilih
              </Button>
            </View>
            {/* <TextInput
              label="Creator"
              value={creator}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setCreator(text)}
            /> */}
            {/* <TextInput
              label="Nomor Whatsapp"
              value={wa}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setWa(text)}
            /> */}
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
            {!upload ? (
              <View style={styles.containerCamera}>
                <IconButton 
                  icon="image-plus"
                  size={38}
                  onPress={()=> openGallery()}
                  iconColor={color.primary}
                  style={{backgroundColor:color.lightPrimary}}
                />
                <Subheading>Upload Gambar</Subheading>
              </View>
            ):(
              <>
              <Subheading style={{marginHorizontal:width*(30/365), marginTop:height*(5/365), fontFamily:'Poppins-Medium', color:color.textSecondary}}>Foto Produk</Subheading>
              <Card style={styles.imageCard}>
                <Card.Cover
                  source={{uri: image}}
                  style={{height: height*(100/365)}}
                />
              </Card>
              </>
            )}
          </List.Section>
        </View>
        <Portal>
          <Modal visible={modalDate} onDismiss={hideModalDate} contentContainerStyle={styles.containerModal}>
            <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Atur Tanggal</List.Subheader>
            <DatePicker
              mode={'date'}
              date={tanggal}
              value={tanggal}
              onDateChange={date => {
                setTanggal(date);
              }}
            />
          </Modal>
        </Portal>
        <Portal>
          <Modal visible={modalCreator} onDismiss={hideModalCreator} contentContainerStyle={styles.containerModal}>
            <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Pilih Creator</List.Subheader>
            <FlatList 
              data={dataCreator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItemCreator}
            />
          </Modal>
        </Portal>
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} buttonColor={color.primary} mode="contained" labelStyle={styles.button} disabled={btnLoading} onPress={() => addProduk()}>
          Simpan
      </Button>
    </View>
  </Provider>
  );
};

export default AddProduk;

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
  containerCamera:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10
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
  buttonJurusan:{
    color:color.textSecondary,
    fontFamily:'Poppins-Medium',
    fontSize:font.size.font12,
  },
  btnTanggal:{
    color:color.textWhite,
    fontFamily:'Poppins-Medium',
    fontSize:font.size.font10,
  }, 
  imageCard:{
    marginHorizontal:width/15,
    elevation:12,
    shadowColor:color.textPrimary,
    marginBottom:30,
  }
});
