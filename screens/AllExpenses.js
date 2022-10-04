import React from 'react';
import { View, Text } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput.js';
import { useSelector } from 'react-redux';


const AllExpenses = () => {

  const getExpenses = useSelector((state) => state.expenses.values);

  return (
    <View>
        <ExpensesOutput expensesPeriod="Total" expenses={getExpenses} fallbackText="No expenses registered."/>
    </View>
  )
}

export default AllExpenses