import React, { useEffect, useState } from 'react'
import { Text, Alert, PermissionsAndroid, Platform } from 'react-native'
import Header from '../../components/Header'
import { format } from 'date-fns'
import Button from '../../components/Button'
import SelectPicker from './../../components/SelectPicker'
import { Container } from './styles'
import api from '../../services/api'
import { downloadFile } from '../../services/Files/FileDownload'
import SecureStorageService from '../../services/SecureStorageService'

// GERAR UM ALGORITMO CAPAZ DE ENTENDER QUAL ANO QUE ESTAMOS
const DischargeStatement: React.FC = () => {
  const secureStorageService = new SecureStorageService()
  const [selectedValue, setSelectedValue] = useState(null)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [mailButtonLoading, setMailButtonLoading] = useState(false)
  const [contract, setContract] = useState('')
  const currentYear: number = parseInt(format(new Date(), 'yyyy'))

  useEffect(() => {
    getUser()
  })

  const getUser = async (): Promise<void> => {
    const credentials = await secureStorageService.getCredentials()
    setContract(credentials.username)
  }

  const checkValue = (): boolean => {
    if (!selectedValue) {
      Alert.alert(
        'Erro!',
        'Por favor, selecione um ano para exportar a declaração de quitação.'
      )
    }
    return selectedValue != null
  }

  const generateDischargeStatement = async () => {
    if (checkValue()) {
      await getDischargeFile()
    }
  }

  const sendEmail = async () => {
    if (checkValue()) {
      setMailButtonLoading(true)

      api
        .get(`/api/payment-statement/to-mail?year=${selectedValue}`)
        .then(res => {
          Alert.alert(
            'Sucesso!',
            'Sua declação de quitação foi enviada por e-mail com sucesso. Em alguns instantes você receberá a mensagem com o arquivo em anexo.'
          )
        })

      setMailButtonLoading(false)
    }
  }

  async function getDischargeFile() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setButtonLoading(true)
          downloadFile(
            `/api/payment-statement/to-pdf?year=${selectedValue}`,
            `Declaração de Quitação Anual - ${contract} - Exercício ${selectedValue}`,
            'pdf',
            false
          ).then(res => {
            setButtonLoading(false)
          })
        } else {
          Alert.alert(
            'Permissão Negada!',
            'Você precisa dar permissão de armazenamento para poder baixar o arquivo'
          )
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      try {
        setButtonLoading(true)
        await downloadFile(
          `/api/payment-statement/to-pdf?year=${selectedValue}`,
          `declaracao-${selectedValue}`,
          'pdf',
          false
        )
        setButtonLoading(false)
      } catch (err) {
        console.warn(err)
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Text style={{ fontSize: 16, color: '#003882', fontWeight: 'bold' }}>
          Selecione o ano de Solicitação{'\n'}da declaração de quitação
        </Text>

        <SelectPicker
          onChange={(value: any) => setSelectedValue(value)}
          placeholder="Selecione um ano"
          value={selectedValue}
          items={[
            { label: String(currentYear - 1), value: String(currentYear - 1) },
            { label: String(currentYear - 2), value: String(currentYear - 2) },
            { label: String(currentYear - 3), value: String(currentYear - 3) },
            { label: String(currentYear - 4), value: String(currentYear - 4) },
            { label: String(currentYear - 5), value: String(currentYear - 5) },
            { label: String(currentYear - 6), value: String(currentYear - 6) },
          ]}
        />
        <Button
          isLoading={buttonLoading}
          onPress={generateDischargeStatement}
          style={{ alignSelf: 'center', borderRadius: 4 }}
        >
          GERAR ARQUIVO
        </Button>
        <Button
          isLoading={mailButtonLoading}
          onPress={sendEmail}
          style={{ alignSelf: 'center', borderRadius: 4 }}
        >
          ENVIAR POR E-MAIL
        </Button>
      </Container>
    </>
  )
}

export default DischargeStatement
