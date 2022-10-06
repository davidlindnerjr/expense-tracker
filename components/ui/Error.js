import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Constants
import { GlobalStyles } from '../../constants/styles';

const Error = ({errorMessage, onConfirm}) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Oops! An error occured.</Text>
        <Text style={styles.text}>{errorMessage}</Text>
        <Button onConfirm={onConfirm}>Okay</Button>
    </View>
  )
}

export default Error;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.background,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white'
    },
    title: {
        fontWeight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})