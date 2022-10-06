import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

// Constants
import { GlobalStyles } from '../../constants/styles';

// Components
import Input from './Input';
import Button from '../ui/Button';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {

    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.slice(0,10) : '',
        description: defaultValues ? defaultValues.description : ''
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currentInputValues) => {
            return {...currentInputValues,
                [inputIdentifier]: enteredValue
            };
        });
    }

    const getFormattedDate = (data) => {
        let date = (new Date(data)).toISOString();
        return date;
      }

    const submitHandler = () => {

        // Amount is valis if a number & greater than 0
        const amountIsValid = !isNaN(inputValues.amount) && inputValues.amount > 0;
        // Date is valid if date string is not equal to 'Invalid Date'
        const dateIsValid = inputValues.date.length != 10;
        // Description is valid if length of string is greater than 0
        const descriptionIsValid = inputValues.description.trim().length > 0;

        if(!amountIsValid || dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        } else {
            const expenseData = {
                amount: +inputValues.amount,
                date: getFormattedDate(inputValues.date),
                description: inputValues.description,
            };
    
            onSubmit(expenseData);
        }
    }

    return (
        <>
            <View style={styles.form}>
                <View style={styles.inputsRow}>
                    <Input label='Amount' style={styles.rowInput}  textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount

                    }}/>
                    <Input label='Date' style={styles.rowInput} textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        placeholderTextColor: GlobalStyles.colors.icon,
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date,
                    }}/>
                </View>
                <Input label='Description' textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValues.description,
                }}/>
                <View style={styles.buttons}>
                    <Button mode='flat' onPress={onCancel} style={styles.button}>
                        Cancel
                    </Button>
                    <Button onPress={submitHandler} style={styles.submitButton}>
                        {submitButtonLabel}
                    </Button>
                </View>
            </View>
      </>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        width: '48%',
    },
    form: {
        marginTop: 40,
        marginBottom: 20,
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.foreground,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 4,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        marginHorizontal: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});