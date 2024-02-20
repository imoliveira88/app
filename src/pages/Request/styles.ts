import styled from 'styled-components/native'
import { Form } from '@unform/mobile'
import Button from '../../components/Button'
import Input from '../../components/Input'

export const Container = styled.View`
`

export const RequestForm = styled(Form)`
  margin-left:15px;
  margin-right:15px;
`

export const MessageInput = styled(Input)`
  background: #eee;
  color:#003882;
  height: 250px;
  border-radius: 4px;
  text-align:left;
  font-size:18px;
  border-width: 15px;
  border-bottom-color: #eee;
`

export const SendButton = styled(Button)`
  border-radius: 8px;
`

export const SendButtonRed = styled(Button)`
  background-color:#D22E11;
  border-radius: 8px;
`

export const AnnexText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color:#003882;
`
