import React, { useEffect } from 'react'
import { FlatList, Linking, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { BoxShadow } from 'react-native-shadow'

import AsyncStorage from '@react-native-community/async-storage'

import { Container, FeatureButton, ButtonText } from './styles'
import Header from '../../components/Header'

import ComplaintIcon from '../../assets/icons/bad-review.png'
import BillCopyIcon from '../../assets/icons/invoice.png'
import AuditIcon from '../../assets/icons/audit.png'
import EmergencyIcon from '../../assets/icons/emergency-call.png'
import ConsumptionIcon from '../../assets/icons/energy-consumption.png'
import MapIcon from '../../assets/icons/placeholder.png'
import RequestIcon from '../../assets/icons/request.png'
import FAQIcon from '../../assets/icons/conversation.png'
import InvoiceIcon from '../../assets/icons/financial.png'
import PasswordIcon from './../../assets/icons/password.png'
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { Text } from 'react-native-svg'
import { BillButton } from '../../components/Bill/styles'

import SecureStorageService from './../../services/SecureStorageService'
import BiometricService from './../../services/BiometricService'

const secureStorageService = new SecureStorageService()
const biometricService = new BiometricService()

const features = [
  {
    name: 'DECLARAÇÃO DE QUITAÇÃO',
    icon: BillCopyIcon,
    route: 'DischargeStatement',
  },
  // { name: 'DECLARAÇÃO DE QUITAÇÃO', icon: BillCopyIcon, route: 'Manutencao' },
  {
    name: 'HISTÓRICO DE CONSUMO',
    icon: ConsumptionIcon,
    route: 'ConsumptionHistory',
  },
  { name: 'FATURAS', icon: InvoiceIcon, route: 'Invoice' },
  { name: 'OUVIDORIA', icon: AuditIcon, route: 'Audit' },
  { name: 'CHAMADOS', icon: ComplaintIcon, route: 'Complaint' },
  { name: 'ACOMPANHAMENTO DE CHAMADOS', icon: '', route: 'Accompaniments' },
  // { name: 'SOLICITAÇÕES', icon: RequestIcon, route: 'Request' },
  { name: 'EMERGÊNCIA', icon: EmergencyIcon },
  { name: 'FAQ', icon: MapIcon, route: 'Faq' },
]

const telNumber = '08002812002'

interface HomeProps {
  route: {
    params: any
  }
  navigation: {
    navigate: Function
  }
}

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  const shadowOpt = {
    style: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    width: 150,
    height: 150,
    color: '#003882',
    opacity: 0.06,
    border: 10,
    radius: 8,
    x: 0,
    y: 0,
  }

  useEffect(() => {
    ;(async () => {
      if (!(await AsyncStorage.getItem('@copergas:agreedPrivaryTerms'))) {
        navigation.navigate('PrivacyTerms')
      }
    })()
  }, [])

  useEffect(() => {
    if (route.params && route.params.password) {
      handleBiometrics()
    }
  }, [])

  /**
   * Handle biometrics services
   */
  const handleBiometrics = async (): Promise<void> => {
    const data = await AsyncStorage.getItem('@Copergas:user')
    const parsedData = JSON.parse(data)
    await secureStorageService.storeCredentials(
      parsedData.corporate_name,
      route.params.username,
      route.params.password
    )

    const isAvailable = await biometricService.isAvailbale()
    const userHasInformedIfWantToUseBiometrics =
      await biometricService.userHasInformedIfWantToUseBiometrics()

    if (!userHasInformedIfWantToUseBiometrics && isAvailable) {
      try {
        const isAllow = await biometricService.requestBiometrics()
        await biometricService.userInformedIfWantToUseBiometrics(isAllow)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <FlatList
          data={features}
          numColumns={2}
          renderItem={({ item }) => (
            <BoxShadow setting={shadowOpt}>
              <FeatureButton
                icon={null}
                // image={item.icon}
                // todas as features tem uma tela menos a de emergencia, que é feita uma ligação logo após o clique no ícone
                onPress={() =>
                  item.route
                    ? navigation.navigate(item.route)
                    : Linking.openURL(`tel:${telNumber}`)
                }
              >
                <ButtonText>{item.name}</ButtonText>
              </FeatureButton>
            </BoxShadow>
          )}
          keyExtractor={item => item.name}
        />
      </Container>
    </>
  )
}

export default Home
