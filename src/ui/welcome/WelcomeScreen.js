import React, { Component, useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { HOME_TABS, SHOPPING_CART, HOME_SCREEN, DASHBOARD } from '../AppNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default WelcomeScreen=({route})=>{
  const navigation = useNavigation()

    const cartColor = '#33FFF3'
    const listColor = '#FFBB33'
    const dashboardColor = '#AC33FF'


    // {selectedTab: screenName}
    const onItemClicked=(screenName)=>{
        route.params.selectedTab = screenName
        console.log("WELCOME SCREEN ROUTE: " + JSON.stringify(route.params))
        navigation.navigate(HOME_TABS, {...route.params} )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>שלום {route.params?.managerName}</Text>
            <View style={styles.navigation}>
                <TouchableOpacity onPress={()=> onItemClicked(SHOPPING_CART)}>
                    <View style={[styles.navigationItem, {borderColor: cartColor}]}>
                        <Text style={[styles.navigationItemText, {color: cartColor}]}>עגלה</Text>
                        <Ionicons name={'cart-outline'} size={80} color={cartColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onItemClicked(HOME_SCREEN)}>
                <View style={[styles.navigationItem, {borderColor: listColor}]}>
                    <Text style={[styles.navigationItemText, {color: listColor}]}>רשימת מוצרים</Text>
                    <Ionicons name={'list-circle'} size={80} color={listColor} />
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onItemClicked(DASHBOARD)}>
                 <View style={[styles.navigationItem, {borderColor: dashboardColor}]}>
                        <Text style={[styles.navigationItemText, {color: dashboardColor}]}>תקציבים</Text>
                        <Ionicons name={'calculator-outline'} size={80} color={dashboardColor} />
                </View>
              </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    text:{
        fontSize: 30,
        color: "#000000",
        fontSize: 40
    },
    navigation: {
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-evenly',
    },
    navigationItem: {
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        padding: 5
    },
    navigationItemText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    }
})