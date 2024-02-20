import React, { useEffect, useState, } from 'react'
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native'


import UserAvatar from 'react-native-user-avatar';

import SecureStorageService from './../../services/SecureStorageService';
import BiometricService from './../../services/BiometricService';
import { useAuth } from './../../hooks/auth'

import {
  Row,
  Col,
} from './../GlobalStyles'

import {
  Center,
  Footer,
  Container,
  UserName,
  UserContract,
  LogInButton,
  LinkText
} from './styles'

interface BiometricLoginProps {
  navigation: {
    navigate: Function,
    replace: Function
  }
}
const BiometricLogin: React.FC<BiometricLoginProps> = ({ navigation }) => {
  const biometricService = new BiometricService();
  const secureStorageService = new SecureStorageService();
  const [user, setUser] = useState('');
  const [contract, setContract] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async (): Promise<void> => {
    const credentials = await secureStorageService.getCredentials();
    let userName = credentials.name.split(' ');
    let userNameCount = userName.length;
    let userFinalName = `${userName[0]} ${userName[userNameCount - 1]}`;
    setUser(userFinalName);
    setContract(credentials.username);
  }

  const accessOtherAccount = async (): Promise<void> => {
    await resetCredentials();
    navigation.replace('Login');
  }

  const resetCredentials = async (): Promise<void> => {
    await secureStorageService.removeCredentials();
    await biometricService.reset();
  }

  const makeLogin = async (): Promise<void> => {
    try {
      const isValid: boolean = await biometricService.authenticate();

      if (isValid) {
        setIsLoading(true)
        const credentials = await secureStorageService.getCredentials();
        await login({ contract: credentials.username, password: credentials.password });
        setIsLoading(false);
        navigation.navigate('AuthStack', {
          screen: 'Home'
        });
      }
    } catch (e) {
      setIsLoading(false);
      let message = e.response != null ? e.response.data.error : e.message;
      await resetCredentials();
      Alert.alert(
        'Erro na autenticação',
        'Contrato ou senha incorretos, por favor faça login novamente!',
        [
          {
            text: "OK", onPress: () => navigation.navigate('NoAuthStack', {
              screen: 'Login'
            })
          }
        ],
        { cancelable: false }
      );
    }
  }


  return (
    <Container>
      <Center>
        {user != null && user != '' && user != undefined ? (
          userData()
        ) : (
            <ActivityIndicator size="large" />
          )}
      </Center>
      <LogInButton isLoading={isLoading} onPress={makeLogin}>Fazer login seguro</LogInButton>

      <Footer>
        <TouchableOpacity onPress={accessOtherAccount}>
          <LinkText>Acessar outra conta</LinkText>
        </TouchableOpacity>
      </Footer>
    </Container>
  )

  function userData() {
    return (
      <>
        <UserAvatar size={100} name={user} bgColor="#d42e12" />
        <UserName>{user}</UserName>
        <UserContract>{contract}</UserContract>
      </>
    )
  }
}

export default BiometricLogin
