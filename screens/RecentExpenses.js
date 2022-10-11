import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useSelector, useDispatch } from 'react-redux';

// util
import { getDateMinusDays } from '../util/date';
import { fetchExpensesHttp } from '../util/http';

// Redux 
import { setExpenses } from '../redux/expense_reducers';

// Components
import LoadingSpinner from '../components/ui/LoadingSpinner';

const RecentExpenses = () => {

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const getExpenses = useSelector((state) => state.expenses.values);
  const currUserId = useSelector((state) => state.user.values.userId);

  useEffect(() => {

    const fetchAllExpenses = async () => {
      setLoading(true);
      try {
        const expenses = await fetchExpensesHttp(currUserId);
        dispatch(setExpenses(expenses));
      } catch (err) {
        setErrorMessage(err);
      }
      setLoading(false);
    }
    fetchAllExpenses();
  }, [])

  const recentExpenses = getExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return new Date(expense.date) >= date7DaysAgo;
  })

  const errorHandler = () => {
    setErrorMessage(null);
  }

  // Fix error handling
  if(!loading && errorMessage) {
    return <Error message={errorMessage} onConfirm={errorHandler} /> 
  }

  return (
    <View>
      {loading ? <LoadingSpinner/> : 
          <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} fallbackText="No expenses registered within the last 7 days."/>  
      }
    </View>
  )
}

export default RecentExpenses