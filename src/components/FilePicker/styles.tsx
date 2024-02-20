import styled from 'styled-components/native'
import Button from './../../components/Button'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const SendButton = styled(Button)`
  margin-top: 10px;
  border-radius: 8px;
`

export const ArchivesContainer = styled.ScrollView`
  flex-direction: row;
  height: 150px;
  border: 1px solid #dddd;
  border-radius: 8px;
  padding: 10px;
`

export const ArchivesBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items:center;
  width: 130px;
  padding: 10px;
  margin-left:5px;
  margin-right: 5px;
  border: 1px solid #dddd;
  border-radius: 8px;
`;

export const ArchivesText = styled.Text`
  color: #777777;
  font-size: 8px;
  font-weight: bold;
  margin-top: 10px;
`;

export const ArchivesButton = styled.Text`
    margin-top: 10px;
    font-size: 16px;
    color:  #5fc9f8;
`;

export const ArchiveLoader = styled.ActivityIndicator`
    position: absolute;
`

export const ArchivesAreaIcon = styled(FontAwesome)`

`

export const ArchivesAreaText = styled.Text`
   margin-top: 10px;
   font-size: 20px;
`


export const ArchiveIcon = styled(FontAwesome)`
 
`
