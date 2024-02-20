import React from 'react'
import { Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';


interface KeyboardViewProps {
    children: any,
}

const KeyboardView: React.FC<KeyboardViewProps> = ({ children }) => {

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default KeyboardView
