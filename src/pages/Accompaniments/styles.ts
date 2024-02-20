import styled from 'styled-components/native';
import Button from '../../components/Button'
import { Form } from '@unform/mobile';

export const Container = styled.View`
  flex-direction: column;
`;
export const Text = styled.Text`
  color: #000000;
  align-self: center;
  font-size: 25px;
  margin-bottom: 25px;
  font-weight: bold;
`;
export const RequestForm = styled(Form)`
  margin-left:5px;
  margin-right:5px;
`;
export const TextForm = styled.Text`
  font-size: 17px;
  color: #777777;
  margin-left: 4px;
  font-weight: bold;
`;
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 200px;
`;
export const SearchButton = styled(Button)`
  border-radius: 8px;
`;
