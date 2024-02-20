import React, { useEffect, useState } from 'react'
import {
  Text,
  Clipboard,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native'
import { useAuth } from '../../../hooks/auth'

import Header from '../../../components/Header'

import {
  Container,
  BillValue,
  PDFButton,
  CopyButton,
  DescriptionText,
  InvoiceNumber,
  Footer,
} from './styles'
import api from '../../../services/api'
import { downloadFile } from './../../../services/Files/FileDownload'
import { TitleText } from '../../ConsumptionHistory/styles'

import Toast from 'react-native-simple-toast'
import Loader from '../../../components/Loader'

import { RowCenter } from './../../../components/GlobalStyles'
import AsyncStorage from '@react-native-community/async-storage'

interface BoletoProps {
  route: {
    params: {
      billId: string
    }
  }
}
const Boleto: React.FC<BoletoProps> = ({ route }) => {
  const [invoiceData, setInvoiceData] = useState<any>(null)
  const [isPDFLoading, setIsPDFLoading] = useState<boolean>(false)
  const { user } = useAuth()

  const invoiceId = route.params?.billId

  useEffect(() => {
    api
      .get(`api/invoices/details/${invoiceId}`)
      .then(response => setInvoiceData(response.data))
  }, [])

  const copyDigitableLine = async (): Promise<void> => {
    Clipboard.setString(invoiceData.digitable_line)
    Toast.showWithGravity('Código copiado!', Toast.SHORT, Toast.CENTER)
  }

  const renderPDF = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const data = await AsyncStorage.getItem('@Copergas:user')
          const decoded = JSON.parse(data)
          console.log(invoiceId)
          setIsPDFLoading(true)
          const response = await api.post(
            `/api/users/api_boleto_pdf?id_contrato=${decoded.contract_number}&id_boleto=${invoiceId}`
          )
          await downloadFile(response.data.pdf, response.data.nome_arquivo)
          setIsPDFLoading(false)
        } else {
          Alert.alert(
            'Permissão Negada!',
            'Você precisa dar permissão de armazenamento para poder baixar o arquivo'
          )
        }
      } catch (err) {
        setIsPDFLoading(false)
        console.warn(err)
      }
    }
  }

  return (
    <>
      <Header />
      {invoiceData != null ? body() : <Loader />}
    </>
  )

  function body() {
    return (
      <Container>
        <RowCenter>
          <TitleText>Detalhes da fatura</TitleText>
        </RowCenter>

        <RowCenter>
          <BillValue>{invoiceData.valor}</BillValue>
          <Text>Vencimento {invoiceData.vencimento}</Text>
          <DescriptionText>
            Utilize o numero abaixo para realizar o pagamento:
          </DescriptionText>
          <InvoiceNumber selectable>{invoiceData.digitable_line}</InvoiceNumber>
        </RowCenter>

        <Footer>
          <CopyButton onPress={copyDigitableLine}>Copiar código</CopyButton>
          <PDFButton isLoading={isPDFLoading} onPress={renderPDF}>
            Abrir 2ª via do boleto
          </PDFButton>
        </Footer>
      </Container>
    )
  }
}

export default Boleto
