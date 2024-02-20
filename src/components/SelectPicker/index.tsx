import React, { useEffect } from 'react'
import { Platform, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Picker from 'react-native-picker-select';

import { PickerStyles } from './styles';


interface SelectPickerProps {
    items: any,
    onChange: (value: any, index: number) => void,
    value: any,
    placeholder?: String | null
}

const SelectPicker: React.FC<SelectPickerProps> = ({ items, value, onChange, placeholder }) => {

    useEffect(() => {
        // console.log(placeholder);
    })

    return (
        <View style={PickerStyles.Container}>
            <Picker
                doneText="Confirmar"
                onValueChange={onChange}
                items={items}
                placeholder={
                    {
                        label: placeholder != null ? placeholder : 'Selecione um item...',
                        value: null,
                        color: '#9EA0A4',
                    }
                }
                style={PickerStyles}
                Icon={() => {
                    return <FontAwesome name="chevron-down" color="gray" />;
                }}
            />
        </View>

    )
}

export default SelectPicker
