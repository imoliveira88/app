import React from 'react'
import { useNavigation } from '@react-navigation/core'

import { Container, InvoiceButton, DateInvoiceTitle, ValueInvoiceTitle, InvoiceTitleArea, ButtonTextArea, DateText, ValueText } from './styles'

interface InvoiceProps {
  value: string,
  expiryDate: string,
  measurementDate: string,
  openInvoice: boolean,
  dateInit: string,
  dateEnd: string,
  id: string | null,
  grouped: boolean | null,
}

const Invoice: React.FC<InvoiceProps> = ({ value, expiryDate, openInvoice, measurementDate, id, dateInit, dateEnd, grouped }) => {
  const navigation = useNavigation()

  function CheckInvoice() {
    if (grouped == false) {
      navigation.navigate('InvoiceDetails', { InvoiceId: id, dateInit: dateInit, dateEnd: dateEnd })
    } else {
      return;
    }
  }

  return (
    <InvoiceButton image={null} icon={null} onPress={() => { CheckInvoice() }}>
      <Container>
            <InvoiceTitleArea>
            <DateText>
                {measurementDate}
              </DateText>
            </InvoiceTitleArea>
            <InvoiceTitleArea >
              <DateInvoiceTitle>
                Vencimento:{'             '}
              </DateInvoiceTitle>
              <ValueInvoiceTitle>
                Valor:
              </ValueInvoiceTitle>
            </InvoiceTitleArea>

            <ButtonTextArea>
              <DateText>
                {expiryDate}
              </DateText>
              <ValueText>
                {value}
              </ValueText>
            </ButtonTextArea>
      </Container>
    </InvoiceButton>

  )
}

export default Invoice
