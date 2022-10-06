import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Constants
import { GlobalStyles } from '../../constants/styles';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.icon}/>
    </View>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.background,
    }
})