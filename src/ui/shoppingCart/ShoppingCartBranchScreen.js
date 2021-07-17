import { Container, Left, Button, Spinner } from 'native-base';
import React, { useContext, useState } from 'react'
import {View, Text, Alert} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddOrderRequestModel } from '../../data/addOrderRequestModel';
import { addOrder } from '../../data/serviceApi';
import { ShoppingCartContext } from '../../data/ShoppingCartContext';
import ShoppingItem from '../products_list/ShoppingItem';

const ShoppingCartBranchScreen = ({route}) => {
    const shoppingCart = useContext(ShoppingCartContext);
    const [isOrderInProgress, setIsOrderInProgress] = useState(false)

    onQuantityChanged = (index ,quantity) => {
        if (quantity === 0){
            shoppingCart.removeProduct(index)
        } else {
            shoppingCart.updateItemQuantity(index, quantity)
        }
    }

    onBuyButtonClicked=async()=>{
        //show loading
        setIsOrderInProgress(true)
        //create request body
        const today = new Date().now()

        //TODO: AddBranchOrder
        // const addBranchOrder = {
        //   id: "",

        // }

        //send api request
        const orderResponse = await addOrder(mockRequest)
        console.log("XXX -> " + JSON.stringify(orderResponse))

          if (typeof orderResponse == "string"){
            createOrderResponseAlert(orderResponse)
          } else {
            const {_errorMessage, _propertyName} = orderResponse.EntityValidationErrors[0]._validationErrors[0]
            createOrderResponseAlert(_propertyName + '\n' + _errorMessage)
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
                renderItem={({item, index})=> <ShoppingItem index={index} item={item} onQuantityChanged={onQuantityChanged}/>}
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

export default ShoppingCartBranchScreen


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