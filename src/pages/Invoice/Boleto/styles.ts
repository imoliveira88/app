import styled from 'styled-components/native'
import Button from '../../../components/Button'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
`
export const DescriptionText = styled.Text`
 font-size: 15px;
 color: rgba(0,0,0,0.5);
 margin-top: 10px;
`

export const BillValue = styled.Text`
  margin-top: 5px;
  font-size: 35px;
  font-weight: bold;
`

export const InvoiceNumber = styled.Text`
  margin-top: 10px;
  font-size: 25px;
  text-align: center;
  color: #003882;
`

export const PDFButton = styled(Button) `
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 8px;
`

export const CopyButton = styled(Button) `
  width: 100%;
  height: 50px;
  border-radius: 8px;
  margin-bottom: 5px;
`

export const ButtonText = styled.Text`
  margin: 0 auto;
  color:#003882;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
`

export const Footer = styled.View`
`
