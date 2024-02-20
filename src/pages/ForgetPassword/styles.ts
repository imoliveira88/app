import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button';

export const Container = styled.View`
  flex-direction: column;
`;
export const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #003882;
`;
export const StyledForm = styled(Form)`
  position: relative;
  width: 85%;
  height: 60%;
  align-self: center;
  border-color: #eee;
  margin-top: 44%;
  padding-top: 30px;
  border-radius: 8px;
  background-color: #fffffe;
`;
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
`;
export const HeadText = styled.Text`
  font-size: 15px;
  color: #003882;
  font-weight: bold;
  margin-left: 8px;
  margin-top: 14px;
  margin-bottom: 30px;
  text-align: center;
`;
export const Text = styled.Text`
  color: #000000;
  font-size: 19px;
  margin-bottom: 25px;
  margin-left: 2px;
  font-weight: bold;
`;
export const TextForm = styled.Text`
  font-size: 17px;
  color: #777777;
  margin-top: 15px;
  margin-left: 13px;
  font-weight: bold;
`;
export const RecoverButton = styled(Button)`
  width: 55%;
  margin: 2px auto;
  margin-top: 18px;
  border-radius: 30px;
  background-color: #003882;
`;

