import styled from 'styled-components/native';
import Button from './../../../../components/Button'

export const Container = styled.View`
  flex-direction: column;
`;
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 200px;
`;
export const TextArea = styled.View`
  flex-direction: row;
  margin-top: 4px;
  margin-left: 7px;
  margin-right: 7px;
  margin-bottom: 6px;
  border-radius: 5px;
  border-color: #000;
`;
export const DescText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 5px;
  color: #7b7b7b;
`;
export const ContentBox = styled.View`
  margin-left: 7px;
  margin-right: 7px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 15px;
`;

export const aaa = styled.View`
  margin-bottom: 10px;
`
