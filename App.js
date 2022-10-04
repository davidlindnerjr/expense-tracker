import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import {  Provider } from 'react-redux';

// State
import { store } from './redux/expense_store'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Screens
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

// Components
import IconButton from './components/ui/IconButton';

const ExpensesOverview = () => {
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

const App = () => {
  return (
   <>
    <StatusBar barStyle="light-content" />
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
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
      </NavigationContainer>
      </Provider>
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
