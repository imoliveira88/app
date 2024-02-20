import styled from 'styled-components/native'
import Button from './../Button'

export const Container = styled.View`
  padding:10px;
`;

export const Center = styled.View`
  padding:30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.Text`
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
`

export const UserContract = styled.Text`
  margin-top: 5px;
  font-size: 18px;
`

export const LogInButton = styled(Button)`
  width: 100%;
  background-color:#003882;
`

export const Footer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const LinkText = styled.Text`
  font-size: 16px;
`