import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import uuid  from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../redux/expense_reducers';

// Components
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({ route, navigation }) => {

  const editExpenseId = route.params?.expenseId;
  const dispatch = useDispatch();
  const getExpenses = useSelector((state) => state.expenses.values);
  const selectedExpense = getExpenses.find(expense => expense.id === editExpenseId);

  // Converts to boolean
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, []);

  const deleteExpenseHandler = () => {
    dispatch(removeExpense(editExpenseId));
    console.log(`successfully deleted item: ${editExpenseId}`);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = (expenseData) => {
    if(isEditing) {
      dispatch(updateExpense({
        id: editExpenseId,
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
      }))
      console.log('Updated expense')
    } else {
      const newExpenseId = uuid.v4();
      dispatch(addExpense({
        id: newExpenseId, 
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
      }));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler} 
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton icon='trash' color={GlobalStyles.colors.error} size={36} onPress={deleteExpenseHandler}/>
          </View>
        )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 24,
    backgroundColor: GlobalStyles.colors.background
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.foreground,      
    alignItems: 'center',            
  },
});