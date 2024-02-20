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
  width: 90%;
  height: 92%;
  align-self: center;
  border-color: #eee;
  margin-top: 10%;
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
export const TitleText = styled.Text`
  font-size: 17px;
  color: #777777;
  font-weight: bold;
`;
export const ArchivesText = styled.Text`
  color: #777777;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const DescText = styled.Text`
  font-size: 13px;
  color: #777777;
  font-weight: bold;
`;
export const UploadText = styled.Text`
  font-size: 14px;
  color: #000000;
  font-weight: bold;
`;
export const UploadBox = styled.View`
  background-color: #F7F7F7;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  height: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const DocumentButton = styled(Button)`
background-color: #f7f7f7;
height: 100px;
margin-top: 15px;
margin-bottom: 15px;
color: #000000;
`;
export const DocumentButtonText = styled.Text`
  color: #000000;
`;
export const UploadButton = styled(Button)`
  flex:1;
  margin-left:5px;
  margin-right:5px;
  margin-top: 10px;
  border-radius: 8px;
`;
export const RulesBox = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;
export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ArchivesBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ArchivesButton = styled(Button)`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #CC2128;
`;
