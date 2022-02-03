import React, {useState, useEffect} from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Linking } from 'react-native'
import {Avatar, Headline, IconButton, Subheading, Button, Caption, Card} from 'react-native-paper'
import color from '../../style/colors'
import Metrics from '../../style/metrics'
import font from '../../style/font'
import Loading from '../../component/loading'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const width = Metrics.screenWidth; 
const height = Metrics.screenHeight; 

const detail = ({route, navigation}) => {

    const {id} = route.params;
    const [namaProduk, setNamaProduk] = useState("");
    const [kategori, setkategori] = useState("");
    const [creator, setCreator] = useState("");
    const [wa, setWa] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [uri, setUri] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
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
                setkategori(docData.kategori);
                setCreator(docData.creator);
                setWa(docData.wa);
                setDeskripsi(docData.deskripsi);
                setTanggal(docData.tanggal);
                setUri(docData.uri);
                // await loadImage(id, docData.image);
                setIsLoading(false);


                });
            });
    }

    const loadImage = async (id, image) => {

        let imageRef = storage().ref('Gambar/' + id + '/' + image);
        await imageRef
        .getDownloadURL()
        .then(url => {
            //from url you can fetched the uploaded image easily
            setImage(url);
        })
        .catch(e => console.log('getting downloadURL of image error => ', e));
      
      };

    if(isLoading) return <Loading />

    return (
        <>
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <View style={styles.containerHeader}>
                <IconButton icon="arrow-left" size={32} color={color.textWhite} style={{position:'absolute', left:10, top:60}} onPress={()=>navigation.goBack()} />
                <Avatar.Image size={280} style={styles.produk} source={{uri:uri}} />
            </View>
            <View style={styles.containerBody}>
                <Headline style={styles.produkName}>{namaProduk}</Headline>
                <View style={styles.row}>
                    <View style={styles.quantity}>
                        <IconButton icon="account" size={18} color={color.secondary} style={{backgroundColor:color.lightPrimary}} />
                        <Subheading style={styles.creator}>{creator}</Subheading>
                        {/* <IconButton icon="plus" color={color.primary} style={{backgroundColor:color.lightPrimary}} /> */}
                    </View>
                    <Subheading style={styles.price}>{kategori}</Subheading>
                </View>
                <Headline style={styles.subheading}>Deskripsi:</Headline>
                <Caption style={styles.desc}>{deskripsi}</Caption>
            </View>
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:20, position:'absolute', bottom:0, paddingBottom:10}}>
            <IconButton icon="share-variant" color={color.primary} style={{backgroundColor:color.lightPrimary}} />
            <Button uppercase={false} icon="whatsapp" style={{width:'85%', marginHorizontal:10}} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+wa+'&text=Saya%20tertarik%20pada%20produk%20'+namaProduk)}>
                Hubungi Creator
            </Button>
        </View>
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
        alignItems:'center', 
        padding:5, 
        marginBottom:20
    },
    quantity:{
        flexDirection:'row',
        alignItems:'center',
    },
    creator:{
        color:color.textSecondary,
        fontSize:font.size.font12,
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
    },
    subheading:{
        fontFamily:'Poppins-Medium',
        fontSize:font.size.font14,
    },
    button:{
        color:color.textWhite,
        fontFamily:'Poppins-Medium',
        // fontSize:font.size.font14
    }
})
