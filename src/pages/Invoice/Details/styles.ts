import styled from 'styled-components/native'
import Button from '../../../components/Button'
import {RectButton} from 'react-native-gesture-handler'
import {lighten} from 'polished'


export const Container = styled.View`
  background: #fdfdfd;
  align-items: center;
  justify-content: flex-start;
  flex: 1;

`

export const BillValue = styled.Text`
  color: #fdfdfd;
  text-align: center;
  justify-content: center;
  margin: auto 0;
  font-size: 18px;
  font-weight: bold;
  padding: 8px;
`

export const DetailArea = styled.View`
  height: 70%;
  width: 89%;
  border-radius: 4px;
  background: #003882;
  margin-top: 32px;
  margin-bottom: 16px;

`

export const PDFButton = styled(RectButton) `
  width: 89%;
  height: 7%;
  margin-bottom: 16px;
  background: ${lighten(0.6, '#003882')};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  margin: 0 auto;
  color:#003882;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
`


