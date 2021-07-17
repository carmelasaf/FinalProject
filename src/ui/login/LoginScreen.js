import React, { Component, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Icon,
  Switch,
} from 'native-base';
import { Alert, StyleSheet, Button, View, Image, CheckBox } from 'react-native';
import { loginWithEmailAndPassword } from '../../data/userValidator';
import { HOME_TABS, WELCOME_SCREEN } from '../AppNavigation';
import { getBranches } from '../../data/serviceApi';

export default LoginScreen = () => {
  const navigation = useNavigation()

  const STORAGE_IS_USER_CONNECTED = "isConnected"

  //class states
  const [email, setEmail] = useState("rb1@gmail.com")
  const [password, setPassword] = useState("rbmanager1")
  const [hidePassword, setHidePassword] = useState(true)
  const [isSelected, setIsSelected] = useState(false); 
  const [rememberMe, setRememberMe] = useState(true); 

  // useEffect(async()=>{
  //   const username = await this.getRememberedUser();
  //     console.log("XXX " + username)

  // })

  const createErrorAlert = () =>
    Alert.alert(
      "Wrong input",
      "Check Email an Password",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const forgotPassAlert = () =>
    Alert.alert(
      "פנה אל המטה",
      "This is a test"
      [
      { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const rememberUser = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_IS_USER_CONNECTED, this.state.username);
      console.log("XXXX -> remember " + this.state.username)
    } catch (error) {
      // Error saving data
    }
  };

  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem(STORAGE_IS_USER_CONNECTED);
      if (username !== null) {
        // We have username!!
        return username;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_IS_USER_CONNECTED);
    } catch (error) {
      // Error removing
    }
  };

  const onLoginPressed = async () => {
    loginWithEmailAndPassword(email, password)
    .then((user)=> {
      console.log("loginSuccess: " + JSON.stringify(user));
      if (rememberMe){
        rememberUser()
      }

      getBranches()
      .then((branchesResponse)=> {
       for (const index in branchesResponse){
          const {branchName, managerName, userId, badge, branchId} = branchesResponse[index]
            if (userId === user.userId){
              navigation.navigate(WELCOME_SCREEN, {
                name: branchName, 
                budget: badge, 
                managerName: managerName, 
                email: user.userEmail, 
                branchId: branchId})
            }
        }
      })
      .catch((error)=> console.log("getBranches Error: " + error))

    })
    .catch((error)=> {
      console.log("login error: " + error);
      createErrorAlert()
    })
  }

  return (
    <Container style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/l2HDwom.jpg' }} style={styles.tinyLogo} />
      <Form>
        <FormItem floatingLabel style={styles.FormItem}>
          <Label style={styles.label}>אימייל</Label>
          <Input style={styles.input} onChangeText={setEmail} value={email}/>
        </FormItem>
        <FormItem floatingLabel style={styles.FormItem} last>
          <Label style={styles.label}>סיסמה</Label>
          <Input style={styles.input} onChangeText={setPassword} secureTextEntry={hidePassword} value={password}/>
          <Icon name={'eye'} onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIcon} />

        </FormItem>
        <View style={styles.button}>
          <Button onPress={onLoginPressed} title="התחבר למערכת" />
        </View>
      </Form>
      <View>
        <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            />
        <View style={addItemStyles.wrapper}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0 }}>
                <Text style={{ justifyContent: 'flex-start', }} >זכור אותי</Text>
              </View>
              <View style={{ flex: 9 }}>
                {/* <Text style={{justifyContent: 'flex-end',}}              */}
                <CheckBox title='Click Here' style={{ justifyContent: 'flex-end' }} value={isSelected}
                  onValueChange={setIsSelected} />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={{ justifyContent: 'flex-start', }} onPress={forgotPassAlert} >שכחתי סיסמה</Text>
              </View>
            </View>
          </View>
          {/* <Button onPress={forgotPassAlert} title="שכחתי סיסמה" style={{backgroundColor:'transparent'}}></Button> */}
        </View>

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#FFFFFF',
  },
  label: {
    color: 'black',
    fontSize: 15,
  },
  FormItem: {
    marginVertical: 20,
    paddingVertical: 20
  },
  button: {
    alignItems: 'center',
    paddingBottom: 4,
    marginTop: 10,
    color: '#F0F8FF',
    width: '40%',
    alignSelf: 'center',
  },
  input: {
    borderColor: '#F0F8FF',
    height: 40,
    // margin: 20,
    borderWidth: 3,
  },
  eyeIcon: {
    marginLeft: -30,
    marginTop: 11,
    padding: 10
  },
  tinyLogo: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  }
});

const addItemStyles = StyleSheet.create({
  wrapper: {
    padding: 10,
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
});