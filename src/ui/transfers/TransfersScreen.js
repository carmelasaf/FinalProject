import { Text, View } from "native-base"
import React, { useState, useEffect } from "react"
import { Alert, SectionList, StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { getAllTransfers, getBranches, editTransferBetweenBranches } from "../../data/serviceApi"
import TransferProductItem from "./TransferProductItem"


const TransfersScreen = ({route}) => {
    const [transfersList, setTransfersList] = useState([])
    const [sectionList, setSectionList] = useState([])

    let sectionColor;

    useEffect(() => {
        let newList = []
        getBranches().then((branches) => {
            getAllTransfers().then((transfers) => {
                for (let transfer of transfers) {
                    let branchName;
                    for (let branch of branches) {
                        if (transfer.branchIdFrom === branch.branchId) {
                            branchName = branch.branchName
                            break;
                        }
                    }

                    newList = [...newList, { title: branchName, transferId: transfer.transferId, data: transfer.rawproductsintransfers }]
                }
                setSectionList(newList)
            })
        })


    }, [])

    const showApprovalDialog = (transferId) => {
        console.log("WELL: " + JSON.stringify(route))
        console.log("THIS IS IT: " + transferId + "    " + route.params.branchId)
        Alert.alert(
            "שליחה לסניף",
            "האם אתה מאשר לשלוח לסניף המבקש את המוצרים שנדרשו?",
            [
                { text: "כן", onPress: () => {
                    
                    editTransferBetweenBranches(transferId, {transferStatus: 'מאושר', branchIdFrom: route.params.branchId})
                    .then((res)=> console.log("editTransferBetweenBranches Respose: " + JSON.stringify(res)))
                    .catch((e)=> console.log("editTransferBetweenBranches Error: " + error))
                }},
                { text: "לא", onPress: () => { } }
            ]
        );
    }

    const updateSectionColor = () => {
        sectionColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    const renderProductItem = (item) => {
        return <TransferProductItem item={item} color={sectionColor} />

    }

    const renderSection = (title, transferId) => {
        updateSectionColor()
        return <View style={[styles.section, { backgroundColor: sectionColor }]}>
            <TouchableOpacity style={styles.button} onPress={() => showApprovalDialog(transferId)}>
                <Text style={styles.sectionText}>אשר</Text>
            </TouchableOpacity>
            <Text style={styles.sectionText}>{title}</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={sectionList}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => renderProductItem(item)}
                renderSectionHeader={({ section: { title, transferId } }) => (
                    renderSection(title, transferId)
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        // backgroundColor: "#00FF00",
        padding: 10,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 3,
        borderBottomWidth: 1
    },
    sectionText: {
        fontSize: 30
    },
    button: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.black,
        paddingHorizontal: 20,
    },
    content: {
        backgroundColor: "#98FB98",
    },
    product: {
        fontSize: 20,
    }
});

export default TransfersScreen