import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Image, Alert, Linking } from 'react-native'
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import Input from '../../components/Input'
import logo from '../../assets/new_logo.png'
import KeyboardView from '../../components/KeyboardView'
import SplashScreen from 'react-native-splash-screen'

import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationError'

import {
  Container,
  ContainerLogo,
  LoginCard,
  LogInButton,
  NewContractButton,
  ForgotPasswordText,
  Background,
  StyledForm,
  InputArea,
  ForgotPasswordActionBox,
  ActionBoxText,
  HighlightedText
} from './styles'
import { TitleText } from '../../components/GlobalStyles'
import Header from '../../components/Header'
import api from '../../services/api'



interface RecoverPasswordProps {
  navigation: {
    navigate: Function,
    replace: Function
  }
}

const RecoverPassword: React.FC<RecoverPasswordProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [visible, setVisible] = useState(true)
  const [contract, setContract] = useState(String);
  const [cpfcnpj, setCpfcnpj] = useState(String);
  useEffect(() => {

  }, []);

  const changeContract = (item: String) => {
    setContract(item);
  }

  const changeCpfcnpj = (item: String) => {
    setCpfcnpj(item);
  }

  const sendPasswordRecover = () => {
    setButtonLoading(true);
     api.post('/api/password/reset', {contract: contract, cpfcnpj:cpfcnpj}, ).then((res) => {
        if(res.data.email == "@" || res.data.email == null){
          Alert.alert('erro', 'Não foi possível localizar um e-mail cadastrado para esse contrato. Favor entrar em contato com o nosso SAC através do 0800 281 2002.', function () {
          });
          setButtonLoading(false);
        }else{
          Alert.alert('Sucesso', 'O link de recuperação da sua senha foi enviado para o e-mail: ' + res.data.email);
          setButtonLoading(false);
        }
     }, (res) => {
       Alert.alert('Erro', 'Ocorreu algum erro ao recuperar a sua senha. Por favor, revise as suas informações.');
       setButtonLoading(false);
     })
  }

  return (

    <KeyboardView >
      <Background>
        <Header hideLogo={true} backButtonColor="white" />
        <LoginCard>
          <Image source={logo} resizeMode="stretch" style={{ width: 350, height: 300, alignSelf: 'center', marginBottom: 40 }} />
          <StyledForm style={{ elevation: 5 }}>
            {loginForm()}
          </StyledForm>
        </LoginCard>
      </Background>
    </KeyboardView>
  )


  function loginForm() {
    return (
      <>
      <TitleText
          style={{ textAlign: 'center', marginTop:20, marginBottom: 20 }}
          >
            Recuperação de senha
        </TitleText>
        <Input
          icon={null}
          autoCorrect={false}
          placeholder="Digite o número do contrato"
          keyboardType="numeric"
          returnKeyType="next"
          maxLength={9}
          onChangeText={(item) => changeContract(item)}
          name="contract"
        />
        <Input
          icon={null}
          autoCorrect={false}
          placeholder="Digite o seu cpf/cnpj"
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(item) => changeCpfcnpj(item)}
          name="cpfcnpj"
        />
        <Container>
         <LogInButton
            style={{ elevation: 5 }}
            isLoading={buttonLoading}
            onPress={() => sendPasswordRecover()}>
            RECUPERAR SENHA
         </LogInButton>


        </Container>
      </>
    )
  }
}

export default RecoverPassword
