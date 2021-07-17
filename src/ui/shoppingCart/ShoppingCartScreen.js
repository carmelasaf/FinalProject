import { Container, Left, Button, Spinner } from 'native-base';
import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Alert} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddOrderRequestModel } from '../../data/addOrderRequestModel';
import { addOrder } from '../../data/serviceApi';
import { ShoppingCartContext, clearShoppingCart } from '../../data/ShoppingCartContext';
import ShoppingItem from '../products_list/ShoppingItem';

const ShoppingCartScreen = ({route}) => {
    const shoppingCart = useContext(ShoppingCartContext);
    const [isOrderInProgress, setIsOrderInProgress] = useState(false)

    onQuantityChanged=(index ,quantity) => {
        if (quantity === 0){
            shoppingCart.removeProduct(index)
        } else {
            shoppingCart.updateItemQuantity(index, quantity)
        }
    }

    const getProductRecommended=(productId)=>{
      const productsSmartAlgo = shoppingCart.smartAlgoList
      for (var index in productsSmartAlgo){
        const productAlgo = productsSmartAlgo[index]
        if (productAlgo.Material === productId){
          return productAlgo.RecommendedQuant
        }
      }
      return "unknown"
    }

    onBuyButtonClicked=async()=>{
      console.log("PARAMS : " + JSON.stringify(route))
        //show loading
        setIsOrderInProgress(true)

        const today = new Date()
        const shipping = new Date()
        shipping.setDate(today.getDate() + 7)

        //create request body
        const addOrderRequestModel = new AddOrderRequestModel()
        addOrderRequestModel.branchId = route.params.branchId
        addOrderRequestModel.orderDate = today.toISOString()
        addOrderRequestModel.shippingDate = shipping.toISOString()
        addOrderRequestModel.rawproductsinorders = [...shoppingCart.list]
        for (let product of addOrderRequestModel.rawproductsinorders){
          product.orderAmount = product.quantity
        }

        //send api request
        const orderResponse = await addOrder(addOrderRequestModel)
          if (typeof orderResponse == "string"){
            createOrderResponseAlert(orderResponse)
            shoppingCart.clearShoppingCart()
          } else {
            const {Message} = orderResponse
            createOrderResponseAlert(Message)
            console.log("orderResponse Error: " + JSON.stringify(orderResponse))
          }
        setIsOrderInProgress(false)
    }

    const createOrderResponseAlert = (message) =>
    Alert.alert(
      "סטטוס הזמנה",
       message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <View style={{alignItems: 'center'}}>
            <ProductsList
                style={{height: '90%'}}
                data={shoppingCart.list}
                renderItem={({item, index})=> {
                  item.recommendedAmout = getProductRecommended(item.rawproductId).toString().split(".")[0]
                  return <ShoppingItem index={index} 
                      item={item} 
                      onQuantityChanged={onQuantityChanged} />
                  }
                    }
            />
            <View style={{
                backgroundColor: Colors.white, 
                width: '100%', 
                height: '10%', 
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flexDirection: 'row'
                }}>
                <Text style={{fontSize: 40, alignSelf: 'center'}}>{shoppingCart.getTotalCartPrice()}₪</Text>
                <Button rounded onPress={onBuyButtonClicked}
                 style={{paddingHorizontal: 10, alignSelf: 'center'}} disabled={shoppingCart.isShoppingCartEmpty()}>
                    {isOrderInProgress ? <Spinner/> : <Text>בצע הזמנה</Text>} 
                </Button>
            </View>
        </View>
    )
}

export default ShoppingCartScreen


const mockRequest = {
    "orderId": 1,
    "branchId": 2,
    "branchName": "sample string 3",
    "orderDate": "2021-05-03T14:20:58.6508846+03:00",
    "shippingDate": "2021-05-04T14:20:58.6508846+03:00",
    "status": "sample string 6",
    "totalPrice": 7.0,
    "rawproductsinorder": [
      {
        "orderId": 1,
        "contactName": "sample string 2",
        "rawproductId": 3,
        "rawProductName": "sample string 4",
        "rawProductPicture": "sample string 5",
        "orderAmount": 6,
        "weightName": "sample string 7",
        "orderPrice": 8.0
      },
      {
        "orderId": 1,
        "contactName": "sample string 2",
        "rawproductId": 3,
        "rawProductName": "sample string 4",
        "rawProductPicture": "sample string 5",
        "orderAmount": 6,
        "weightName": "sample string 7",
        "orderPrice": 8.0
      }
    ]
  }