import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        values: {
            token: null,
            isAuthenticated: false,
            userEmail: null,
            userPassword: null,
            userId: null,
        }
    },
    reducers: {
       userLogin: (state, action) => {
            state.values = {
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
                userEmail: action.payload.userEmail,
                userPassword: action.payload.userPassword,
                userId: action.payload.userId,
            }
       },
       userLogout: (state, action) => {
            state.values = {
                token: null,
                isAuthenticated: false,
                userEmail: null,
                userPassword: null,
                userId: null,
            }
        }
    }
});

export const userLogin = userSlice.actions.userLogin;
export const userLogout = userSlice.actions.userLogin;

export default userSlice.reducer;