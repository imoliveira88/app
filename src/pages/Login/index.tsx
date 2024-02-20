import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Image, Alert, Linking, ActivityIndicator } from 'react-native'
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import Input from '../../components/Input'
import logo from '../../assets/new_logo.png'
import KeyboardView from './../../components/KeyboardView'
import SplashScreen from 'react-native-splash-screen'
import config from './../../config/config'
import Dialog from 'react-native-dialog'
import api from '../../services/api'

import InAppBrowser from 'react-native-inappbrowser-reborn'

import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationError'

import {
  Container,
  LoginCard,
  LogInButton,
  NewContractButton,
  Background,
  StyledForm,
  ActionBoxText,
  HighlightedText,
  DischargeStatementButton,
  ModalTitle,
  ModalContainer,
} from './styles'

import BiometricLogin from './../../components/BiometricLogin'

import BiometricService from './../../services/BiometricService'
import AsyncStorage from '@react-native-community/async-storage'
import AuthService from './../../services/AuthService'

interface LoginFormData {
  contract: string
  password: string
}

interface LoginProps {
  navigation: {
    navigate: Function
    replace: Function
    setParams: Function
  }
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const { login } = useAuth()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isBiometric, setIsBiometric] = useState(false)
  const [uuid, setUuid] = useState()

  useEffect(() => {
    ;(async () => {
      if (!(await AsyncStorage.getItem('@copergas:agreedPrivaryTerms'))) {
        navigation.navigate('PrivacyTerms')
      }
    })()
  }, [])

  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  const authService = new AuthService()
  const biometricService = new BiometricService()

  const modalStyle = {
    backgroundColor: 'white',
    height: 250,
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 8,
  }

  useEffect(() => {
    console.log(navigation)

    SplashScreen.hide()
    async function getUserData() {
      try {
        const user = await AsyncStorage.getItem('@Copergas:user')
        if (user) {
          await navigation.navigate('AuthStack', { screen: 'Home' })
        }
      } catch (err) {
        console.log(err)
        alert('Ocorreu um erro ao obter o Token do usuário')
      }
    }
    handleBiometric()
    getUserData()
  }, [])

  const handleBiometric = async (): Promise<void> => {
    const IsUsingBiometric = await biometricService.IsUsingBiometric()
    setIsBiometric(IsUsingBiometric)
  }

  const handleLogin = useCallback(async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      const isFirstAccess: boolean = await authService.isFirstAccess(
        data.contract
      )
      if (isFirstAccess) {
        firstAccessFlow(data)
      } else {
        authFlow(data)
      }
    } catch (error) {
      console.log('deu erro')
      setIsLoading(false)
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        console.log('erro: ')
        console.log(errors)
        formRef.current?.setErrors(errors)
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login. Cheque os dados enviados.'
      )
    }
  }, [])

  const authFlow = async (data: LoginFormData): Promise<void> => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        contract: Yup.string().required('CPF/CNPJ obrigatório'),
        password: Yup.string().required('Código obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      await login({ contract: data.contract, password: data.password })
      setIsLoading(false)
      navigation.navigate('AuthStack', {
        params: {
          username: data.contract,
          password: data.password,
        },
        screen: 'Home',
      })
    } catch (e) {
      setIsLoading(false)

      const message = e.response != null ? e.response.data.error : e.message

      Alert.alert('Erro na autenticação', message)
      throw e
    }
  }

  const firstAccessFlow = async (data: LoginFormData): Promise<void> => {
    const contract = await authService.getContractDataByCpfCnpj(
      data.contract,
      data.password
    )
    setIsLoading(false)

    if (!contract) {
      Alert.alert('Erro na autenticação', 'Contrato ou senha inválidos!')
    } else {
      navigation.navigate('PasswordChange', contract)
    }
  }

  const handleVisible = (): void => {
    setVisible(!visible)
  }

  const changePassword = (): void => {
    navigation.navigate('RecoverPassword')
  }

  async function searchDQA() {
    setIsSearching(true)
    const response = await api.get(
      `https://apiagenciavirtual.copergas.com.br:8443/searchDQA?value=${uuid}`
    )
    const dqa = response.data[0]
    const timestamp = new Date()
    if (uuid == undefined) {
      Alert.alert('Erro', 'O campo não pode estar vazio')
    } else {
      if (dqa) {
        const data = dqa.created_at.split(' ')
        const hours = data[1]
        const days = data[0].split('-')
        const formatedDays = days[2] + '/' + days[1] + '/' + days[0]
        Alert.alert(
          'Sucesso',
          `Declaração de quitação anual emitida em ${formatedDays} às ${hours} para o Contrato de Número ${dqa.contract} referente ao exercício de ${dqa.year}.`
        )
      } else {
        Alert.alert(
          'Erro',
          'Não existe Declaração de Quitação Anual com o código de controle informado!'
        )
      }
    }

    setIsSearching(false)
  }

  async function openLink() {
    try {
      const isAvailable = await InAppBrowser.isAvailable()
      const url =
        'https://agenciavirtual.copergas.com.br:8443/login/contract-online'
      if (isAvailable) {
        InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#003882',
          preferredControlTintColor: 'white',
          // Android Properties
          showTitle: true,
          toolbarColor: '#003882',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
        }).then(result => {
          // Alert.alert(JSON.stringify(result))
        })
      } else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
  }
  return (
    <KeyboardView>
      <Background>
        <LoginCard>
          <Image
            source={logo}
            resizeMode="stretch"
            style={{
              width: 280,
              height: 270,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
          <StyledForm
            ref={formRef}
            onSubmit={handleLogin}
            style={{ elevation: 23 }}
          >
            {isBiometric ? (
              <BiometricLogin navigation={navigation} />
            ) : (
              loginForm()
            )}
          </StyledForm>
        </LoginCard>
      </Background>
    </KeyboardView>
  )

  function loginForm() {
    return (
      <>
        <Dialog.Container visible={modalVisible}>
          <Dialog.Title>Declaração de Quitação Anual</Dialog.Title>

          <Input
            name="dqa"
            placeholder="Digite o código de controle."
            onChangeText={text => setUuid(text)}
          ></Input>
          <Dialog.Button label="Cancelar" onPress={hideModal} />
          {isSearching == true ? (
            <ActivityIndicator color="#0000ff" />
          ) : (
            <Dialog.Button
              label="Pesquisar"
              visible={isSearching}
              onPress={searchDQA}
            />
          )}
        </Dialog.Container>

        <Input
          style={{ marginTop: 32 }}
          icon={null}
          autoCorrect={false}
          placeholder="Contrato (apenas os 9 primeiros dígitos)"
          keyboardType="numeric"
          returnKeyType="next"
          maxLength={9}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus()
          }}
          name="contract"
        />

        <Input
          ref={passwordInputRef}
          placeholder="Senha (CPF OU CNPJ no 1º acesso)"
          secureTextEntry
          returnKeyType="done"
          name="password"
        />
        <Container>
          {!visible && (
            <LogInButton
              style={{ elevation: 5 }}
              isLoading={isLoading}
              onPress={() => formRef.current?.submitForm()}
            >
              ENTRAR
            </LogInButton>
          )}

          <NewContractButton onPress={openLink}>
            QUERO SER CLIENTE
          </NewContractButton>

          <DischargeStatementButton onPress={showModal}>
            DECLARAÇÃO DE QUITAÇÃO
          </DischargeStatementButton>

          <TouchableOpacity onPress={changePassword}>
            <ActionBoxText>Esqueci minha senha</ActionBoxText>
          </TouchableOpacity>

          <ActionBoxText>
            Não sabe o número do seu contrato? Há duas formas de descobrir:
            <HighlightedText
              onPress={() =>
                Linking.openURL(
                  'https://agenciavirtual.copergas.com.br:8443/img/opcao_1.jpeg'
                )
              }
            >
              {' '}
              Opção 1{' '}
            </HighlightedText>
            ou
            <HighlightedText
              onPress={() =>
                Linking.openURL(
                  'https://agenciavirtual.copergas.com.br:8443/img/opcao_2.png'
                )
              }
            >
              {' '}
              Opção 2{' '}
            </HighlightedText>
            Em caso de dúvidas, ligue para o nosso SAC 117 ou 0800.281.2002.
          </ActionBoxText>
        </Container>
      </>
    )
  }
}

export default Login
