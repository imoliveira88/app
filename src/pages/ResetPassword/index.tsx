import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native'
import Input from '../../components/Input';
import { FormHandles } from '@unform/core'
import Header from './../../components/Header'
import PasswordValidator from './../../components/PasswordValidator'
import AuthService from './../../services/AuthService';
import SecureStorageService from './../../services/SecureStorageService';

import {
  Container,
  StyledForm,
  Text,
  TextForm,
  ConfirmButton,
} from './styles';

interface ResetPasswordProps {
  navigation: any,
}

const ResetPassword: React.FC <ResetPasswordProps> = ({navigation}) => {
  const formRef = useRef<FormHandles>(null);
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSendButton, setEnableSendButton] = useState(false);

  const secureStorageService = new SecureStorageService();



  const service = new AuthService();


  const handleSubmitForm = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await service.updatePassword(data.password);
      await secureStorageService.updateCredentialPassword(data.password);
      setIsLoading(false);

      Alert.alert('Sucesso!',
        'Senha alterada com sucesso! Faça login com sua nova senha.',
        [
          { text: "OK", onPress: () => navigation.pop() }
        ],
        { cancelable: false }
      );
    } catch (e) {
      setIsLoading(false);

      let message = e.response ? e.response.data.error : e.message;
      Alert.alert('Ops!',
        message,
      );
    }
  }

  const onPasswordIsValid = (): void => {
    setEnableSendButton(true);
  }

  const onPasswordIsInvalid = (): void => {
    setEnableSendButton(false);
  }

  return (
    <>
      <Header />
      <Container>
        <StyledForm ref={formRef} onSubmit={handleSubmitForm}>
          <Text>Redefinir Senha</Text>

          <TextForm>Senha*</TextForm>
          <Input
            name="password"
            secureTextEntry
            onChange={(event) => setUserPassword(event.nativeEvent.text)}
          />

          <TextForm>Confirmar Senha*</TextForm>
          <Input
            name="passwordConfirm"
            secureTextEntry
            onChange={(event) => setUserConfirmPassword(event.nativeEvent.text)}
          />

          <PasswordValidator password={userPassword} confirmPassword={userConfirmPassword} onIsValid={onPasswordIsValid} onIsInvalid={onPasswordIsInvalid} />

          <ConfirmButton onPress={() => { enableSendButton ? formRef.current?.submitForm() : null }}
            isLoading={isLoading}
          >SALVAR
          </ConfirmButton>

        </StyledForm>
      </Container>
    </>
  )
}

export default ResetPassword;
