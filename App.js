import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Screens
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ 
      headerStyle: {
        backgroundColor: GlobalStyles.colors.background,
      },
      headerTintColor: GlobalStyles.colors.text,
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.background,
      },
      tabBarActiveTintColor: GlobalStyles.colors.text,
      tabBarInactiveTintColor: GlobalStyles.colors.foreground
     }}>
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='ExpensesOverview' 
            component={ExpensesOverview} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name='ManageExpense' component={ManageExpense} />
        </Stack.Navigator>
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
});
