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
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import Loading from '../../component/loading'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const updateProduk = ({route, navigation}) => {
  const {id} = route.params;

  const [namaProduk, setNamaProduk] = useState('');
  const [kode, setKode] = useState('');
  const [harga, setHarga] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [creator, setCreator] = useState('');
  const [idCreator, setIdCreator] = useState("");

  const [deskripsi, setDeskripsi] = useState('');
  const [uri, setUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  

  // const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);
  const [upload, setUpload] = useState(true);
  const [changeImage, seChangeImage] = useState(false);

  const [dataCreator, setDataCreator] = useState([]);


  

  const showModal = () => setVisible(true);
  const showModalDate = () => setModalDate(true);
  const hideModal = () => setVisible(false);
  const hideModalDate = () => setModalDate(false);

  useEffect(() => {
    // console.log(id)
    loadCreator()
    
  }, [])


  const loadProduk = () => {
    firestore()
      .collection('Produk')
      .doc(id)
      .get()
      .then(querySnapshot => {
        // querySnapshot.forEach(documentSnapshot => {
          const docData = querySnapshot.data();
          setNamaProduk(docData.namaProduk);
          setKode(docData.kode);
          setHarga(docData.harga);
          setCreator(docData.creator);
          setDeskripsi(docData.deskripsi);
          setUri(docData.uri);
          setFileName(docData.fileName);
          setIsLoading(false)
        // });
      });
  }

  const loadCreator = () => {
    firestore()
      .collection('Creator')
      .orderBy('nama', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setDataCreator(data => [...data, documentSnapshot.data()]);
        });
        loadProduk();
      });
  }

  const addFirestore = (url) => {
    
    firestore()
      .collection('Produk')
      .doc(id)
      .update({
          namaProduk: namaProduk,
          kode: kode,
          harga: harga,
          jurusan: jurusan,
          creator: creator,
          idCreator: idCreator,
          fileName: fileName,
          deskripsi: deskripsi,
          uri:url
      })
      .then(() => {
          ToastAndroid.show('Data diupdate, tarik kebawah untuk refresh !', 2000);
          setTimeout(() => {
            navigation.navigate('Produk');
          }, 1000);
      });
  }

  const addWithoutImage = () => {
    
    firestore()
      .collection('Produk')
      .doc(id)
      .update({
          namaProduk: namaProduk,
          kode: kode,
          harga: harga,
          jurusan: jurusan,
          creator: creator,
          idCreator: idCreator,
          deskripsi: deskripsi,
      })
      .then(() => {
          ToastAndroid.show('Data diupdate, tarik kebawah untuk refresh !', 2000);
          setTimeout(() => {
            navigation.navigate('Produk');
          }, 1000);
      });
  }

  const getlink = (fileName) => {
    let imageRef = storage().ref('Gambar/'+ id + '/' + fileName);
      imageRef
        .getDownloadURL()
        .then(url => {
          // setUriImage(url)
          addFirestore(url)
        })
        .catch(e => console.log('getting downloadURL of image error => ', e));
  }

  const updateProduk = async () => {
    if(uri == "" || namaProduk == "" || harga == "" || creator == ""){
      ToastAndroid.show('Masukkan gambar!', 2000);
    } if(changeImage == false) {
      setbtnLoading(true);
      addWithoutImage();
    } else{
      setbtnLoading(true);
      uploadImage();
      
    }
  }
  
  const hapus = () => {
    let imageRef = storage().ref('Gambar/' + id + '/' + fileName);
        imageRef
        .delete()
        .then(() => {
            ToastAndroid.show('gambar diubah', 1000)
        })
        .catch(e => {
            console.log('error on image deletion => ', e);
        });
  }

  const uploadImage = async () => {
    // const uri = uri;
      hapus()
        //------- upload gambar -------//
        const namaFoto = await uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
          .ref('Gambar/' + id + '/')
          .child(namaFoto)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          ToastAndroid.show('Harap tunggu!', 1000);
          getlink(namaFoto)
        });
  };

  const renderItem = ({item}) => {
    return(
      <List.Item
        title={item.nama}
        titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
        onPress={() => {
          hideModal();
          setCreator(item.nama)
          setIdCreator(item.id)
          setJurusan(item.jurusan)
        }}
        left={props => <List.Icon {...props} icon="account-check-outline" />}
      />
    )
  }

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
        setUri(response.assets[0].uri);
        setUpload(true)
        seChangeImage(true)
        // console.log(arrayImages[0]);
      }
    });
  };

  if(isLoading) return <Loading />
  
  return (
    <Provider>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} color={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
            <Subheading style={styles.title}>Update Produk</Subheading>
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
              disabled={true}
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
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
            {/* <Button uppercase={false} color={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonJurusan} onPress={showModal}>
                {jurusan}
            </Button> */}
            {/* <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
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
                onChangeText={text => setTanggal(text)}
              />
              <Button uppercase={false} color={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModalDate}>
                  Atur
              </Button>
            </View> */}
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
              <Button uppercase={false} color={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModal}>
                  Pilih
              </Button>
            </View>
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
                  color={color.primary}
                  style={{backgroundColor:color.lightPrimary}}
                />
                <Subheading>Upload Gambar</Subheading>
              </View>
            ):(
              <>
              <Subheading style={{marginHorizontal:width*(30/365), marginTop:height*(5/365), fontFamily:'Poppins-Medium', color:color.textSecondary}}>Foto Produk</Subheading>
              <Card style={styles.imageCard}>
                <Card.Cover
                  source={{uri: uri}}
                  style={{height: height*(100/365)}}
                />
                <IconButton
                  icon="refresh"
                  color={color.primary}
                  onPress={()=>openGallery()}
                  style={{position:'absolute', top:0, right:0, backgroundColor:color.lightPrimary}}
                />
              </Card>
              </>
            )}
          </List.Section>
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
            <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Pilih Creator</List.Subheader>
            <FlatList 
              data={dataCreator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </Modal>
        </Portal>
        {/* <Portal>
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
        </Portal> */}
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} color={color.primary} disabled={btnLoading} mode="contained" labelStyle={styles.button} onPress={() => updateProduk()}>
          Simpan Perubahan
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
    marginBottom:30
  }
});
