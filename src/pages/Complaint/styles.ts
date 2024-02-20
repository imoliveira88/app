import styled from 'styled-components/native'
import { Form } from '@unform/mobile'
import Button from '../../components/Button'
import Input from '../../components/Input'

export const Container = styled.View`
`
export const ComplaintForm = styled(Form)`
  margin-left:15px;
  margin-right:15px;
`

export const MessageInput = styled(Input)`
  background: #EAEAEA;
  padding: 8px;
  height: 250px;
  color:#003882;
  border-radius: 4px;
  font-size:18px;
  border-bottom-color: #EAEAEA;
`

export const SendButtonRed = styled(Button)`
  border-radius: 8px;
  background-color:#D22E11;
`

export const AnnexText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color:#003882;
`
