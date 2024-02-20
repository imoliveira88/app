import styled from 'styled-components/native';
import Button from '../../../components/Button'
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
export const TextForm = styled.Text`
  font-size: 17px;
  color: #777777;
  margin-left: 4px;
  font-weight: bold;
`;
export const LoadingView = styled.View`
  padding-bottom: 20px;
  padding-top: 20px;
`;
export const ListButton = styled(Button)`
  width: 90%;
  margin: 10px auto;
`;
