import axios from 'axios';
import { FIREBASE_REALTIME_API } from '@env';


export const storeExpenseHttp = async (expenseData) =>  {
    const response = await axios.post(`${FIREBASE_REALTIME_API}/expenses.json`, expenseData);
    // holds the id
    const id = response.data.name;
    return id;
}

export const fetchExpensesHttp = async (userId) => {
    try {
        const response = await axios.get(`${FIREBASE_REALTIME_API}/expenses.json?auth`);
        const expenses = [];
        const currUserExpenses = [];

        for(let key in response.data) {
            const expenseObj = {
                userId: response.data[key].userId,
                id: key,
                amount: response.data[key].amount,
                date: response.data[key].date,
                description: response.data[key].description
            }

            expenses.push(expenseObj);
        }
        for(let ex in expenses) {
            if(expenses[ex].userId === userId) {
                currUserExpenses.push(expenses[ex]);
            }
        }

        return currUserExpenses;
    } catch (err) {
        console.log(err);
    }
}

export const updateExpenseHttp = (id, expenseData) => {
    return axios.put(
        `${FIREBASE_REALTIME_API}/expenses/${id}.json`,
        expenseData
    );
}

export const deleteExpenseHttp = (id) => {
    return axios.delete(
        `${FIREBASE_REALTIME_API}/expenses/${id}.json`
    );
}