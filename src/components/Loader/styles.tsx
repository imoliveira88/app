import styled from 'styled-components/native'
import {Dimensions} from 'react-native'
const { height } = Dimensions.get('window')

export const Container = styled.View`
  position: absolute;
  left:0;
  right:0;
  height: ${height}px;
  align-items: center;
  justify-content: center;
  z-index: -1;
`
export const LoaderText = styled.Text`
   margin-top: 10px;
`
