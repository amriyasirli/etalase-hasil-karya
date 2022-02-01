import React, {useState} from 'react';
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



const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const updateKategori = ({route, navigation}) => {
    const {id, value} = route.params;
    const [kategori, setKategori] = useState(value);

  const update = () => {
    firestore()
      .collection('Kategori')
      .doc(id)
      .update({
          kategori: kategori,
      })
      .then(() => {
          ToastAndroid.show('Data berhasil disimpan !', 2000);
          setTimeout(() => {
            navigation.navigate('Kategori');
          }, 1000);
      });
  }

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
            <Subheading style={styles.title}>Tambah Kategori</Subheading>
          </View>
          <List.Section>
            <TextInput
              label="Kategori"
              value={kategori}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {primary: color.textLight, underlineColor: 'transparent'},
              }}
              onChangeText={text => setKategori(text)}
            />
            {/* <Button uppercase={false} color={color.primary} mode="outlined" style={{marginHorizontal:20}} labelStyle={styles.buttonKategori} onPress={showModal}>
                {kategori}
            </Button> */}
            
          </List.Section>
        </View>
    </ScrollView>
    <View style={{width:width, padding:20}} >
      <Button uppercase={false} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => update()}>
          Simpan
      </Button>
    </View>
</Provider>
  );
};

export default updateKategori;

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
