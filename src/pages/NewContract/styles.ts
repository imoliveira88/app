import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button'
import { lighten } from 'polished';

export const Container = styled.View`
  flex-direction: column;
`;

export const InputArea = styled.View`
  flex-direction: row;
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
  width: 100%;
  height: 92%;
  align-self: center;
  border-color: #eee;
  border-radius: 8px;
  background-color: #fffffe;
`
export const HeadText = styled.Text`
  font-size: 15px;
  color: #003882;
  font-weight: bold;
  margin-left: 8px;
  margin-top: 14px;
  margin-bottom: 30px;
  text-align: center;
`

export const TextForm = styled.Text`
  font-size: 17px;
  color: #777777;
  font-weight: bold;
`
export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Col = styled.View`
  flex:1;
  margin-left: 1px;
  margin-right: 3px;
`

export const MiddleText = styled.Text`
  font-size: 14px;
  color: #000000;
  font-weight: bold;
`

export const MiddleTextBox = styled.View`
  margin-top: 30px;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`

export const FormButton = styled(Button)`
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 4px;
  background-color: #CC2128;
`

export const Text = styled.Text`
  color: #000000;
  font-size: 19px;
  margin-bottom: 25px;
  margin-left: 2px;
  font-weight: bold;
`

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
`

