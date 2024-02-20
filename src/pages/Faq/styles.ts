import { Form } from '@unform/mobile';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
`;
export const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
export const StyledForm = styled(Form)`
  position: relative;
  width: 100%;
  border-color: #eee;
  border-radius: 8px;
  background-color: #fffffe;
`;
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 200px;
`;
export const Text = styled.Text`
  color: #000000;
  align-self: center;
  font-size: 25px;
  margin-bottom: 25px;
  font-weight: bold;
`;
export const SubTitleView = styled.View`
  flex-direction: row;
  padding-left: 10;
  padding-top: 5;
`;
export const DescriptionText = styled.Text`
  color: #000000;
  padding-left: 17px;
  padding-right: 17px;
`;

