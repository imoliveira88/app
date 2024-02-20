import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocused: boolean
}

interface TextInputProps {
  icon: string | null
  isErrored: boolean

}

export const Container = styled.View<ContainerProps>`
  background-color: #fff;
  padding: 4px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 16px;
`

export const TextInput = styled.TextInput<TextInputProps>`
  color: #aaa;
  font-size: 16px;
  border-color: #eee;
  padding-left: ${props => props.icon ? '16px' : '0px'};
  border-bottom-color: #003882;
  border-bottom-width: 2px;
  ${props => props.isErrored && css`border-bottom-color: #c53030;`}

`

export const StyledIcon = styled(Icon)`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 24px;

`
