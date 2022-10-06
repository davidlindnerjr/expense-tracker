import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Button = ({ children, onPress, mode, style}) => {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        paddingHorizontal: 45,
        paddingVertical: 8,
        backgroundColor: GlobalStyles.colors.foreground,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.text
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.icon,
        borderRadius: 4,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.foreground,      
        alignItems: 'center',            
    }
});