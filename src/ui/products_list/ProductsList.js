
import React, { useState } from 'react';
import ProductItem from "./ProductItem"
import { FlatList, StyleSheet } from 'react-native';

export default ProductsList=({data, renderItem, style})=>{
    return <FlatList 
        style={[styles.list, style]}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />

    
}

const styles = StyleSheet.create({
    list: {
      width: '90%'
    },
  });