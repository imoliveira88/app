import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button'
import { lighten } from 'polished';

interface FilterButtonProps {
  selected: boolean
}

export const Container = styled.View`
  flex-direction: column;
`;
export const FilterButton = styled(Button)<FilterButtonProps>`
  background: ${props => props.selected ? lighten(0.7, '#003882') : '#fdfdfd'};
  border-radius: 4px;
`;
export const FilterArea = styled.View`
  margin:0px 0 24px;
`;

export const FilterText = styled.Text`
  color: #003882;
`;
export const TextContainer = styled.View`
  align-items: center;
`;
export const InputArea = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const StyledForm = styled(Form)`
  position: relative;
  width: 100%;
  height: 92%;
  align-self: center;
  border-color: #eee;
  border-radius: 8px;
  background-color: #fffffe;
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
  margin-left: 9px;
  font-weight: bold;
`;
export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const FormButton = styled(Button)`
  border-radius: 10px;
  background-color: #003882;
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
`;
export const TermsBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;
export const TermsText = styled.Text`
  font-size: 13px;
  color: #777777;
  font-weight: bold;
  margin-left: 5px;
`;
