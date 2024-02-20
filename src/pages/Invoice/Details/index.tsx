import React, { useEffect, useState } from 'react'
import { View, Text, Picker } from 'react-native'
import axios from 'axios'
import { useAuth } from '../../../hooks/auth'
//import api from '../../../services/api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import Header from '../../../components/Header'

import { Container, DetailArea, BillValue, PDFButton, ButtonText } from './styles';
import api from '../../../services/api'
import Loader from '../../../components/Loader'
import { ScrollView } from 'react-native-gesture-handler'

interface DetailsProps {
  route: {
    params: {
      dateInit: string,
      dateEnd: string
    }
  }
}
const Details: React.FC<DetailsProps> = ({ route }) => {

  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth()

  const dateInit = route.params?.dateInit
  const dateEnd = route.params?.dateEnd;

  useEffect(() => {

    async function getInvoiceData() {
      const response = await api.get(`api/consumption/show/by-user?dateInit=${dateInit}&dateEnd=${dateEnd}`)
      let invoiceData = response.data;
      setInvoiceData(invoiceData);
      setIsLoading(false);
    }

    getInvoiceData()
  }, [])

  return (
    <>
      {
        !isLoading ? (
          body()
        ) : (
            <Loader />
          )
      }
    </>
  )

  function body() {
    return (
      <>
        <Header />
        <Container>
          <DetailArea>
            <BillValue>
              Período de Medição:{'\n'} {dateInit} até {dateEnd}
            </BillValue>
            <BillValue>
              Leitura anterior: {invoiceData.leitura_anterior}
            </BillValue>
            <BillValue>
              Pressão(kgf/cm): {invoiceData.pressao_informada}
            </BillValue>
            <BillValue>
              Temperatura(C°): {invoiceData.temperatura_informada}
            </BillValue>
            <BillValue>
              Volume Corrigido(P/T): {invoiceData.consumo_medido}
            </BillValue>
            <BillValue>
              Fator de Correção:{'\n'}
            ∑ (Volume Ramal X PCV){'\n'}
            ∑ (Volume Ramal){'\n'}
              {invoiceData.recipe_1} = {invoiceData.recipe_2}
            </BillValue>
            <BillValue>
              Volume Corrigido(PCS): {invoiceData.consumo_corrigido_pcs}
            </BillValue>
          </DetailArea>
        </Container>
      </>
    )
  }
}

export default Details
