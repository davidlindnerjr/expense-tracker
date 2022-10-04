import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        values: [
            {
              id: uuid.v4(),
              description: 'Shoes',
              amount: 59.99,
              date: '2022-10-03T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Bananas',
              amount: 579.99,
              date: '2022-08-26T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Flour',
              amount: 9.99,
              date: '2022-05-09T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Shoes',
              amount: 59.99,
              date: '2022-10-03T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Bananas',
              amount: 579.99,
              date: '2022-08-26T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Flour',
              amount: 9.99,
              date: '2022-05-09T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Shoes',
              amount: 59.99,
              date: '2022-10-03T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Bananas',
              amount: 579.99,
              date: '2022-08-26T00:00:00.000Z',
            },
            {
              id: uuid.v4(),
              description: 'Flour',
              amount: 9.99,
              date: '2022-05-09T00:00:00.000Z',
            },
            {
                id: uuid.v4(),
                description: 'Coffee',
                amount: 1.99,
                date: '2022-10-04T00:00:00.000Z',
              }
          ]
    },
    reducers: {
        addExpense: (state, action) => {
            state.values.push(action.payload);  
        },
        removeExpense: (state, action) => {
            state.values.splice(state.values.indexOf(action.payload.id), 1);
        },
        updateExpense: (state, action) => {
            state.values.forEach((expense) => {
                if(expense.id === action.payload.id) {
                    expense.description = action.payload.description;
                    expense.amount = action.payload.amount;
                    expense.date = action.payload.date;
                }
            })
        }
    }
});

export const addExpense = expenseSlice.actions.addExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export const updateExpense = expenseSlice.actions.updateExpense;

export default expenseSlice.reducer;