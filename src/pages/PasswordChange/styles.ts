import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button';

export const Container = styled.View`
  flex-direction: column;
`;
export const StyledForm = styled(Form)`
  position: relative;
  width: 90%;
  height: 75%;
  align-self: center;
  border-color: #eee;
  margin-top: 5%;
  border-radius: 8px;
  background-color: #fffffe;
`;
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
`;
export const Text = styled.Text`
  color: #000000;
  align-self: center;
  font-size: 19px;
  margin-bottom: 35px;
  margin-left: 2px;
  font-weight: bold;
`;
export const TextForm = styled.Text`
  font-size: 17px;
  color: #777777;
  margin-left: 13px;
  font-weight: bold;
`;
export const ConfirmButton = styled(Button)`
  align-self: center;
  margin-top: 20px;
`;
