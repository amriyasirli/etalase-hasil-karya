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
  Provider,
  Portal
} from 'react-native-paper';
import color from '../../style/colors';
import font from '../../style/font';
import DatePicker from 'react-native-date-picker';
import dataEntry from '../../service/dataEntri'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loading from '../../component/loading'





const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AddCreator = ({navigation}) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [wa, setWa] = useState("+62");
  const [jurusan, setJurusan] = useState("");
  const [btnLoading, setbtnLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [dataJurusan, setDataJurusan] = useState([]);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  useEffect(() => {
    
    loadJurusan()
    
    
  }, [])


  const addCreator = () => {

    if(nama== "" || alamat == "" || wa == "" || jurusan == ""){
      ToastAndroid.show('Lengkapi Form !', 2000);
    }else{
      setbtnLoading(true);

      const id = uuid.v4();
      firestore()
        .collection('Creator')
        .doc(id)
        .set({
            id:id,
            nama: nama,
            alamat: alamat,
            wa: wa.substr(1),
            jurusan: jurusan,
        })
        .then(() => {
            ToastAndroid.show('Data berhasil disimpan !', 2000);
            setTimeout(() => {
              navigation.navigate('Creator');
            }, 1000);
        });
    }
    
  }

  const loadJurusan = () => {
    firestore()
      .collection('Jurusan')
      .orderBy('jurusan', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setDataJurusan(data => [...data, documentSnapshot.data()]);
          setIsLoading(false)
        });
      });
  }

  const renderItem = ({item}) => {
    return(
      <List.Item
        title={item.jurusan}
        titleStyle={{fontFamily:'Poppins-Regular', color:color.textSecondary}}
        onPress={() => {
          hideModal();
          setJurusan(item.jurusan)
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
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} iconColor={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
            <Subheading style={styles.title}>Tambah Creator</Subheading>
          </View>
          <List.Section>
            <TextInput
              label="Nama"
              value={nama}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setNama(text)}
            />
            <TextInput
              label="Alamat"
              value={alamat}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setAlamat(text)}
            />
            <TextInput
              label="Nomor Hp"
              value={wa}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setWa(text)}
            />
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
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
              <Button uppercase={false} color={color.textPrimary} mode="contained" style={{marginHorizontal:20}} labelStyle={styles.btnTanggal} onPress={showModal}>
                  Pilih
              </Button>
            </View>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
                <List.Subheader style={{fontFamily:'Poppins-SemiBold', color:color.textPrimary}}>Pilih Jurusan</List.Subheader>
                <FlatList 
                  data={dataJurusan}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              </Modal>
            </Portal>
            {/* <TextInput
              label="Jurusan"
              value={jurusan}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setJurusan(text)}
            /> */}
            {/* <Button uppercase={false} buttonColor={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonCreator} onPress={showModal}>
                {creator}
            </Button> */}
            
          </List.Section>
        </View>
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} buttonColor={color.primary} mode="contained" disabled={btnLoading} labelStyle={styles.button} onPress={() => addCreator()}>
          Simpan
      </Button>
    </View>
</Provider>
  );
};

export default AddCreator;

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
  buttonCreator:{
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
