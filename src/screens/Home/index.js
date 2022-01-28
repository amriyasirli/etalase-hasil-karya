import React, {useRef, useState} from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import {IconButton, Searchbar, Headline, Text, Caption, Subheading, Card, Button} from 'react-native-paper'
import Metrics from '../../style/metrics'
import color from '../../style/colors'
import font from '../../style/font'
import Carousel, {Pagination} from 'react-native-snap-carousel';

const Home = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const carousel = useRef();
    const [activeSlide, setActiveSlide] = useState(0);

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
        }
    ];

    const renderView = ({item, index}) => {
        return(
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                style={styles.card3}
                onPress={() => navigation.navigate('Pengantaran', {textValue: ""})}>
                <IconButton color={color.primary} size={32} icon="truck-fast-outline" />
                <Text style={styles.subtitleDark}>PENGANTARAN</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.card3}
                onPress={() => navigation.navigate('Pengantaran', {textValue: ""})}>
                <IconButton color={color.primary} size={32} icon="truck-fast-outline" />
                <Text style={styles.subtitleDark}>PENGANTARAN</Text>
            </TouchableOpacity> */}
        </View>
        )
    }

    const renderView2 = ({item, index}) => {
        return(
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                style={styles.card2}
                onPress={() => navigation.navigate('Pengantaran', {textValue: ""})}>
                <IconButton color={color.primary} size={32} icon="truck-fast-outline" />
                <Text style={styles.subtitleDark}>PENGANTARAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.card2}
            onPress={() => navigation.navigate('Pengantaran', {textValue: ""})}>
            <IconButton color={color.primary} size={32} icon="truck-fast-outline" />
            <Text style={styles.subtitleDark}>PENGANTARAN</Text>
        </TouchableOpacity>
        </View>
        )
    }

    return (
        <ScrollView vertical={true}>
            <View style={styles.header}>
                <IconButton icon="menu" color={color.icon} />
                <View style={{alignItems:'center'}}>
                    <IconButton icon="account" color={color.primary}/>
                    <Caption style={{fontSize:10, marginTop:-10, color:color.textPrimary}}>Login</Caption>
                </View>
            </View>
            <Headline style={styles.Hello}>Welcome Guys, Lihatlah hasil karya dari siswa kami ! </Headline>
            {/* <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:Dimensions.get('window').width}}> */}
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={{fontSize:14}}
                />
                {/* <IconButton icon="home" /> */}
            {/* </View> */}
            <Subheading style={styles.rekomended}>Kategori</Subheading>
            <Carousel
              ref={carousel}
              data={dataEntry}
              renderItem={renderView}
            //   layoutCardOffset="9"
            onSnapToItem={index => setActiveSlide(index)}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Metrics.screenWidth/2+10}
            //   hasParallaxImages={true}
            contentContainerStyle={{justifyContent:'flex-start',}}
              containerCustomStyle={styles.sliderContentContainer}
            />
            <Subheading style={styles.rekomended}>Produk terbaru !</Subheading>
            <Carousel
            //   ref={(c) => { dataEntry = c; }}
              data={dataEntry}
              numColumns={2}
              renderItem={renderView2}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Metrics.screenWidth - Metrics.screenWidth * (36 / 365)}
            //   hasParallaxImages={true}
              containerCustomStyle={styles.sliderContentContainer}
            />
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:Metrics.screenWidth * (20 / 365),
        paddingTop:Metrics.screenWidth * (40 / 365)
    },
    Hello:{
        color:color.textPrimary,
        fontSize:font.size.font14,
        fontWeight:font.weight.semi,
        fontFamily:'Poppins-Medium',
        paddingHorizontal:Metrics.screenWidth * (30 / 365),
        paddingTop:Metrics.screenWidth * (20 / 365)
    },
    searchBar:{
        // paddingHorizontal:Metrics.screenWidth * (20 / 365)
        borderRadius: 16,
        marginHorizontal: Metrics.screenWidth * (30 / 365),
        marginTop: 20,
        marginBottom: 20,
        backgroundColor:'#E8E8E8',
        elevation:0,
    },
    rekomended:{
        fontSize:16,
        fontFamily:'Poppins-SemiBold',
        color:color.textPrimary,
        marginHorizontal: Metrics.screenWidth * (25 / 365),
    },
    cardRekomended:{
        width:150,
        height:150,
    },
    card3: {
        width: Metrics.screenWidth/2 ,
        height: Metrics.screenWidth * (100 / 365),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5%',
        borderRadius: 6,
        elevation: 3,
        shadowColor: color.primary,
      },
    card2: {
    width: Metrics.screenWidth / 2 -50 ,
    height: Metrics.screenWidth * (200 / 365),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    borderRadius: 6,
    elevation: 3,
    shadowColor: color.primary,
    },
    sliderContentContainer: {
        flex:1,
    paddingVertical: 8 // for custom animation
    },
    subtitleDark:{
        color:color.textSecondary,
        fontFamily:'Poppins-Regular',
        fontSize:font.size.font12
    }
})
