import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  Dimensions,
  FlatList,
  Alert,
  ToastAndroid
} from 'react-native';
import {
  IconButton,
  Searchbar,
  Headline,
  Text,
  Caption,
  Subheading,
  Button,
  List,
  Menu, Divider, Provider,
  FAB,
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import dataEntry from '../../service/dataEntri'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loading from '../../component/loading'


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Produk = ({navigation}) => {
  const [produk, setProduk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [msgNull, setMsgnull] = useState(false);


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const empty = arr => (arr.length = 0);
  const onRefresh = () => {
    setIsLoading(true)
    empty(produk);
    setTimeout(() => {
      loadData();
    }, 1000);
  };

  useEffect(() => {
    loadData()
  }, []);

  const loadData = () => {
    firestore()
      .collection('Produk')
      .orderBy('tanggal', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setProduk(data => [...data, documentSnapshot.data()]);

          // setFilteredDataSource(masterDataSource);
          // setLoading(false)
        });
        if (produk.length > 0) {
          setIsLoading(false);
          setMsgnull(false);
        } else {
          setMsgnull(true);
          setIsLoading(false);
        }
        
      });
  }

  const hapusGambar = (id, fileName) => {
    let imageRef = storage().ref('Gambar/' + id + '/' + fileName);
        imageRef
        .delete()
        .then(() => {
            ToastAndroid.show('Proses...', 1000)
        })
        .catch(e => {
            console.log('error on image deletion => ', e);
        });
  }
  
  const hapus = async (id, fileName) => {
    const idGambar = id;
    const fileGambar = fileName;
    hapusGambar(idGambar, fileGambar)
    await firestore()
      .collection('Produk')
      .doc(id)
      .delete()
      .then(() => {
        onRefresh();
        ToastAndroid.show('Data dihapus, tarik kebawah untuk refresh !', 2000);
      });
  }

  const renderItem = ({item}) => {
    return(
      <>
      <List.Accordion
          // key={index}
          title={item.namaProduk}
          description={item.jurusan}
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
            buttonColor={color.danger}
            textColor={color.textWhite}
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
                    onPress:()=>hapus(item.id, item.fileName)
                  },
                  {text: 'Cancel', style: 'cancel'},
                ],
                {cancelable: true},
              );
            }}>
            Hapus
          </Button>

          <Button
            buttonColor={color.lightSuccess}
            textColor={color.success}
            icon="file-document-edit-outline"
            mode="outlined"
            onPress={() => navigation.navigate('updateProduk', {
              id:item.id,
              idCreator: item.idCreator,
            })}
            size={15}>
            Update
          </Button>
          <Button
            buttonColor={color.textPrimary}
            textColor={color.textWhite}
            icon="eye"
            mode="outlined"
            onPress={()=>navigation.navigate('Detail', {
              id:item.id,
              idCreator: item.idCreator,
            })}
            size={15}>
            Detail
          </Button>
        </View>
        </List.Accordion>
</>
    )
  }

  if (isLoading) return <Loading />
  return (
      <>
        <View>
          <View style={styles.container}>
            <IconButton icon="arrow-left" onPress={()=>navigation.goBack()} iconColor={color.textWhite} style={{position:'absolute', left:10, top:height/20}} />
            <Subheading style={styles.title}>List Produk</Subheading>
          </View>
          
            {/* <List.Subheader style={{fontFamily:'Poppins-SemiBold'}}>Menu</List.Subheader> */}
            {!msgNull ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingTop: 68,
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: height/3,
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color:color.primary
              }}>
              Tidak ada riwayat !
            </Text>
            <IconButton
              style={{
                elevation: 15,
                shadowColor: '#36455A',
                backgroundColor: '#36455A',
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size={28}
              iconColor="white"
              icon="refresh"
              onPress={onRefresh}
            />
          </View>
        ):(
          <List.Section style={{marginBottom:20}}>
            <FlatList 
              data={produk}
              keyExtractor={(produk, index) => index.toString()}
              renderItem={renderItem}
              ListFooterComponent={(<View style={{height:300}}></View>)}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={()=>onRefresh()} />
              }
            />
            </List.Section>
            )}
          
            {/* <View style={{height:100}}>
              <Text>sys</Text>
            </View> */}
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
  loadingContainer:{
    flex:1,
    justifyContent:'center', 
    alignItems:'center'
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
