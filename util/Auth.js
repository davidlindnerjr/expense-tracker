import axios from 'axios';
import { FIREBASE_AUTH_API } from '@env';

export const createUser = async (email, password) => {
    try {
        const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_AUTH_API}`,
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
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_AUTH_API}`,
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