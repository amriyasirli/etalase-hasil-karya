import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {IconButton} from 'react-native-paper'
import color from '../style/colors'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const dataEmpty = (props) => {
    return (
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
              Tidak ada data !
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
              onPress={props.fresh}
            />
          </View>
    )
}

export default dataEmpty

const styles = StyleSheet.create({})
