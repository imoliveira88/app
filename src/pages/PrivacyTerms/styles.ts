import styled from 'styled-components/native'

import Button from '../../components/Button'

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fdfdfd;
  align-items: center;
  position: relative;
  padding-bottom: 120px;
  padding: 20px;
  flex: 1;
  align-items: flex-start;
`

export const TitleText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #003882;
`

export const ParagraphText = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #0f0f0f;
  margin-top: 10px;
  text-align: left;
  flex-direction: row;
`

export const FooterText = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #0f0f0f;
  margin-top: 10px;
  text-align: left;
  flex-direction: row;
`

export const ListView = styled.View`
  margin: 5px 0;
  flex: 1;
  flex-direction: column;
`

export const ListItem = styled.Text`
  font-size: 14px;
  color: #0f0f0f;
  margin: 10px 0;
  text-align: left;
  flex: 1;
`

export const SubtitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0px;
  text-align: left;
  color: #003882;
`

export const FeatureButton = styled(Button)`
  background: #fdfdfd;
  flex-direction: column;
  align-items: center;
  color: black;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  position: relative;
  border: none;
`

export const Footer = styled.View`
  margin: 10px 0;
`
export const FooterAction = styled.View`
  margin: 10px 0;
`

export const AcceptTermsButton = styled(Button)`
  background: #003882;
  flex-direction: row;
  align-items: center;
  color: black;
  width: 100%;
  border-radius: 8px;
  position: relative;
  border: none;
  margin: 20px 0;
  height: 60px;
`
export const ButtonText = styled.Text`
  font-size: 18px;
  line-height: 18px;
`

export const ListTableHead = styled.View`
  text-align: left;
  margin-top: 10px;
  flex: 1;
  flex-direction: row;
  background-color: #e2e2e2;
  padding: 0 10px;
`

export const ListTable = styled.View`
  font-size: 14px;
  color: #0f0f0f;
  margin: 1px 0;
  text-align: left;
  flex: 1;
  flex-direction: row;
  background-color: #e2e2e2;
  padding: 10px;
`

export const ListTableItem = styled.Text`
  font-size: 12px;
  color: #0f0f0f;
  margin: 10px 0;
  text-align: left;
  flex: 1;
  padding: 10px;
`
export const ListTableItemHeader = styled.Text`
  font-size: 13px;
  color: #0f0f0f;
  font-weight: bold;
  margin: 10px 0;
  text-align: left;
  flex: 1;
  padding: 10px;
`
