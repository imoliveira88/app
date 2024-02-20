import React, { useState, useEffect, ReactNode } from 'react'
import { FlatList, Alert } from 'react-native'
import { format, parseISO } from 'date-fns'
import {
  Container,
  FilterButton,
  FilterArea,
  FilterText,
  Left,
  Right,
} from './styles'
import Header from '../../components/Header'
import Bill from '../../components/Bill'
import api from '../../services/api'
import { ScrollView } from 'react-native-gesture-handler'
import Loader from '../../components/Loader'
import { Col, Center, TitleText, Row } from './../../components/GlobalStyles'

interface PayedBillsResponse {
  titulo: string
  status: string
  vencimento: string
  codigo: string
  valor: string
  multa: string
  mora: string
  payment_date: string
  paid_value: string
  origem: string
  cod: string
  consumption: any
}

interface OpenBillsResponse {
  titulo: string
  status: string
  vencimento: string
  paid_value: string
  codigo: string
  valor: string
  multa: string
  mora: string
  origem: string
  cod: string
  consumption: any
}

const Invoice: React.FC = () => {
  const [selectedOpenBills, setSelectedOpenBills] = useState(true)

  const [selectedPayedBills, setSelectedPayedBills] = useState(false)

  const [payedBills, setPayedBills] = useState<PayedBillsResponse[]>([])

  const [openBills, setOpenBills] = useState<OpenBillsResponse[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    function filterOpenBill(item: any): boolean {
      return item.status === 'A' || item.status === 'P'
    }

    function filterPayedBill(item: any): boolean {
      return item.status === 'L'
    }

    async function loadBills(): Promise<void> {
      await api
        .get('/api/invoices')
        .then(response => {
          const dados = response.data
          console.log(dados)
          const formattedOpenBills = dados
            .filter(filterOpenBill)
            .map((item: OpenBillsResponse) => ({
              ...item,
              status: item.status === 'A' ? 'Aberto' : 'Pago Parcialmente',
              vencimento: format(parseISO(item.vencimento), 'dd/MM/yyyy'),
              valor: `R$ ${parseFloat(item.valor).toFixed(2)}`,
              paid_value: parseFloat(item.paid_value).toFixed(2),
            }))

          const formattedPayedBills = dados
            .filter(filterPayedBill)
            .map((item: PayedBillsResponse) => ({
              ...item,
              status: 'Pago',
              vencimento: format(parseISO(item.vencimento), 'dd/MM/yyyy'),
              payment_date: format(parseISO(item.payment_date), 'dd/MM/yyyy'),
              valor: `R$ ${parseFloat(item.valor).toFixed(2)}`,
              paid_value: parseFloat(item.paid_value).toFixed(2),
            }))

          setOpenBills(formattedOpenBills)
          setPayedBills(formattedPayedBills)

          setIsLoading(false)
        })
        .catch(error => {
          Alert.alert(
            'Erro!',
            'Ocorreu um erro ao recuperar o histórico de faturas! \nDescrição:' +
              error
          )
          setIsLoading(false)
        })
    }

    loadBills()
  }, [])

  function handleSelectOpenBills(): void {
    setSelectedOpenBills(true)
    setSelectedPayedBills(false)
  }

  function handleSelectPayedBills(): void {
    setSelectedOpenBills(false)
    setSelectedPayedBills(true)
  }

  return (
    <>
      <Header />
      {!isLoading ? body() : <Loader />}
    </>
  )

  function body(): ReactNode {
    return (
      <>
        <FilterArea>
          <Left>
            <FilterButton
              style={{ elevation: 5 }}
              image={null}
              icon={null}
              selected={selectedOpenBills}
              onPress={handleSelectOpenBills}
            >
              <FilterText>Em Aberto</FilterText>
            </FilterButton>
          </Left>

          <Right>
            <FilterButton
              style={{ elevation: 5 }}
              image={null}
              icon={null}
              onPress={handleSelectPayedBills}
              selected={selectedPayedBills}
            >
              <FilterText>Pago</FilterText>
            </FilterButton>
          </Right>
        </FilterArea>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Row>
            <Col>
              <Container>
                {selectedOpenBills ? (
                  openBills.length > 0 ? (
                    <FlatList
                      data={openBills}
                      renderItem={({ item }) => (
                        <Bill
                          id={item.titulo}
                          cod={item.cod}
                          status={item.status}
                          consumptionPeriodStart={format(
                            parseISO(item.consumption.datainicio),
                            'dd/MM/yyyy'
                          )}
                          consumptionPeriodEnd={format(
                            parseISO(item.consumption.datafim),
                            'dd/MM/yyyy'
                          )}
                          expiryDate={item.vencimento}
                          value={item.valor.toString()}
                          paidValue={item.paid_value}
                        />
                      )}
                      initialNumToRender={openBills.length}
                      keyExtractor={item => item.titulo.toString()}
                    />
                  ) : (
                    noItemsText('em aberto')
                  )
                ) : payedBills.length > 0 ? (
                  <FlatList
                    data={payedBills}
                    renderItem={({ item }) => (
                      <Bill
                        id={item.titulo}
                        cod={item.cod}
                        status={item.status}
                        consumptionPeriodStart={format(
                          parseISO(item.consumption.datainicio),
                          'dd/MM/yyyy'
                        )}
                        consumptionPeriodEnd={format(
                          parseISO(item.consumption.datafim),
                          'dd/MM/yyyy'
                        )}
                        expiryDate={item.vencimento}
                        paymentDate={item.payment_date}
                        value={item.valor.toString()}
                        paidValue={item.paid_value}
                      />
                    )}
                    initialNumToRender={payedBills.length}
                    keyExtractor={item => item.titulo.toString()}
                  />
                ) : (
                  noItemsText('paga')
                )}
              </Container>
            </Col>
          </Row>
        </ScrollView>
      </>
    )
  }

  function noItemsText(type: String): ReactNode {
    return (
      <Center>
        <TitleText>Nenhuma fatura {type} encontrada!</TitleText>
      </Center>
    )
  }
}

export default Invoice
