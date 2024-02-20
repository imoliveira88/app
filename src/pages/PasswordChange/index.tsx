import React, { useRef, useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import Input from '../../components/Input';
import { FormHandles } from '@unform/core'
import Header from './../../components/Header';
import PasswordValidator from './../../components/PasswordValidator'

import AuthService from './../../services/AuthService';
import CryptService from './../../services/CryptService';

import {
  Container,
  StyledForm,
  Text,
  TextForm,
  ConfirmButton
} from './styles';

interface PasswordChangeProps {
  navigation: any,
  route: any
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ navigation, route }) => {
  const formRef = useRef<FormHandles>(null);
  const authService = new AuthService();
  const cryptService = new CryptService();
  const [isLoading, setIsLoading] = useState(false);
  const [enableSendButton , setEnableSendButton] = useState(false);

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const changePassword = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      const encryptedData = cryptService.encrypt(route.params);
      const response = await authService.storeNewPassword(data.password, encryptedData);
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

  const onPasswordIsValid =  (): void => {
    setEnableSendButton(true);
  }

  const onPasswordIsInvalid = (): void => {
    setEnableSendButton(false);
  }

  return (
    <SafeAreaView>
      <Header />
      <Container>
        <StyledForm ref={formRef} onSubmit={changePassword}>
          <Text>Olá! Verificamos que é o seu primeiro acesso, por favor digite uma nova senha de acesso para sua conta</Text>

          <TextForm>Insira sua nova senha*</TextForm>
          <Input
            name="password"
            secureTextEntry
            onChange={(event) => setPassword(event.nativeEvent.text)}
          />

          <TextForm>Confirmar senha*</TextForm>
          <Input
            name="passwordConfirm"
            secureTextEntry
            onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
          />

          <PasswordValidator password={password} confirmPassword={confirmPassword} onIsValid={onPasswordIsValid} onIsInvalid={onPasswordIsInvalid} />

          <ConfirmButton isLoading={isLoading} onPress={() => enableSendButton ?  formRef.current?.submitForm() : null}>SALVAR</ConfirmButton>
        </StyledForm>
      </Container>
    </SafeAreaView>
  );
}

export default PasswordChange;
