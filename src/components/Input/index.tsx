import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback
} from 'react'
import { TextInputProps, Platform } from 'react-native'
import { useField } from '@unform/core'

import { Container, TextInput, StyledIcon } from './styles'

interface InputProps extends TextInputProps {
  name: string,
  icon?: string | null
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }:InputProps, ref) => {
  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      focus () {
        inputElementRef.current.focus()
      }
    }
  })

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue (ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue () {
        inputValueRef.current.value = ''
        inputElementRef.current.clear
      }
    })
  }, [fieldName, registerField])

  return (
    <Container
      isFocused={isFocused}
    >
      {icon && <StyledIcon name={icon}/>}
      <TextInput
        isErrored={!!error}
        ref={inputElementRef}
        icon={icon}
        keyboardAppearance="dark"
        placeholderTextColor={'#999'}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
