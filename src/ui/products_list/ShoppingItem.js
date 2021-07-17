import React, { Component, useContext, useState } from 'react';
import { Text } from 'react-native'
import { View, Title, Card, CardItem, Left, Right, Thumbnail, Subtitle, Icon, Item, Button } from 'native-base';

class ShoppingItem extends Component{
    constructor(props){ //props = {index, item ,onQuantityChaged}
        super(props)
        console.log("index: " + props.index)
    }

    updateQuantity(newQuantity){
        if (newQuantity < 0) return
        this.props.onQuantityChanged(this.props.index, newQuantity)
    }

    
    render(){
        const { rawProductPicture, rawProductName, rawProductPrice, key, quantity, recommendedAmout = 20} = this.props.item
        const price = quantity * this.props.item.rawProductPrice
        return (
            <Card key={key}>
                <CardItem>
                    <Left>
                        <Thumbnail
                            source={{ uri: rawProductPicture }}
                            style={{ width: 80, height: 60, borderRadius: 10 }} />
                    </Left>
                    <Right style={{ width: '80%' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 20 }}>{rawProductName}</Text>
                        </View>
                    </Right>
                </CardItem>
                <CardItem style={{ alignSelf: 'flex-end' }}>
                    <Left>
                        <Text style={{ fontSize: 20 }}> {price} ₪</Text>
                    </Left>
                    <Left style={{padding: 5, borderColor: recommendedAmout === quantity ? 'green' : 'brown', borderWidth: 2, borderRadius: 20, justifyContent: 'center'}}>
                        <Text onPress={()=> this.updateQuantity(recommendedAmout)} style={{ fontSize: 15, textAlign: 'center' }}>{'כמות מומלצת\n'}{recommendedAmout}</Text>
                    </Left>
                    <Button transparent onPress={() => this.updateQuantity(quantity + 1)}>
                        <Icon type={"FontAwesome"} name='chevron-circle-up' />
                    </Button>
                    <Text>{quantity}</Text>
                    <Button transparent onPress={() => this.updateQuantity(quantity - 1)}>
                        <Icon type={"FontAwesome"} name='chevron-circle-down' />
                    </Button>
                </CardItem>
            </Card>
        )
    }
}

export default ShoppingItem