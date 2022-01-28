import React, {useState} from 'react'
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native'
import {Avatar, Headline, IconButton, Subheading, Button, Caption} from 'react-native-paper'
import color from '../../style/colors'
import Metrics from '../../style/metrics'
import font from '../../style/font'

const width = Metrics.screenWidth; 
const height = Metrics.screenHeight; 
const detail = ({navigation}) => {

    return (
        <>
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <View style={styles.containerHeader}>
                <IconButton icon="arrow-left" size={32} color={color.textWhite} style={{position:'absolute', left:10, top:60}} onPress={()=>navigation.goBack()} />
                <Avatar.Image size={176} style={styles.produk} source={require('../../images/produk.png')} />
            </View>
            <View style={styles.containerBody}>
                <Headline style={styles.produkName}>Nama Produk Siswa</Headline>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:5, marginBottom:20}}>
                    <View style={styles.quantity}>
                        <IconButton icon="minus" color={color.secondary} style={{backgroundColor:color.lightPrimary}} />
                        <Subheading style={styles.number}>1</Subheading>
                        <IconButton icon="plus" color={color.primary} style={{backgroundColor:color.lightPrimary}} />
                    </View>
                    <Subheading style={styles.price}>Rp 5000</Subheading>
                </View>
                <Headline style={styles.subheading}>Deskripsi:</Headline>
                <Caption style={styles.desc}>Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make 
                Red Quinoa, Limer a new fruit salad to eat today, quinoa is the perfect brunch for you. make</Caption>
            </View>
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:20, position:'absolute', bottom:0, paddingBottom:10}}>
            <IconButton icon="share-variant" color={color.primary} style={{backgroundColor:color.lightPrimary}} />
            <Button uppercase={false} style={{width:'85%', marginHorizontal:10}} color={color.primary} mode="contained" labelStyle={styles.button} onPress={() => console.log('Pressed')}>
                Beli Produk
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
    quantity:{
        flexDirection:'row',
        alignItems:'center',
    },
    number:{
        color:color.textPrimary,
        fontSize:font.size.font18,
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
        fontSize:font.size.font14
    }
})
