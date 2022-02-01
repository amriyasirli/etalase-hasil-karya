import React from 'react'
import { StyleSheet, View } from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import COLORS from '../style/colors'

const loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={COLORS.primary} />
        </View>
    )
}

export default loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
