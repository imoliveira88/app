import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface TextInputProps {
  icon: string | null
}

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #003882;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`

export const ButtonText = styled.Text<TextInputProps>`
  margin-top: 6px;
  font-weight: bold;
  color: #eee;
  font-size: 16px;
  line-height: 27px;
  padding-left: ${props => props.icon ? '16px' : '0px'};
  text-align:center;
  line-height: 16px;
`

export const StyledIcon = styled(Icon)`
  position: absolute;

  height: 20px;
  width: 20px;
  top: 24px;
`
