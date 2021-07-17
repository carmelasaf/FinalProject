import React, { useState } from 'react';
import {Text} from 'react-native'
import {View,Title,Card,CardItem,Left,Right,Thumbnail,Subtitle, Icon, Item, Button} from 'native-base'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default ProductListItem=(item, onProductSelected, onQuantityChanged, isInCart = false)=>{
    const {rawProductPicture, rawProductName, rawProductPrice} = item
    quantityCard=()=>{
        return (
        <CardItem style={{alignSelf: 'flex-end'}}>
            <Button transparent onPress={()=> onQuantityChanged(rawProductName, quantity + 1)}>
                <Icon type={"FontAwesome"} name='chevron-circle-up'  />
            </Button>
            <Text>{quantity}</Text>
            <Button  transparent onPress={()=> onQuantityChanged(rawProductName, quantity - 1)}>
                <Icon type={"FontAwesome"} name='chevron-circle-down' />
            </Button>
     </CardItem>
        )
    }
        return(
             <Card key={item.key} style={{alignItems: "center"}}>
                 <CardItem button style={{backgroundColor: isInCart ? "#00FF00" : Colors.white}} onPress={()=> onProductSelected(item)}>
                     <Left>
                     <Thumbnail 
                         source={{uri: rawProductPicture}}
                         style={{width:80,height:60,borderRadius:10}}/>
                     </Left>
                     <Right style={{width: '80%'}}>
                     <View style={{alignItems: 'flex-start'}}>
                             <Text style={{fontSize: 20}}>{rawProductName}</Text>
                             <Subtitle style= {{color: 'black' }}>{rawProductPrice}</Subtitle>
                         </View>
                     </Right>
                 </CardItem>
             </Card>
        )
    }
