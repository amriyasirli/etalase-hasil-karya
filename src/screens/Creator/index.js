import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  Dimensions,
  FlatList,
  Alert,
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
  Menu,
  Divider,
  Provider,
  FAB,
} from 'react-native-paper';
import Metrics from '../../style/metrics';
import color from '../../style/colors';
import font from '../../style/font';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import dataEntry from '../../service/dataEntri';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../component/loading'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Creator = ({navigation}) => {
  const [creator, setCreator] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [msgNull, setMsgnull] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const empty = arr => (arr.length = 0);
  const onRefresh = () => {
    empty(creator);
    setIsLoading(true);
    setTimeout(() => {
      loadData();
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);
  

  const loadData = () => {
    firestore()
      .collection('Creator')
      .orderBy('nama', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setCreator(data => [...data, documentSnapshot.data()]);
          setIsLoading(false);
          console.log(creator);
          // setFilteredDataSource(masterDataSource);
          // setLoading(false)
        });
        if (creator.length > 0) {
          setIsLoading(false);
          setMsgnull(false);
        } else {
          setMsgnull(true);
          setIsLoading(false);
        }
      });
  };

  const hapus = id => {
    firestore()
      .collection('Creator')
      .doc(id)
      .delete()
      .then(() => {
        onRefresh()
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <List.Accordion
          // key={index}
          title={item.nama}
          titleStyle={styles.titleList}
          onPress={openMenu}
          left={() => (
            <List.Icon color={color.textSecondary} icon="account-check-outline" />
          )}
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
              color={color.danger}
              labelStyle={{color: color.danger, fontSize: 12}}
              icon="delete"
              mode="outlined"
              size={15}
              onPress={() => {
                Alert.alert(
                  'Hapus Data ',
                  'Yakin ingin menghapus ?',
                  [
                    {
                      text: 'Ya',
                      onPress: () => hapus(item.id),
                      
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                  {cancelable: true},
                );
              }}>
              Hapus
            </Button>

            <Button
              color={color.lightSuccess}
              labelStyle={{color: color.success, fontSize: 12}}
              icon="file-document-edit-outline"
              mode="outlined"
              onPress={() =>
                navigation.navigate('updateCreator', {
                  id: item.id,
                  // nama: item.nama,
                  // alamat: item.alamat,
                  // wa: item.wa,
                  // jurusan: item.jurusan,
                })
              }
              size={15}>
              Update
            </Button>
          </View>
        </List.Accordion>
      </>
    );
  };

  if (isLoading) return <Loading /> 
  return (
    <>
      <View>
        <View style={styles.container}>
          <IconButton
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            color={color.textWhite}
            style={{position: 'absolute', left: 10, top: height / 20}}
          />
          <Subheading style={styles.title}>List Creator</Subheading>
        </View>
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
                marginTop: height / 3,
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: color.primary,
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
              color="white"
              icon="refresh"
              onPress={() => {
                onRefresh();
              }}
            />
          </View>
        ) : (
          <List.Section style={{marginBottom: 20}}>
            <FlatList
              data={creator}
              keyExtractor={(creator, index) => index.toString()}
              renderItem={renderItem}
              ListFooterComponent={<View style={{height: 300}}></View>}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
            />
          </List.Section>
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color={color.textWhite}
        onPress={() => navigation.navigate('addCreator')}
      />
    </>
  );
};

export default Creator;

const styles = StyleSheet.create({
  container: {
    height: height / 6,
    backgroundColor: color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height / 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.textWhite,
    fontFamily: 'Poppins-SemiBold',
    fontSize: font.size.font16,
  },
  titleList: {
    fontFamily: 'Poppins-Regular',
    color: color.textSecondary,
  },
  fab: {
    position: 'absolute',
    backgroundColor: color.primary,
    margin: 40,
    right: 0,
    bottom: 0,
  },
});
