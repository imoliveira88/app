import React from 'react';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';


import {
  Container,
  Button,
  TitleLeft,
  TitleMiddle,
  TitleRight,
  TextLeft,
  TextMiddle,
  TextRight,
  ButtonTextArea,
} from './styles'

interface AccompanimentsProps {
  id: string,
  protocol: string,
  subject: string,
  openDate: Date,
  status: string,
  consumption:{
    cham_cd: string,
    description: string,
    operation: string,
    date_hours: string
  }
}


const Accompaniments: React.FC<AccompanimentsProps> = ({ protocol, subject, openDate, status, id, consumption }) => {
  const navigation = useNavigation()

  const ListData = {
    id: id,
    protocol: protocol,
    subject: subject,
    openDate: openDate,
    status: status,
    consumption: consumption,
  }

  return (
    <Button onPress={() => navigation.navigate('ListDetails', { ListData })}>
      {/* // <Button onPress={teste }> */}
      <Container>
        <ButtonTextArea>
          <TitleLeft>
            Assunto
          </TitleLeft>
        </ButtonTextArea>
        <ButtonTextArea>
          <TextLeft>
            {subject.substr(0, 55)+ '...'}
          </TextLeft>
        </ButtonTextArea>
        <ButtonTextArea>
          <TitleLeft>
            Protocolo:
          </TitleLeft>
          <TitleMiddle>
            Status:
          </TitleMiddle>
          <TitleRight>
            Data Abertura:
          </TitleRight>
        </ButtonTextArea>

        <ButtonTextArea>
          <TextLeft>
            {protocol}
          </TextLeft>
          <TextMiddle>
            {status}
          </TextMiddle>
          <TextRight>
            {moment(openDate).format('DD/MM/YYYY HH:mm:ss')}
          </TextRight>
        </ButtonTextArea>

      </Container>
    </Button >
  );
}

export default Accompaniments;
