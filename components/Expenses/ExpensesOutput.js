import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import ExpensesSummary  from './ExpensesSummary';
import ExpensesList from './ExpensesList';

// Constants
import { GlobalStyles } from '../../constants/styles';


const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if(expenses.length > 0) {
      content = <ExpensesList expenses={expenses} />
    }

    return (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        { content }
      </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.background,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  }
});