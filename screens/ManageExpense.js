import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../redux/expense_reducers';

// Components
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// UTIL
import { storeExpenseHttp, updateExpenseHttp, deleteExpenseHttp } from '../util/http';

const ManageExpense = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const deleteExpenseHandler = async () => {
    setLoading(true);

    dispatch(removeExpense(editExpenseId));
    try {
      await deleteExpenseHttp(editExpenseId);
    } catch (err) {
      setErrorMessage(err);
    }

    console.log(`successfully deleted item: ${editExpenseId}`);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData) => {
    setLoading(true);
    if(isEditing) {
      dispatch(updateExpense({
        id: editExpenseId,
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
      }))
      try {
        await updateExpenseHttp(editExpenseId, expenseData);
      } catch(err) {
        setErrorMessage(err);
      }

      console.log('Updated expense')
    } else {
      setLoading(true);
      // Store in Firebase database
      try {
        const firebaseId = await storeExpenseHttp(expenseData);
        // Store in Redux State
        dispatch(addExpense({
          id: firebaseId,
          description: expenseData.description,
          amount: expenseData.amount,
          date: expenseData.date,
        }));
      } catch (err) {
        setErrorMessage(err);
      }

      console.log('Added expense')
    }
    navigation.goBack();
  }

  const errorHandler = () => {
    setErrorMessage(null);
  }

  // Fix error handling
  if(!loading && errorMessage) {
    return <Error message={errorMessage} onConfirm={errorHandler} /> 
  }

  return (
    <View style={styles.container}>
      {loading ? <LoadingSpinner /> :
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler} 
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      }
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