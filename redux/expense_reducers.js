import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        values: []
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
        },
        setExpenses: (state, action) => {
          const invertOrder = action.payload.reverse();
          state.values = invertOrder;
        }
    }
});

export const addExpense = expenseSlice.actions.addExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export const setExpenses = expenseSlice.actions.setExpenses;

export default expenseSlice.reducer;