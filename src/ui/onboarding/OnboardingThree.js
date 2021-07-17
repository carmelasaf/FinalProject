import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LOGIN_SCREEN} from '../AppNavigation'


const ObboardingThree=()=>{
    const navigation = useNavigation()
    
    const color = '#AC33FF'

    return (
        <View style={styles.container}  onTouchEnd={()=> navigation.navigate(LOGIN_SCREEN)}>
            <Text style={[styles.navigationItemText, {color: color}]}>מערכת חישוב תקציבים והמלצות רווח עתידיות</Text>
            <Ionicons name={'calculator-outline'} size={200} color={color} />
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

export default ObboardingThree

