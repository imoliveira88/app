import styled from 'styled-components/native'
import { Form } from '@unform/mobile'
import Button from '../../components/Button'
import { lighten } from 'polished'

export const Container = styled.View`
  flex-direction: column;
`
export const ContainerLogo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
export const LoginCard = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`

export const InputArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #003882;
`

export const StyledForm = styled(Form)`
  position: relative;
  width: 90%;
  align-self: center;
  border-radius: 8px;
  padding-bottom: 30px;
  background-color: #fffffe;
  padding-left:15px;
  padding-right: 15px;
`
export const LogInButton = styled(Button)`
  width: 100%;
  margin: 10px auto;
  background-color:#d42e12;
`

export const NewContractButton = styled(Button)`
  width: 100%;
`

export const ForgotPasswordText = styled.Text`
  text-align: right;
  color: #003882;
  margin-right: 30px;
  margin-bottom: 32px;
  font-size: 12px;
  font-weight: bold;
`

export const ForgotPasswordActionBox = styled.TouchableOpacity`
  align-items: center;
  margin: 0 auto;
  border-radius: 4px;
  width: 90%;
  height: 141px;
  background: ${lighten(0.7, '#003882')};
  right: 1px;
  bottom: 1px;
  z-index: 10;
  margin-bottom: 8px;
`

export const ActionBoxText = styled.Text`
  padding: 8px;
  text-align: center;
  color: ${lighten(0.1, '#003882')};
  font-size: 12px;
`

export const HighlightedText = styled(ActionBoxText)`
  color: ${lighten(0.3, '#003882')};
  font-weight: bold;
  padding: 0;

`
