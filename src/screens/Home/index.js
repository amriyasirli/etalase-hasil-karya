import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  Linking,
} from 'react-native';
import {
  IconButton,
  Searchbar,
  Headline,
  Text,
  Caption,
  Subheading,
  Card,
  List,
  Avatar,
  Button,
} from 'react-native-paper';

import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../component/loading';
import storage from '@react-native-firebase/storage';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [produk, setProduk] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);
  // const carousel = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const onRefresh = () => {
    setProduk([]);
    setTimeout(() => {
      loadData();
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    firestore()
      .collection('Produk')
      .orderBy('tanggal', 'desc')
      .limit(5)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setProduk(data => [...data, documentSnapshot.data()]);
          setFilteredDataSource(produk);

          setIsLoading(false);
        });

        loadJurusan();
      });
  };

  const loadJurusan = () => {
    firestore()
      .collection('Jurusan')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setJurusan(data => [...data, documentSnapshot.data()]);
          setIsLoading(false);
        });
      });
  };

  const searchFilterFunction = text => {
    console.log(filteredDataSource);
    if (text) {
      const newData = produk.filter(function (item) {
        const itemData = item.namaProduk
          ? item.namaProduk.toUpperCase()
          : ''.toUpperCase();
        const itemData2 = item.jurusan
          ? item.jurusan.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(produk);
      setSearch(text);
    }
  };

  const renderItem = ({item, index}) => {
    if (isLoading) return <Loading />;
    return (
      <Card style={styles.items}>
        <Card.Cover source={{uri: item.uri}} style={{height: 156}} />
        <IconButton
          onPress={() => {}}
          icon="heart-outline"
          buttonColor={color.primary}
          style={styles.iconHeart}
        />
        <Caption style={styles.produkName}>{item.namaProduk}</Caption>
        <View style={styles.containerPrice}>
          <Caption style={styles.price}>{item.jurusan}</Caption>
          <IconButton
            icon="chevron-right"
            size={20}
            buttonColor={color.primary}
            style={{backgroundColor: color.lightPrimary}}
            onPress={() => navigation.navigate('Detail', {
              id: item.id,
              idCreator: item.idCreator,
            })}
          />
        </View>
      </Card>
    );
  };

  const ItemView = ({item}) => {
    return (
      <List.Accordion
        title={item.namaProduk.toUpperCase()}
        titleStyle={{fontFamily: 'Montserrat-Medium'}}
        description={<Text>{item.jurusan}</Text>}
        descriptionStyle={{fontFamily: 'Montserrat'}}
        onPress={() => navigation.navigate('Detail', {
          id: item.id,
          idCreator: item.idCreator,
        })}
        left={() => (
          <Avatar.Image size={24} source={{uri: item.uri}} />
        )}></List.Accordion>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const slide_jurusan = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.card2} onPress={()=> navigation.navigate('FilterKatalog', {
          value: item.jurusan,
        })}>
          <IconButton buttonColor={color.primary} size={32} icon="tag-outline" />
          <Text style={styles.subtitleDark}>{item.jurusan}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <ScrollView
          vertical={true}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => onRefresh()}
            />
          }
          contentContainerStyle={{
            paddingBottom: Metrics.screenWidth * (50 / 365),
          }}>
          <View style={styles.header}>
            <IconButton icon="bell" color={color.icon} />
            <View style={{alignItems: 'center'}}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />
              {/* <IconButton
                icon="account"
                buttonColor={color.primary}
                onPress={() => navigation.navigate('Login')}
              />
              <Caption
                style={{
                  fontSize: 10,
                  marginTop: -10,
                  color: color.textPrimary,
                }}>
                Login
              </Caption> */}
            </View>
          </View>
          <View style={{paddingHorizontal:Metrics.screenWidth * (20 / 365), marginTop:Metrics.screenWidth * (20 / 365), backgroundColor:color.light}}>
            <Card style={{backgroundColor:color.light, elevation:0}}>
              <Card.Cover source={require('../../images/foto-sekolah.jpeg')} />
              <Subheading style={{fontFamily: 'Poppins-Regular',padding:5}}>Profil Sekolah SMKN 1 Ampek Angkek</Subheading>
              <Card.Actions>
                <Button onPress={() => Linking.openURL('https://smkn1ampekangkek.id')} buttonColor={color.primary} labelStyle={{color:color.textWhite}} mode="contained" >Kunjungi Link</Button>
              </Card.Actions>
            </Card>
          </View>
          <Headline style={styles.Hello}>
            Welcome Guys, Lihatlah hasil karya dari siswa kami !{' '}
          </Headline>
          {/* <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:Dimensions.get('window').width}}> */}
          {/* <Searchbar
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            // clearIcon={() => {}}
          /> */}
          
        
      {!search ? (
        <>
        <Subheading style={styles.rekomended}>Jurusan</Subheading>
        <Subheading style={styles.rekomended}>Produk terbaru !</Subheading>
        </>
      ) : (
        <List.Section title="Hasil pencarian !">
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          // ListFooterComponent={footer}
          ListFooterComponent={
            <View style={{height: 200, backgroundColor: 'white'}}></View>
          }
        />
      </List.Section>
      )}
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
    marginTop: 20,
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
  logo:{
    width:Metrics.screenWidth * (50 / 365),
    height:Metrics.screenHeight * (20 / 365)
  }
});
