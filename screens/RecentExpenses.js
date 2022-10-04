import React from 'react';
import { View } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useSelector } from 'react-redux';

// util
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {

  const getExpenses = useSelector((state) => state.expenses.values);

  const recentExpenses = getExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return new Date(expense.date) >= date7DaysAgo;
  })
  return (
    <View>
       <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} fallbackText="No expenses registered within the last 7 days."/>
    </View>
  )
}

export default RecentExpenses