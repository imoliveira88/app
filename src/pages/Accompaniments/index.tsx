import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { FormHandles } from '@unform/core';
import api from './../../services/api';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

import {
  ScrollView,
  Container,
  RequestForm,
  SearchButton,
} from './styles';
import { TitleText, Center } from './../../components/GlobalStyles';
import SelectPicker from './../../components/SelectPicker';
import Header from './../../components/Header';
import Loader from './../../components/Loader';
import AccompanimentsCard from './../Accompaniments';

interface AccompanimentsResponse {
  protocolo: string,
  assunto: string,
  data_abertura: Date,
  status: string,
  consumption:{
    cham_cd: string,
    description: string,
    operation: string,
    date_hours: string
  },
  rn: number,
}

interface AccompanimentsProps {
  navigation: {
    navigate: Function,
  }
}

const Accompaniments: React.FC<AccompanimentsProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [listData, setListData] = useState()
  const formRef = useRef<FormHandles>(null);

  const [openDate, setOpenDate] = useState<Date>();
  const [protocol, setProtocol] = useState();
  const [subject, setSubject] = useState('');
  const [statusType, setStatusType] = useState(" ");

  function HandleSearch(data: any) {
    setOpenDate(data.openDate)
    setStatusType(data.statusType)
    setProtocol(data.protocol)
    setSubject(data.subjec)
  }

  async function LoadAccompaniments() {
    formRef.current?.submitForm();
    navigation.navigate('List', { protocol: protocol, openDate: openDate, statusType: statusType, subject: subject });
  }

  return (
    <ScrollView>
      <Header />
      {
        !isLoading ? (
          body()
        ) : (
          <Loader />
        )
      }
    </ScrollView>
  )
  function body() {
    return (
      <SafeAreaView>
        <Container>
          <RequestForm ref={formRef} onSubmit={HandleSearch}>

            <Center>
              <TitleText style={{ marginBottom: 20 }}>Acompanhar chamados</TitleText>
            </Center>

            <TitleText>Protocolo</TitleText>
            <Input
              name="protocol"
              placeholder="protocolo"
              keyboardType="numeric"
              onChangeText={(value: any) => setProtocol(value)}
            />

            <TitleText>Assunto</TitleText>
            <Input
              name="subject"
              placeholder="assunto"
              onChangeText={(value: any) => setSubject(value)}
            />

            <TitleText>Data de Abertura</TitleText>
            <InputMask
              type={'datetime'}
              value={openDate}
              options={{
                format: 'DD/MM/YYYY'
              }}
              name="openDate"
              placeholder="data de abertura"
              onChangeText={(text: React.SetStateAction<null>) => { setOpenDate(text) }}
            />

            <TitleText>Selecione o tipo de Status</TitleText>
            <SelectPicker
              onChange={(value: any) => setStatusType(value)}
              value={statusType}
              items={[
                {
                  label: 'Aberto',
                  value: "Aberto"
                },
                {
                  label: 'Em andamento',
                  value: "Em andamento"
                },
                {
                  label: 'Finalizado',
                  value: "Finalizado"
                }
              ]}
            />
            <SearchButton
              isLoading={isSearching}
              style={{ elevation: 5 }}
              onPress={LoadAccompaniments}
            >
              Pesquisar
            </SearchButton>

          </RequestForm>
        </Container>
      </SafeAreaView>
    )
  }
}

export default Accompaniments;
