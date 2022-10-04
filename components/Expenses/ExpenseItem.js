import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Util
import { getFormattedDate } from '../../util/date';

// Constants
import { GlobalStyles } from '../../constants/styles';

const ExpenseItem = ({ id, description, amount, date }) => {
    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', {
            expenseId: id,
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed }>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;


const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor:  GlobalStyles.colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: 'black',
        textShadowRadius: 4,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.text,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.foreground,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 100,
    },
    amount: {
        color: GlobalStyles.colors.text,
        fontWeight: 'bold',
    },
}); 