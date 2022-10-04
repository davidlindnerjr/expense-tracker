import React from 'react';
import { View, Text, FlatList } from 'react-native';

// Components
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (data) => {
  return <ExpenseItem id={data.item.id} description={data.item.description} amount={data.item.amount} date={data.item.date}/>
}

const ExpensesList = ({ expenses }) => {
  return (
    <View>
        <FlatList showsVerticalScrollIndicator={false} data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}/>
    </View>
  )
}

export default ExpensesList