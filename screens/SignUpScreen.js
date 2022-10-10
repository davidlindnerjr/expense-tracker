import React, { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

// Auth
import { createUser } from '../util/Auth';

// Components
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Redux
import { userLogin } from '../redux/user_reducer';

const SignUpScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const signupHandler = async ({ email, password }) => {
        try {
            setLoading(true);
            const [token, userId] = await createUser(email, password);
            dispatch(userLogin({
                token: token, 
                isAuthenticated: true, 
                userEmail: email, 
                userPassword: password,
                userId: userId
            }));
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            Alert.alert('Authentication failed', ' Please check your credentials or try again later.');
        }
    }
  return(
      <>
        {loading ? <LoadingSpinner /> : <AuthContent onAuthenticate={signupHandler} />}
    </>
    );
}

export default SignUpScreen;