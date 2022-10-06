import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

// Constants 
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, textInputConfig }) => {
    const inputStyles = [styles.input];

    // If textInputConfig has multine line property for input then we add multiline styling to the input
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: GlobalStyles.colors.foreground,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.text,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    }
});