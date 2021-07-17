
import React, {Component, useState} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, dialogState] = useState()
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
{/* loading screen */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>טוען... אנא המתן</Text>
          </View>
        </View>

{/* success screen */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>הפעולה התקבלה בהצלחה</Text>
            <Pressable
              style={[styles.button, styles.buttonCloseSuccess]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>סגור</Text>
            </Pressable>
          </View>
        </View>

{/* fail screen */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>הפעולה נדחתה</Text>
            <Pressable
              style={[styles.button, styles.buttonCloseLoadingFail]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>סגור</Text>
            </Pressable>
          </View>
        </View>
        
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCloseSuccess: {
    backgroundColor: "green",
  },
  buttonCloseLoadingFail: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;