import styled from 'styled-components/native'
import Button from '../../components/Button'
export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fdfdfd;
  align-items: center;
  position: relative;
  padding-bottom: 120px;
`
export const FeatureButton = styled(Button)`
  background: #fdfdfd;
  flex-direction: column;
  align-items: center;
  color: black;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  position: relative;
  border: none;
`
export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #003882;
`
