import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {
  Card,
  Searchbar,
  IconButton,
  Caption,
  List,
  Avatar,
} from 'react-native-paper';
import {Row, Col} from 'react-native-responsive-grid-system';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import Loading from '../../component/loading';
import Empty from '../../component/dataEmpty';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const FilterKatalog = ({route, navigation}) => {
  const {value} = route.params; // jurusan
  const [searchQuery, setSearchQuery] = useState('');
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msgNull, setMsgnull] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const empty = arr => (arr.length = 0);
  const onRefresh = () => {
    setProduk([]);
    setIsLoading(true);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // await setSearch(value)
    // await searchFilterFunction(value)
    
    firestore()
      .collection('Produk')
      .where('jurusan', '==', value)
    //   .orderBy('tanggal', 'desc')
      .get()
      .then(querySnapshot => {
        const size = querySnapshot.size;
        if (size == 0) {
          setMsgnull(true);
          setIsLoading(false);
        }else{
          querySnapshot.forEach(documentSnapshot => {
            setProduk(data => [...data, documentSnapshot.data()]);
            console.log(produk)
            setFilteredDataSource(produk);
            setIsLoading(false);
          });
        }


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

  const onChangeSearch = query => setSearchQuery(query);
  const renderItem = ({item, index}) => {
    if (isLoading) return <Loading />;
    return (
      <Card style={styles.items}>
        <Card.Cover source={{uri: item.uri}} style={{height: 156}} />
        <IconButton
          onPress={() => {}}
          icon="heart-outline"
          iconColor={color.primary}
          style={styles.iconHeart}
        />
        <Caption style={styles.produkName}>{item.namaProduk}</Caption>
        <View style={styles.containerPrice}>
          <Caption style={styles.price}>{item.jurusan}</Caption>
          <IconButton
            icon="chevron-right"
            size={20}
            iconColor={color.primary}
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
  if (isLoading) return <Loading />;
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        style={styles.searchBar}
        selectionColor={color.textPrimary}
        inputStyle={{fontSize: 14, fontFamily: 'Poppins-Regular'}}
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
              color: color.primary,
            }}>
            Produk tidak ditemukan !
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
      ) : (
        <>
          {!search ? (
          <FlatList
            data={produk}
            keyExtractor={(produk, index) => index.toString()}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 10}}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => onRefresh()}
              />
            }
            ListFooterComponent={() => {
              return <View style={{height: 100}}></View>;
            }}
          />
          ):(
          <List.Section title="Hasil pencarian !">
            <FlatList
            data={filteredDataSource}
            keyExtractor={(produk, index) => index.toString()}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 10}}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => onRefresh()}
              />
            }
            ListFooterComponent={() => {
              return <View style={{height: 100}}></View>;
            }}
          />
        </List.Section>
          )}
        </>
      )}
    </>
  );
};

export default FilterKatalog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexWrap: 'wrap',
    width: '100%',
  },
  items: {
    width: Metrics.screenWidth / 2 - 30,
    // height:Metrics.screenHeight/4,
    margin: 10,
    // backgroundColor: 'transparant',
    elevation:2,
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
