import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ONBOARDING_TWO} from '../AppNavigation'


const ObboardingOne=()=>{
    const navigation = useNavigation()
    
    const cartColor = '#33FFF3'

    return (
        <View style={styles.container}  onTouchEnd={()=> navigation.navigate(ONBOARDING_TWO)}>
            <Text style={[styles.navigationItemText, {color: cartColor}]}>הזמנה מהירה מהספקים הכי טובים שיש</Text>
            <Ionicons name={'cart-outline'} size={200} color={cartColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#000000'
    },
    navigationItemText: {
        fontSize: 50,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ObboardingOne
