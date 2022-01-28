import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList} from 'react-native';
import { Card, Searchbar, IconButton, Caption } from 'react-native-paper';
import {Row, Col} from 'react-native-responsive-grid-system';
import Metrics from '../../style/metrics'
import color from '../../style/colors'

const Katalog = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const dataEntry = [
        {
            title: 'Beautiful and dramatic Antelope Canyon',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/UYiroysl.jpg'
        },
        {
            title: 'Earlier this morning, NYC',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
        },
        {
            title: 'White Pocket Sunset',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
            illustration: 'https://i.imgur.com/MABUbpDl.jpg'
        },
        {
            title: 'Acrocorinth, Greece',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
        },
        {
            title: 'The lone tree, majestic landscape of New Zealand',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
        },
        {
            title: 'Middle Earth, Germany',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/lceHsT6l.jpg'
        },
        {
            title: 'Acrocorinth, Greece',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
        },
        {
            title: 'The lone tree, majestic landscape of New Zealand',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
        },
        {
            title: 'Middle Earth, Germany',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/lceHsT6l.jpg'
        }
    ];
    const renderItem = (index, i) => {
        return(
            <Card style={styles.items} key={i}>
                <Card.Cover key={index} source={{ uri: 'https://picsum.photos/700' }} style={{height:156}} />
                <IconButton onPress={()=>{}} icon="heart-outline" color={color.primary} style={styles.iconHeart} />
                <Caption style={styles.produkName}>Nama Karya Produk</Caption>
                <View style={styles.containerPrice}>
                    <Caption style={styles.price}>Rp. 5000</Caption>
                    <IconButton icon="chevron-right" size={20} color={color.primary} style={{backgroundColor:color.lightPrimary}}  onPress={()=>navigation.navigate('Detail')} />
                </View>
            </Card>
        )
    }
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
            <FlatList 
                data={dataEntry}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={{paddingHorizontal:10}}
                ListFooterComponent={()=>{return(<View style={{height:100}}></View>)}}
            />

        {/* <ScrollView style={{marginTop:10}}>
            <View style={styles.container}>
                    {dataEntry.map((index, i)=>{
                        return(
                            <Card style={styles.items} key={i}>
                                <Card.Cover key={index} source={{ uri: 'https://picsum.photos/700' }} style={{height:156}} />
                                <IconButton onPress={()=>{}} icon="heart-outline" color={color.primary} style={styles.iconHeart} />
                                <Caption style={styles.produkName}>Nama Karya Produk</Caption>
                                <View style={styles.containerPrice}>
                                    <Caption style={styles.price}>Rp. 5000</Caption>
                                    <IconButton icon="plus" color={color.primary} onPress={()=>{}} />
                                </View>
                            </Card>
                        )
                    })}
            </View>
        </ScrollView> */}
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
