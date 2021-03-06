import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, FlatList} from 'react-native';
import { Card, Searchbar, IconButton, Caption } from 'react-native-paper';
import {Row, Col} from 'react-native-responsive-grid-system';
import Metrics from '../../style/metrics'
import color from '../../style/colors'
import Loading from '../../component/loading'
import Empty from '../../component/dataEmpty'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Katalog = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [produk, setProduk] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [msgNull, setMsgnull] = useState(false);


    const empty = arr => (arr.length = 0);
    const onRefresh = () => {
        setProduk([]);
        setIsLoading(true);
        loadData();
    };

    useEffect(() => {
        loadData()
    }, [])


    const loadData = () => {
        firestore()
            .collection('Produk')
            .orderBy('tanggal', 'desc')
            .get()
            .then(querySnapshot => {
                const size = querySnapshot.size;
                if (size == 0) {
                    setMsgnull(true);
                }
                querySnapshot.forEach(documentSnapshot => {
                setProduk(data => [...data, documentSnapshot.data()]);
                setIsLoading(false);

            });
                
            });
    }

    const onChangeSearch = query => setSearchQuery(query);
    const renderItem = ({item, index}) => {
        if(isLoading) return <Loading />
        return(
            <Card style={styles.items}>
                <Card.Cover source={{uri:item.uri}} style={{height:156}} />
                <IconButton onPress={()=>{}} icon="heart-outline" color={color.primary} style={styles.iconHeart} />
                <Caption style={styles.produkName}>{item.namaProduk}</Caption>
                <View style={styles.containerPrice}>
                    <Caption style={styles.price}>{item.kategori}</Caption>
                    <IconButton icon="chevron-right" size={20} color={color.primary} style={{backgroundColor:color.lightPrimary}}  onPress={()=>navigation.navigate('Detail', {id:item.id})} />
                </View>
            </Card>
        )
    }
    if(isLoading) return <Loading />
  return (
    <>
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            selectionColor={color.textPrimary}
            inputStyle={{fontSize:14, fontFamily:'Poppins-Regular'}}
            />
        {msgNull ? (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <Text
                style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Bold',
                    color:color.primary
                }}>
                Refresh Halaman !
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
                color="white"
                icon="refresh"
                onPress={onRefresh}
                />
            </View>
        ):(
            <FlatList 
                data={produk}
                keyExtractor={(produk, index) => index.toString()}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={{paddingHorizontal:10}}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={()=>onRefresh()} />
                  }
                ListFooterComponent={()=>{return(<View style={{height:100}}></View>)}}
            />

        )}
    </>
  );
};

export default Katalog;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:5,
        flexWrap:'wrap',
        width:'100%'

    },
    items:{
        width:Metrics.screenWidth/2-30, 
        // height:Metrics.screenHeight/4, 
        margin:10, 
        backgroundColor:'transparant',
        // elevation:0,
        // borderColor:color.primary,
        // borderWidth:0.2,
        borderRadius:8,
        shadowColor:color.primary
    },
    searchBar:{
        // paddingHorizontal:Metrics.screenWidth * (20 / 365)
        borderRadius: 16,
        marginHorizontal: Metrics.screenWidth * (30 / 365),
        marginTop: 50,
        marginBottom: 10,
        backgroundColor:'#E8E8E8',
        elevation:0,
    },
    iconHeart:{
        position:'absolute',
        top:0,
        right:0
    },
    produkName:{
        marginTop:8,
        paddingHorizontal:8,
        fontFamily:'Poppins-Medium',
        color:color.textPrimary
    },
    price:{
        color:color.primary,
        fontFamily:'Poppins-SemiBold',
        paddingHorizontal:10
    },
    containerPrice:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
        
    }
});
