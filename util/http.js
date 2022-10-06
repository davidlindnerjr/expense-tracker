import axios from 'axios';

const URL = 'https://expense-tracker-ddebb-default-rtdb.firebaseio.com';

export const storeExpenseHttp = async (expenseData) =>  {
    const response = await axios.post(`${URL}/expenses.json`, expenseData);
    // holds the id
    const id = response.data.name;
    return id;
}

export const fetchExpensesHttp = async () => {
    try {
        const response = await axios.get(`${URL}/expenses.json`);

        const expenses = [];

        for(let key in response.data) {
            const expenseObj = {
                id: key,
                amount: response.data[key].amount,
                date: response.data[key].date,
                description: response.data[key].description
            }

            expenses.push(expenseObj);
        }

        return expenses;
    } catch (err) {
        console.log(err);
    }
}

export const updateExpenseHttp = (id, expenseData) => {
    return axios.put(
        `${URL}/expenses/${id}.json`,
        expenseData
    );
}

export const deleteExpenseHttp = (id) => {
    return axios.delete(
        `${URL}/expenses/${id}.json`
    );
}