import React, { useState } from 'react';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './home/HomeScreen';
import HomeScreenBranch from './home/HomeScreenBranch';
import LoginScreen from './login/LoginScreen';
import ShoppingCartScreen from './shoppingCart/ShoppingCartScreen';
import DashboardScreen from './dashboard/DashboardScreen';
import ShoppingCartContextProvider from '../data/ShoppingCartContext';
import WelcomeScreen from './welcome/WelcomeScreen';
import { Alert } from 'react-native';
import ObboardingOne from './onboarding/OnboardingOne';
import ObboardingTwo from './onboarding/OnboardingTwo';
import ObboardingThree from './onboarding/OnboardingThree';
import TransfersScreen from './transfers/TransfersScreen';
import { cos } from 'react-native-reanimated';


const LOGIN_SCREEN = "Login"
const HOME_SCREEN = "ספקים"
const HOME_SCREEN_BRANCH = "סניפים"

const SHOPPING_CART = "עגלת ספקים"
const SHOPPING_CART_BRANCH = "עגלת סניפים"

const DASHBOARD = "תקציבים"
const WELCOME_SCREEN = "שלום"

const HOME_TABS = "tabs"  //TODO: pass user name

const ONBOARDING_ONE = "קניות"
const ONBOARDING_TWO = "הזמנות"
const ONBOARDING_THREE = "תקציבים"

const TRANSFERS_SCREEN = "העברות"

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigation = () => {
  // connected = AsyncStorage.getItem("isConnected", false)
  // const userName = AsyncStorage.getItem("userName", "")
  const [isConnected, setIsConnected] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ONBOARDING_ONE} component={ObboardingOne} options={{ headerShown: false }} />
        <Stack.Screen name={ONBOARDING_TWO} component={ObboardingTwo} options={{ headerShown: false }} />
        <Stack.Screen name={ONBOARDING_THREE} component={ObboardingThree} options={{ headerShown: false }} />
        <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} options={({ route }) => {
          return { headerTitle: route.params?.name, headerShown: true }
        }} />
        <Stack.Screen name={HOME_TABS}>
          {props => <HomeTabs {...props} />}
        </Stack.Screen>
        {/* <Stack.Screen name={HOME_TABS} component={({route})=> HomeTabs({params: route.params, selectedTab: route.params.selectedTab})} options={({route})=> {
            return { headerTitle: route.params?.name}}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeTabs = (props) => {
  const { params } = props.route
  return (
    <ShoppingCartContextProvider data={{ branchId: params.branchId }}>
      <Tabs.Navigator
        initialRouteName={params.selectedTab}
        screenOptions={({ route, navigation }) => {
          const routeName = route.name;
          return ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (routeName === HOME_SCREEN) {
                iconName = focused ? 'list' : 'list-outline';
              } else if (routeName === HOME_SCREEN_BRANCH) {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              }  else if (routeName === SHOPPING_CART) {
                iconName = focused ? 'cart' : 'cart-outline';
              }  else if (routeName === SHOPPING_CART_BRANCH) {
                iconName = focused ? 'clipboard' : 'clipboard-outline';
              }  else if (routeName === DASHBOARD) {
                iconName = focused ? 'cash' : 'cash-outline';
              }  else if (routeName === TRANSFERS_SCREEN) {
                iconName = focused ? 'git-pull-request' : 'git-pull-request-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })
        }}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tabs.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Tabs.Screen name={HOME_SCREEN_BRANCH} component={HomeScreenBranch} initialParams={{ ...params }} />
        <Tabs.Screen name={SHOPPING_CART} component={ShoppingCartScreen} initialParams={{ ...params }} />
        <Tabs.Screen name={SHOPPING_CART_BRANCH} component={ShoppingCartScreen} initialParams={{ ...params }} />
        <Tabs.Screen name={DASHBOARD} component={DashboardScreen} initialParams={{ ...params }} />
        <Tabs.Screen name={TRANSFERS_SCREEN} component={TransfersScreen} />

      </Tabs.Navigator>
    </ShoppingCartContextProvider>
  )
}

export default AppNavigation;
export { LOGIN_SCREEN, HOME_TABS, WELCOME_SCREEN, SHOPPING_CART, DASHBOARD, HOME_SCREEN, ONBOARDING_ONE, ONBOARDING_TWO, ONBOARDING_THREE }