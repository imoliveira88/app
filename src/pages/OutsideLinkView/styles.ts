import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const Loading = styled(ActivityIndicator)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
