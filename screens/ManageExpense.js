import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import uuid  from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../redux/expense_reducers';

// Components
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';

const ManageExpense = ({ route, navigation }) => {

  const editExpenseId = route.params?.expenseId;
  const dispatch = useDispatch();

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
  const getNewDate = () => {
    let date = (new Date()).toISOString();
    return date;
  }

  const confirmHandler = () => {
    if(isEditing) {
      dispatch(updateExpense({
        id: editExpenseId,
        description: 'Brand new description!',
        amount: 56.90,
        date: getNewDate(),
      }))
      console.log('Updated expense')
    } else {
      const newExpenseId = uuid.v4();
      dispatch(addExpense({
        id: newExpenseId, 
        description: 'Another Test!', 
        amount: 100.00, 
        date: getNewDate(),
      }));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.foreground,      
    alignItems: 'center',            
  }
});