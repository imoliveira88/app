import styled from 'styled-components/native'
import Button from '../../components/Button'

export const Container = styled.View`
  flex:1;
`
export const BillButton = styled(Button)`
  width: 320px;
  height: 90px;
  border-radius: 4px;
`

export const BillTitleArea = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const InvoiceButton = styled(Button)`
  padding-top:30px;
  height:100px;
  border-radius: 10px;
`

export const InvoiceTitleArea = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const DateTitle = styled.Text`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: #fdfdfd;
`
export const ValueTitle = styled.Text`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #fdfdfd;
`

export const DateInvoiceTitle = styled.Text`
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  color: #fdfdfd;
`
export const ValueInvoiceTitle = styled.Text`
  text-align: right;
  font-size: 12px;
  font-weight: bold;
  color: #fdfdfd;
`

export const ButtonTextArea = styled.View`
  justify-content: space-between;
  flex-direction: row;
  flex-direction: row;
`

export const DateText = styled.Text`
  color: #fff;
  text-align: right;
  font-size: 16px;

`
export const ValueText = styled.Text`
  text-align: left;
  color: #fff;
  font-size: 16px;
`
