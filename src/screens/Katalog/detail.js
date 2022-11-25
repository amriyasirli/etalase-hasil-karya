import React, {useState, useEffect} from 'react'
import { StyleSheet, Share, TouchableOpacity, View, ScrollView, Linking, ToastAndroid, PermissionsAndroid } from 'react-native'
import {Avatar, Card, Headline, IconButton, Subheading, Button, Caption, Text, DataTable} from 'react-native-paper'
import RNFetchBlob from 'rn-fetch-blob-v2'

import color from '../../style/colors'
import Metrics from '../../style/metrics'
import font from '../../style/font'
import Loading from '../../component/loading'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageView from "react-native-image-viewing";
import bulan from '../../component/bulan'

import Carousel, {Pagination} from 'react-native-snap-carousel';


const width = Metrics.screenWidth; 
const height = Metrics.screenHeight; 

const detail = ({route, navigation}) => {

    const {id, idCreator} = route.params;
    const [namaProduk, setNamaProduk] = useState("");

    const [produk, setProduk] = useState([]);


    // const [idCreator, setIdCreator] = useState("");
    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");
    const [wa, setWa] = useState("");
    const [alamat, setAlamat] = useState("");

    const [deskripsi, setDeskripsi] = useState("");
    const [uri, setUri] = useState("");
    const [uriView, setUriView] = useState([]);
    const [tanggal, setTanggal] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [creator, setCreator] = useState([]);

    //Image View
    const [visible, setIsVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        // loadProduk()
        loadData();
    }, [])

    const loadData = async () => {
        console.log(id);
        firestore()
            .collection('Produk')
            .where('id', '==', id)
            .get()
            .then( querySnapshot => {
                querySnapshot.forEach(async documentSnapshot => {
                // setProduk(data => [...data, documentSnapshot.data()]);
                const docData = {...documentSnapshot.data()};
                setNamaProduk(docData.namaProduk);
                // setjurusan(docData.jurusan);
                // setCreator(docData.creator);
                // setWa(docData.wa);
                // setIdCreator(docData.idCreator);
                console.log('id Creator :'+idCreator);

                setDeskripsi(docData.deskripsi);
                setTanggal(docData.tanggal);
                setUri(docData.uri);
                setUriView(image => [...image, {uri: docData.uri}])
                // await loadImage(id, docData.image);
                // setIsLoading(false);
                
            });
            // loadCreator()
            loadCreator()

        });
    }

    const loadCreator = () => {
        firestore()
            .collection('Creator')
            .where('id', '==', idCreator)
            .get()
            .then( querySnapshot => {
                querySnapshot.forEach(async documentSnapshot => {
                // setProduk(data => [...data, documentSnapshot.data()]);
                const docDataCreator = {...documentSnapshot.data()};
                setNama(docDataCreator.nama);
                setJurusan(docDataCreator.jurusan);
                setAlamat(docDataCreator.alamat);
                setWa(docDataCreator.wa);


                });
                loadProduk()
            });
    }

    const loadProduk = () => {
        firestore()
          .collection('Produk')
          .orderBy('tanggal', 'desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {

                const arrProduk = documentSnapshot.data();
                
                if(arrProduk.idCreator == idCreator && arrProduk.id != id){
                    setProduk(data => [...data, documentSnapshot.data()]);
                    console.log(produk)
                }
                
                
            });
            setIsLoading(false);
    
          });
      };

    const checkPermission = async () => {
    
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
     
        if (Platform.OS === 'ios') {
          downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadImage();
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };
     
      const downloadImage = () => {
        // Main function to download the image
        
        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = uri;    
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('Image Downloaded Successfully.');
          });
      };
     
      const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };


      const renderItem = ({item, index}) => {
        if (isLoading) return <Loading />;
        return (
          <Card style={styles.items}>
            <Card.Cover source={{uri: item.uri}} style={{height: 100}} />
            <IconButton
              onPress={() => {}}
              icon="heart-outline"
              color={color.primary}
              style={styles.iconHeart}
            />
            <Caption style={styles.produkName}>{item.namaProduk}</Caption>
            <View style={styles.containerPrice}>
              <Caption style={styles.price}>{item.jurusan}</Caption>
              <IconButton
                icon="chevron-right"
                size={20}
                color={color.primary}
                style={{backgroundColor: color.lightPrimary}}
                onPress={() => navigation.navigate('Detail', {
                  id: item.id,
                  idCreator: item.idCreator
                })}
              />
            </View>
          </Card>
        );
      };

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
                'Hello... \n \n'
              +'_'+nama+'_'
              + ' punya karya inovatif '
              +'*'+namaProduk+'*'
              + ' di E-Talase SMKN 1 Ampek Angkek, \n \n Ada banyak hasil karya inovatif siswa menarik lainnya. \n \n Buruan instal dari Playstore sekarang juga !',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
            ToastAndroid.show(error.message, 2000);
        }
      };

    if(isLoading) return <Loading />

    return (
        <>
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <View style={styles.containerHeader}>
                <IconButton icon="arrow-left" size={32} color={color.textWhite} style={{position:'absolute', left:10, top:60}} onPress={()=>navigation.goBack()} />
                <TouchableOpacity onPress={() => setIsVisible(true)} >
                    <Avatar.Image size={280} style={styles.produk} source={{uri:uri}} />
                </TouchableOpacity>
                <IconButton icon="cloud-download-outline" size={32} color={color.textWhite} style={{position:'absolute', right:10, top:60}} onPress={()=>checkPermission()} />
            </View>
            <View style={styles.containerBody}>
                <Headline style={styles.produkName}>{namaProduk}</Headline>
                <View style={styles.row}>
                    <View style={styles.quantity}>
                        <IconButton icon="account" size={18} color={color.secondary} style={{backgroundColor:color.lightPrimary}} />
                        <View style={styles.containerCreator}>
                            <Subheading style={styles.nama}>{nama}</Subheading>
                            <View>
                                <Caption style={styles.tanggal}>
                                    {new Date(tanggal.toMillis()).getDate() +
                                    ' ' +
                                    bulan[new Date(tanggal.toMillis()).getMonth() + 1] +
                                    ' ' +
                                    new Date(tanggal.toMillis()).getFullYear()}
                                </Caption>

                            </View>
                        </View>
                    </View>
                    <Subheading style={styles.price}>{jurusan}</Subheading>
                </View>
                <Headline style={styles.subheading}>Deskripsi:</Headline>
                <Caption style={styles.desc}>{deskripsi}</Caption>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Tentang Creator</DataTable.Title>
                        {/* <DataTable.Title numeric>Calories</DataTable.Title>
                        <DataTable.Title numeric>Fat</DataTable.Title> */}
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.table}>Nama</Text></DataTable.Cell>
                        <DataTable.Cell>:</DataTable.Cell>
                        <DataTable.Cell><Text style={styles.table2}>{nama}</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.table}>Alamat</Text></DataTable.Cell>
                        <DataTable.Cell>:</DataTable.Cell>
                        <DataTable.Cell><Text style={styles.table2}>{alamat}</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.table}>Nomor HP</Text></DataTable.Cell>
                        <DataTable.Cell>:</DataTable.Cell>
                        <DataTable.Cell><Text style={styles.table2}>+{wa}</Text></DataTable.Cell>
                    </DataTable.Row>


                </DataTable>
                <Headline style={styles.produkLain}>Produk Lainnya:</Headline>
                <Carousel
                    //   ref={(c) => { dataEntry = c; }}
                    data={produk}
                    keyExtractor={(produk, index) => index.toString()}
                    numColumns={3}
                    // snapToEnd={3}
                    maxToRenderPerBatch={3}
                    renderItem={renderItem}
                    // refreshControl={
                    //     <RefreshControl
                    //     refreshing={isLoading}
                    //     onRefresh={() => onRefresh()}
                    //     />
                    // }
                    sliderWidth={Metrics.screenWidth}
                    itemWidth={Metrics.screenWidth / 2 - 93}
                    activeSlideAlignment={'start'}
                    //   hasParallaxImages={true}
                    containerCustomStyle={styles.sliderContentContainer}
                    />
            </View>
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:20, position:'absolute', bottom:0, paddingBottom:10}}>
            <IconButton icon="share-variant" color={color.primary} style={{backgroundColor:color.lightPrimary}} onPress={onShare} />
            <Button uppercase={false} icon="whatsapp" style={{width:'85%', marginHorizontal:10}} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+wa+'&text=Saya%20tertarik%20pada%20produk%20'+namaProduk)}>
                Hubungi Admin
            </Button>
        </View>
        <ImageView
            images={uriView}
            imageIndex={imageIndex}
            visible={visible}
            presentationStyle="overFullScreen"
            onRequestClose={() => setIsVisible(false)}
          />
        </>
    )
}

export default detail

const styles = StyleSheet.create({
    containerHeader:{
        height:height/2-30,
        backgroundColor:color.primary,
        justifyContent:'center',
        alignItems:'center',
    },
    produk:{
        justifyContent:'center',
    },
    containerBody:{
        backgroundColor:"#FFFFFF",
        borderTopStartRadius:16,
        borderTopEndRadius:16,
        marginTop:-50,
        padding:20,
        marginBottom:56,
        // height:Metrics.screenHeight/2+30
    },
    produkName:{
        fontFamily:'Poppins-Medium',
        color:color.textPrimary,
        marginBottom:30
    },
    row: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'flex-start', 
        padding:5, 
        marginBottom:20
    },
    quantity:{
        flexDirection:'row',
        alignItems:'center',
    },
    nama:{
        fontFamily:'Poppins-Regular',
        color:color.textSecondary,
        fontSize:font.size.font12,
        marginHorizontal:8
    },
    tanggal:{
        fontFamily:'Poppins-Regular',
        color:color.textLight,
        fontSize:font.size.font10,
        marginHorizontal:8
    },
    price:{
        fontSize:font.size.font16,
        fontFamily:'Poppins-Medium',
        color:color.primary,
    },
    desc:{
        fontSize:font.size.font12,
        fontFamily:'Poppins-Regular',
        marginBottom:36,
    },
    subheading:{
        fontFamily:'Poppins-Medium',
        fontSize:font.size.font14,
    },
    produkLain:{
        fontFamily:'Poppins-Medium',
        fontSize:font.size.font14,
        marginTop:36,
    },
    button:{
        color:color.textWhite,
        fontFamily:'Poppins-Medium',
        // fontSize:font.size.font14
    },
    containerCreator:{
        justifyContent:'flex-start',
    },
    table:{
        fontFamily:'Poppins-Light',
        fontSize:12,
    },
    table2:{
        fontFamily:'Poppins-Medium',
        fontSize:12,
    },
    sliderContentContainer: {
        flex: 1,
        paddingVertical: 8, // for custom animation
        paddingHorizontal: 8, // for custom animation
    },
    items: {
        width: Metrics.screenWidth / 3 - 30,
        // height:Metrics.screenHeight/4,
        margin: 10,
        backgroundColor: 'transparant',
        // elevation:0,
        // borderColor:color.primary,
        // borderWidth:0.2,
        borderRadius: 12,
        shadowColor: color.primary,
      },
      iconHeart: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
      produkName: {
        marginTop: 8,
        paddingHorizontal: 8,
        fontFamily: 'Poppins-Medium',
        color: color.textPrimary,
      },
      price: {
        color: color.primary,
        fontFamily: 'Poppins-SemiBold',
        paddingHorizontal: 10,
      },
      containerPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
})
