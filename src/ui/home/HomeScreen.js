import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { ORDER_TYPE, ShoppingCartContext } from '../../data/ShoppingCartContext';
import { getUsers, getSuppliers, getProducts, getProductsBySupplierId, getBranches } from '../../data/serviceApi';
import SuppliersPicker from '../components/SuppliersPicker';
import ProductsList from '../products_list/ProductsList';
import ProductItem from '../products_list/ProductItem';
import { Container, Picker, Switch } from 'native-base';

const HomeScreen = () => {
  const shoppingCart = useContext(ShoppingCartContext);

  const [suppliersList, setSuppliersList] = useState([])
  const [productsList, setProductsList] = useState([])
  const [selectedSupplierId, setSelectedSupplierId] = useState(0)

  useEffect(() => { //Constructor
    getSuppliers().then((sList) => {
      setSuppliersList(sList)
      getProductsBySupplierId(sList[selectedSupplierId].supplierId).then(setProductsList)
    })
  }, [])

  renderDropdownItems=()=>{
    return suppliersList.map((item, index) => <Picker.Item key={index} label={item.contactName} value={item.supplierId}/>)
  }

  onItemSelected=(supplierId)=>{
      setSelectedSupplierId(supplierId)
      getProductsBySupplierId(supplierId).then(setProductsList)
  }

  loadProducts=()=>{
      getProductsBySupplierId(selectedSupplierId).then(setProductsList)
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <SuppliersPicker
          style={styles.header}
          defultValue={selectedSupplierId}
          renderItems={renderDropdownItems()}
          onItemSelected={onItemSelected}
        />
      </View>
    )
  }

  renderContent = () => {
    return (
      <View style={styles.content}>
        <ProductsList
          data={productsList}
          renderItem={({item})=> ProductItem(item, onProductSelected, onQuantityChanged, shoppingCart.isProductExists(item))}
        />
      </View>
    )
  }

  onProductSelected = (item) => {
    console.log("onProductSelected: " + item.rawProductName)
    shoppingCart.addProduct(item)
  }

  onQuantityChanged = (item, quantity) => {
    console.log("onQuantityChanged: " + item.rawProductName + " --> " + quantity)
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: '10%',
    flexDirection: 'row-reverse',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  header: {
    height: '100%',
    color: 'black'
  },
  content: {
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});

export default HomeScreen;