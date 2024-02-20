import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import moment from 'moment';

import api from './../../../../services/api';

import {
  Container,
  ScrollView,
  TextArea,
  ContentBox,
  DescText,
} from './styles';

import { TitleText, Center } from './../../../../components/GlobalStyles';
import Header from './../../../../components/Header';
import Loader from './../../../../components/Loader';

interface ListResponse {
  rn: string,
  contrato: string,
  protocolo: string,
  assunto: string,
  chamado_tipo: string,
  data_abertura: string,
  data_encerramento: string,
  status: string,
  prazo: string,
  consumption: {
    cham_cd: string,
    descricao: string,
    operacao: string,
    data_hora: string,
  },
}
const ListDetails: React.FC = ({ route }) => {
  const { ListData } = route.params;
  const [details, setDetails] = useState<any>([]);
  const [description, setDescription] = useState("");
  const [operation, setOperation] = useState("");
  const [situation, setSituation] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function Details() {
      setIsLoading(true);
      const response = await api.get('api/accompaniments/render/' + ListData.protocol)
      const data = response.data.data[0]

      setDescription(data.consumption[0].descricao);
      setOperation(data.consumption[0].operacao);
      setSituation(data.consumption[0].situacao);
      setDetails(data);
      setIsLoading(false);
    }
    Details()
  }, [])
  return (
    <>
      <Header />
      {
        !isLoading ? (
          body()
        ) : (
          <Loader />
        )
      }
    </>
  )
  function body() {
    return (
      <ScrollView>
        <Center style={{ paddingBottom: 10 }}>
          <TitleText>Histórico</TitleText>
        </Center>
        <Container>
          <ContentBox style={{ elevation: 5, padding: "2%" }}>
            <TextArea>
              <TitleText>Protocolo: <DescText>{details.protocolo}</DescText></TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Assunto: <DescText style={{ flex: 1, flexWrap: 'wrap' }}>{details.assunto}</DescText></TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Abertura: <DescText>{moment(details.data_abertura).format('DD/MM/YYYY HH:mm:ss')}</DescText></TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Status: <DescText>{details.status}</DescText></TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Prazo: <DescText>{details.prazo}</DescText></TitleText>
            </TextArea>
          </ContentBox>

          <ContentBox style={{ elevation: 5, padding: "2%", marginTop: "2%" }}>
          <TextArea>
              <TitleText>Data e Hora: <DescText>{moment(details.consumption?.data_hora).format('DD/MM/YYYY HH:mm:ss')}</DescText> </TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Descrição: <DescText style={{ flex: 1, flexWrap: 'wrap' }}>{description}</DescText> </TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Operação: <DescText>{operation}</DescText></TitleText>
            </TextArea>
            <TextArea>
              <TitleText>Situação: <DescText>{situation}</DescText></TitleText>
            </TextArea>
          </ContentBox>
        </Container>
      </ScrollView>
    )
  }
}

export default ListDetails;
