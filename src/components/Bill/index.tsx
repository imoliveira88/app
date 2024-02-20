import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import formatPrice from './../../components/MoneyMask'

import {
  Container,
  BillButton,
  DateTitle,
  ValueTitle,
  BillTitleArea,
  ButtonTextArea,
  DateText,
  ValueText,
} from './styles'

interface BillProps {
  id: string
  cod: string
  consumptionPeriodStart: string
  consumptionPeriodEnd: string
  status: string
  expiryDate: string
  paymentDate?: string | null
  value: string
  paidValue?: string | null
}

const Bill: React.FC<BillProps> = ({
  id,
  cod,
  consumptionPeriodStart,
  consumptionPeriodEnd,
  status,
  expiryDate,
  paymentDate,
  value,
  paidValue,
}) => {
  const navigation = useNavigation()

  function isOpen(): boolean {
    return status === 'Aberto' || status === 'Pago Parcialmente'
  }

  function isPartialPaid(): boolean {
    return status === 'Pago Parcialmente'
  }

  function CheckBill(): void {
    if (cod !== 'BOL') {
      Alert.alert(
        'Informação!',
        'Prezado cliente, seu contrato está na modalidade de débito automático. Caso precise gerar um boleto avulso por problemas nesse débito, ligue para o nosso SAC 117 ou 0800.281.2002'
      )

      return
    }

    if (isOpen()) {
      navigation.navigate('BoletoDetails', { billId: id })
    }
  }

  return (
    <BillButton
      image={null}
      icon={null}
      onPress={() => {
        CheckBill()
      }}
    >
      <Container>
        <BillTitleArea>
          <DateTitle>Status:</DateTitle>
          <DateText>{status}</DateText>
        </BillTitleArea>
        <BillTitleArea>
          <DateTitle>Período de medição:</DateTitle>
        </BillTitleArea>
        <BillTitleArea>
          <DateTitle>De:</DateTitle>
          <DateText>{consumptionPeriodStart}</DateText>
          <DateText> </DateText>
          <DateTitle>Até:</DateTitle>
          <DateText>{consumptionPeriodEnd}</DateText>
        </BillTitleArea>
        <BillTitleArea>
          <DateTitle>Vencimento:</DateTitle>
          <DateText>{expiryDate}</DateText>
        </BillTitleArea>
        {!isOpen() && (
          <BillTitleArea>
            <DateTitle>Data de pagamento:</DateTitle>
            <DateText>{paymentDate}</DateText>
          </BillTitleArea>
        )}
        <BillTitleArea>
          <DateTitle>Valor:</DateTitle>
          <DateText>{formatPrice(value.substring(2))}</DateText>
        </BillTitleArea>
        {(!isOpen() || status === 'Pago Parcialmente') && (
          <BillTitleArea>
            <DateTitle>Valor pago:</DateTitle>
            <DateText>{paidValue}</DateText>
          </BillTitleArea>
        )}
        {isOpen() && isPartialPaid() && (
          <>
            <ButtonTextArea>
              {status === 'P' && (
                <>
                  <ValueTitle>Obs:</ValueTitle>
                  <ValueText>Favor entrar em contato com a Copergás.</ValueText>
                </>
              )}
            </ButtonTextArea>
          </>
        )}
      </Container>
    </BillButton>
  )
}

export default Bill
