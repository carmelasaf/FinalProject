import React, {createContext, Component} from 'react';
import { Alert } from 'react-native';
import { getProductsSmartAlgo } from './serviceApi';

export const ShoppingCartContext = createContext();

export const ORDER_TYPE = {
  SUPPLIER: 1,
  BRACH: 2
}

class ShoppingCartContextProvider extends Component {
  branchId = 0

  constructor(props){
    super(props)
    this.branchId = props.data.branchId
    this.refreshSmartAlgo()
  }
  
  state = {
    list: [],
    branchList: [],
    orderType: ORDER_TYPE.SUPPLIER,
    smartAlgoList: []
  };

  refreshSmartAlgo=(force = false)=>{
    if (this.state.smartAlgoList.length == 0 && !force){
      getProductsSmartAlgo(this.branchId).then((list)=>{
        try {
          this.state.smartAlgoList = [...list]
        } catch(error){
          Alert.alert("Error fetching smartAlgo\n" + list )
        }
      })
    }
  }

  addProduct=(product)=>{
    console.log("addProduct: " + product)
    const currentList = this.state.list.copyWithin()
    //check if product not exists
    if (!this.isProductExists(product)){
      product.quantity = 1
      currentList.push(product)
      this.setState({list: currentList})
    }
  }

  removeProduct=(index)=>{
    console.log("removeProduct: " + index)
    const currentList = this.state.list.copyWithin()
    currentList.splice(index, 1)
    this.setState({list: currentList})
  }

  updateItemQuantity=(index, quantity)=>{
    console.log("updateItemQuantity: " + index + " " + quantity)
    const currentList = this.state.list
    currentList[index].quantity = quantity
    this.setState({list: currentList})
  }

  isProductExists=(product)=>{
    let isExists = false
    this.state.list.forEach((item)=> {
      if (product.rawProductName === item.rawProductName){
        //if product already exists, do not add to the list
        console.log("if product already exists, do not add to the list")
        isExists = true;
        return;
      }
    })

    return isExists;
  }

  getTotalCartPrice=()=>{
    let amount = 0
    this.state.list.forEach((item)=> {
      amount += item.quantity * item.rawProductPrice
    })
    return amount
  }

  clearShoppingCart=()=> {
    this.setState({list: []})
    this.refreshSmartAlgo(true)
  }

  isShoppingCartEmpty=()=> this.state.list.length == 0

  render() {
    return (
      <ShoppingCartContext.Provider
        value={{
          ...this.state,
          addProduct: this.addProduct,
          removeProduct: this.removeProduct,
          updateItemQuantity: this.updateItemQuantity,
          isProductExists: this.isProductExists,
          getTotalCartPrice: this.getTotalCartPrice,
          isShoppingCartEmpty: this.isShoppingCartEmpty,
          clearShoppingCart: this.clearShoppingCart,
        }}>
        {this.props.children}
      </ShoppingCartContext.Provider>
    );
  }
}

export default ShoppingCartContextProvider;
