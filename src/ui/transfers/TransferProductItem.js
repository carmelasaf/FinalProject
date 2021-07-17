import React, { useState } from 'react';
import { Text } from 'react-native'
import { View, Title, Card, CardItem, Left, Right, Thumbnail, Subtitle, Icon, Item, Button } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const TransferProductItem = ({ item, color }) => {
    const { rawProductPicture, rawProductName, transferAmount } = item

    return (
        <CardItem style={{ height: 60, alignItems: "center", backgroundColor: color, borderRadius: 0}}>
            <Left>
                <Thumbnail
                    source={{ uri: rawProductPicture }}
                    style={{ width: 50, height: 50, borderRadius: 10 }} />
            </Left>
            <Right style={{ width: '80%' }}>
                <View style={{ alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 15, width: "100%", height: "50%" }}>{rawProductName}</Text>
                    <Subtitle style={{ color: Colors.black, alignSelf: 'flex-end' }}>כמות: {transferAmount}</Subtitle>
                </View>
            </Right>
        </CardItem>

    )
}

export default TransferProductItem