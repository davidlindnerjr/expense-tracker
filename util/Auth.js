import axios from 'axios';

const API_KEY = 'AIzaSyBP_CNZjreGbL6z3JmLQfOCHu30Imgv6SU';

export const createUser = async (email, password) => {
    try {
        const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
        const token = res.data.idToken;
        const userId = res.data.localId;

        return [token, userId];
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (email, password) => {
    try {
        const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,

            }
        );
        const token = res.data.idToken;
        const userId = res.data.localId;

        return [token, userId];
    } catch (err) {
        console.log(err);
    }
}