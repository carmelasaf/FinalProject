import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ONBOARDING_THREE} from '../AppNavigation'


const ObboardingTwo=()=>{
    const navigation = useNavigation()
    
    const color = '#FFBB33'

    return (
        <View style={styles.container}  onTouchEnd={()=> navigation.navigate(ONBOARDING_THREE)}>
            <Text style={[styles.navigationItemText, {color: color}]}>רשימת קניות עם הלצות לכמות הזמנה</Text>
            <Ionicons name={'list-circle-outline'} size={200} color={color} />
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

export default ObboardingTwo

