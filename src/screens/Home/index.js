import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  IconButton,
  Searchbar,
  Headline,
  Text,
  Caption,
  Subheading,
  Card,
  Button,
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../component/loading';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearch = query => setSearchQuery(query);
  const carousel = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    firestore()
      .collection('Users')
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
    loadData();
  }, []);

  const loadData = () => {
    firestore()
      .collection('Produk')
      .limit(5)
      .orderBy('tanggal', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setProduk(data => [...data, documentSnapshot.data()]);
          //   setIsLoading(false);
        });
        loadKategori();
      });
  };

  const loadKategori = () => {
    firestore()
      .collection('Kategori')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setKategori(data => [...data, documentSnapshot.data()]);
          setIsLoading(false);
        });
      });
  };

  const renderItem = ({item}) => {
    return (
      <Card style={styles.items}>
        <Card.Cover
          source={{uri: 'https://picsum.photos/700'}}
          style={{height: 156}}
        />
        <IconButton
          onPress={() => {}}
          icon="heart-outline"
          color={color.primary}
          style={styles.iconHeart}
        />
        <Caption style={styles.produkName}>{item.namaProduk}</Caption>
        <View style={styles.containerPrice}>
          <Caption style={styles.price}>{item.kategori}</Caption>
          <IconButton
            icon="chevron-right"
            size={20}
            color={color.primary}
            style={{backgroundColor: color.lightPrimary}}
            onPress={() => navigation.navigate('Detail', {id: item.id})}
          />
        </View>
      </Card>
    );
  };

  const slide_kategori = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.card2}
        >
          <IconButton
            color={color.primary}
            size={32}
            icon="tag-outline"
          />
          <Text style={styles.subtitleDark}>{item.kategori}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <ScrollView vertical={true}
        contentContainerStyle={{paddingBottom:Metrics.screenWidth * (50 / 365)}}
    >
      <View style={styles.header}>
        <IconButton icon="menu" color={color.icon} />
        <View style={{alignItems: 'center'}}>
          <IconButton icon="account" color={color.primary} />
          <Caption
            style={{fontSize: 10, marginTop: -10, color: color.textPrimary}}>
            Login
          </Caption>
        </View>
      </View>
      <Headline style={styles.Hello}>
        Welcome Guys, Lihatlah hasil karya dari siswa kami !{' '}
      </Headline>
      {/* <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:Dimensions.get('window').width}}> */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{fontSize: 14}}
      />
      {/* <IconButton icon="home" /> */}
      {/* </View> */}
      <Subheading style={styles.rekomended}>Kategori</Subheading>
      <Carousel
        // ref={carousel}
        data={kategori}
        renderItem={slide_kategori}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth / 2 - 30}
        activeSlideAlignment="start"
        containerCustomStyle={styles.sliderContentContainer}
      />
      <Subheading style={styles.rekomended}>Produk terbaru !</Subheading>
      <Carousel
        //   ref={(c) => { dataEntry = c; }}
        data={produk}
        keyExtractor={(produk, index) => index.toString()}
        numColumns={2}
        renderItem={renderItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth / 2 - 30}
        activeSlideAlignment={'start'}
        //   hasParallaxImages={true}
        containerCustomStyle={styles.sliderContentContainer}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.screenWidth * (20 / 365),
    paddingTop: Metrics.screenWidth * (40 / 365),
  },
  Hello: {
    color: color.textPrimary,
    fontSize: font.size.font14,
    fontWeight: font.weight.semi,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: Metrics.screenWidth * (30 / 365),
    paddingTop: Metrics.screenWidth * (20 / 365),
  },
  searchBar: {
    // paddingHorizontal:Metrics.screenWidth * (20 / 365)
    borderRadius: 16,
    marginHorizontal: Metrics.screenWidth * (30 / 365),
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
    elevation: 0,
  },
  rekomended: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: color.textPrimary,
    marginTop:20,
    marginHorizontal: Metrics.screenWidth * (25 / 365),
  },
  cardRekomended: {
    width: 150,
    height: 150,
  },
  card3: {
    width: Metrics.screenWidth / 2,
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
    width: Metrics.screenWidth / 2 - 50,
    height: Metrics.screenWidth * (100 / 365),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    borderRadius: 6,
    elevation: 3,
    shadowColor: color.primary,
  },
  sliderContentContainer: {
    flex: 1,
    paddingVertical: 8, // for custom animation
    paddingHorizontal: 8, // for custom animation
  },
  subtitleDark: {
    color: color.textSecondary,
    fontFamily: 'Poppins-Regular',
    fontSize: font.size.font12,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Metrics.screenWidth / 2 - 50,
    // height:Metrics.screenHeight/4,
    margin: 10,
    backgroundColor: 'transparant',
    // elevation:3,
    // borderColor:color.primary,
    // borderWidth:0.2,
    borderRadius: 8,
    shadowColor: color.primary,
  },
  searchBar: {
    // paddingHorizontal:Metrics.screenWidth * (20 / 365)
    borderRadius: 16,
    marginHorizontal: Metrics.screenWidth * (30 / 365),
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: '#E8E8E8',
    elevation: 0,
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
});
