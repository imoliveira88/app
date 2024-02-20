import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button';

export const Container = styled.View`
  flex-direction: column;
`
export const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #003882;
`
export const StyledForm = styled.View`
  position: relative;
  width: 100%;
  height: 92%;
  align-self: center;
  border-color: #eee;
  border-radius: 8px;
  background-color: #fffffe;
`
export const Text = styled.Text`
  color: #000000;
  margin-bottom: 6px;
`
export const HeadText = styled.Text`
  color:#000000;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 19px;
`
export const TextLine = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 15px;
  padding-right: 15px;
`
export const BackButton = styled(Button)`
  align-self: center;
  width: 60%;
  margin-top: 10px;
`
