import React, { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

// Auth
import { loginUser } from '../util/Auth';

// Redux
import { userLogin } from '../redux/user_reducer';

// Components
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Constants
import { GlobalStyles } from '../constants/styles';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const loginHandler = async ({ email, password }) => {
        try {
            setLoading(true);
            const [token, userId] = await loginUser(email, password);

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
            <View style={styles.container}>
                <Text style={styles.title}>SPENT-IT</Text>
            </View>
            {loading ? <LoadingSpinner /> : <AuthContent isLogin onAuthenticate={loginHandler} />}
        </>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: GlobalStyles.colors.text,
        fontWeight: 'bold'
    }
})