import React, { useEffect, useState } from 'react'
import { TouchableOpacity, SafeAreaView, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import UserAvatar from 'react-native-user-avatar'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { useAuth } from './../../hooks/auth'
import {
  ContainerAvatar,
  ContainerAvatarInfo,
  ContainerAvatarPhoto,
  MenuItem,
  MenuText,
  Container,
  TextTitle,
  WhiteText,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import AuthService from '../../services/AuthService'

interface MenuProps {
  navigation: any
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>('')
  const [finalName, setFinalName] = useState<string>()

  const { logout } = useAuth()

  const authService = new AuthService()

  const wasDrawerOpen = useIsDrawerOpen()

  useEffect(() => {
    getUser()

    return () => {
      if (wasDrawerOpen) {
      }
    }
  }, [wasDrawerOpen])

  const getUser = async () => {
    const data = await AsyncStorage.getItem('@Copergas:user')
    const parsedData = JSON.parse(data)
    console.log(data)
    if (parsedData != null) {
      const userName = parsedData.corporate_name.split(' ')
      const userNameCount = userName.length
      const userShortName = `${userName[0]} ${userName[userNameCount - 1]}`
      parsedData.corporate_name = parsedData.corporate_name.split(' ').join(' ')
      setFinalName(userShortName)
      setUser(parsedData)
    }
  }

  const handleLogout = (): void => {
    navigation.closeDrawer()

    logout()

    navigation.navigate('NoAuthStack', {
      screen: 'Login',
    })
  }

  const handleDeleteUser = (): void => {
    navigation.closeDrawer()

    Alert.alert(
      'Exclusão de Dados',
      'Atenção! Deseja realmente prosseguir com a exclusão de todos os seus dados?',
      [
        {
          text: 'Sim',
          onPress: () => confirmDeleteUser(),
          style: 'destructive',
        },
        {
          text: 'Não',
        },
      ],
      { cancelable: true }
    )
  }

  const confirmDeleteUser = (): void => {
    Alert.alert(
      'Exclusão de Dados',
      'Atenção! Tem certeza de que deseja prosseguir com a exclusão de todos os seus dados?',
      [
        {
          text: 'Sim',
          onPress: () => deleteUser(),
          style: 'destructive',
        },
        {
          text: 'Não',
        },
      ],
      { cancelable: true }
    )
  }

  const deleteUser = (): void => {
    authService
      .deleteUser()
      .then(() => {
        Alert.alert('Sucesso', 'Seus dados foram excluídos com sucesso!')

        handleLogout()
      })
      .catch(() => {
        Alert.alert(
          'Erro',
          'Não foi possível excluir seus dados! Por favor, contate nosso time de suporte.'
        )
      })
  }

  return (
    <>
      <ScrollView>
        <Container>
          <ContainerAvatar>
            <SafeAreaView>
              {user != null && user != '' && user != undefined ? (
                <ContainerAvatarInfo>
                  <ContainerAvatarPhoto>
                    <UserAvatar size={100} name={finalName} bgColor="#d42e12" />
                  </ContainerAvatarPhoto>
                  <TextTitle>{finalName}</TextTitle>
                  <WhiteText>Contrato: {user.contract_number}</WhiteText>
                </ContainerAvatarInfo>
              ) : null}
            </SafeAreaView>
          </ContainerAvatar>

          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}
          >
            <MenuItem>
              <FontAwesome name="lock" size={20} color="black" />
              <MenuText style={{ marginLeft: 12 }}>Alterar Senha</MenuText>
            </MenuItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <MenuItem>
              <FontAwesome name="sign-out-alt" size={20} color="black" />
              <MenuText style={{ marginLeft: 9 }}>Sair</MenuText>
            </MenuItem>
          </TouchableOpacity>
        </Container>
      </ScrollView>

      <View>
        <Container>
          <TouchableOpacity onPress={() => handleDeleteUser()}>
            <MenuItem>
              <FontAwesome name="trash" size={20} color="red" />
              <MenuText style={{ marginLeft: 12 }}>Excluir meus dados</MenuText>
            </MenuItem>
          </TouchableOpacity>
        </Container>
      </View>
    </>
  )
}

export default Menu
