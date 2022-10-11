import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import {  Provider, useDispatch, useSelector } from 'react-redux';

// Redux
import { userLogout } from './redux/user_reducer';

// State
import { store } from './redux/expense_store'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Screens
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

// Components
import IconButton from './components/ui/IconButton';

const ExpensesOverview = () => {
  const dispatch = useDispatch();
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({ 
      headerStyle: {
        backgroundColor: GlobalStyles.colors.background,
      },
      headerTintColor: GlobalStyles.colors.text,
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.background,
      },
      tabBarActiveTintColor: GlobalStyles.colors.text,
      tabBarInactiveTintColor: GlobalStyles.colors.foreground,
      headerRight: ({ tintColor }) => {
        return <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate('ManageExpense')}}/>
      }, headerLeft: ({ tintColor }) => {
        return <IconButton icon="log-out-outline" size={24} color={tintColor} onPress={()=>{ 
          dispatch(userLogout({
            token: null, 
            isAuthenticated: false, 
            userEmail: null, 
            userPassword: null,
          })); 
        }}/>
      }
    })}>
      <BottomTabs.Screen 
        name='RecentExpenses' 
        component={RecentExpenses} 
        options={{
           title: 'Recent Expenses',
           tabBarLabel: 'Recent',
           tabBarIcon: ({color, size}) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          style: styles.removeBorder,
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => <Ionicons name='calendar' size={size} color={color} />
       }} 
      />
    </BottomTabs.Navigator>
  );
}

const AuthStack = () => {
    return <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.background },
          headerTintColor: GlobalStyles.colors.text,
          contentStyle: { backgroundColor: GlobalStyles.colors.background },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
}

const AuthenticatedStack = () => {
  return <Stack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: GlobalStyles.colors.background,
  },
    headerTintColor: 'white'
  }}>
    <Stack.Screen 
      name='ExpensesOverview' 
      component={ExpensesOverview} 
      options={{ headerShown: false, style: styles.removeBorder}}
    />
    <Stack.Screen name='ManageExpense' component={ManageExpense}  options={{
      presentation: 'modal'
    }}/>
  </Stack.Navigator>
}

const Navigation = () => {
  const userAuth = useSelector(((state) => state.user.values.isAuthenticated));

  return (
    <>
    {!userAuth && <AuthStack />}
    {userAuth && <AuthenticatedStack />}
   </>
  );
}

const App = () => {
  
  return (
   <>
    <StatusBar barStyle="light-content" />
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
   </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBorder: {
    backgroundColor: GlobalStyles.colors.background,
    borderTopWidth: 0,
  }
});
