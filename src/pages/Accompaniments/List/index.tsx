import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, View, Text, Alert } from 'react-native';
import api from './../../../services/api';

import {
  LoadingView,
  Container,
  ListButton
} from './styles';
import { TitleText, Center } from './../../../components/GlobalStyles';
import AccompanimentsCard from './../../../components/AccompanimentsCard';
import Header from './../../../components/Header';
import Loader from './../../../components/Loader';
import ServerContext from '@react-navigation/native/lib/typescript/src/ServerContext';
import Button from '../../../components/Button';
import { createIconSetFromFontello } from 'react-native-vector-icons';

interface ListProps {
  navigation: {
    navigate: Function,
  }
}

interface AccompanimentsResponse {
  protocolo: string,
  assunto: string,
  data_abertura: Date,
  status: string,
  rn: number,
}

const List: React.FC<ListProps> = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [formatedData, setFormatedData] = useState<any>([])
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { protocol, openDate, statusType, subject } = route.params;

  const request = {
    params: {
      "protocolo": protocol,
      "data_abertura": openDate,
      "status": statusType,
      "assunto": subject
    }
  };

  useEffect(() => {

    setIsLoading(true);
    loadAccompaniments()
  }, [])

  async function loadAccompaniments() {
    // console.log(request);
    // setIsLoadingMore(true);

    try {
      const response = await api.get('api/accompaniments/search', request)
      console.log(request)
      // console.log(response.data.data)
      const data = response.data.data
      let returnData = formatedData;
      // console.log(response.data)
      if(!data){
        Alert.alert('Erro', 'Nenhum chamado encontrado!',
        [{
          text: "OK", onPress: () => navigation.navigate('Accompaniments')
        }])
      }else{
        await data.forEach((item: any) => {
          returnData.push({
            protocol: item.protocolo,
            subject: item.assunto,
            openData: item.data_abertura,
            status: item.status,
            id: item.id,
          });
        });
      }
      setFormatedData(returnData);
      setPage(response.data.current_page)
      setLastPage(response.data.last_page)

      // console.log(page, lastPage);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
      setIsLoading(false);
      // setIsLoadingMore(false);
    }
  }
  async function LoadMore() {
    setIsLoadingMore(true);
    const currentPage = page + 1;
    // console.log(page);
    try {
      const response = await api.get("api/accompaniments/search?page=" + currentPage, request)
      const data = response.data.data
      let returnData = formatedData;

      await data.forEach((item: any) => {
        returnData.push({
          protocol: item.protocolo,
          subject: item.assunto,
          openData: item.data_abertura,
          status: item.status,
          id: item.id,
        });
      });
      setFormatedData(returnData);
      setPage(response.data.current_page);
      setIsLoadingMore(false)
    } catch (e) {
      setIsLoadingMore(false)
      console.log(e)
    }
  }

  function renderFooter() {
    if (page < lastPage) {
      return (<LoadingView>
        <ListButton style={{ elevation: 5 }} isLoading={isLoadingMore} onPress={LoadMore}>
          Carregar mais
      </ListButton>
      </LoadingView>)

    } else {
      return null;
    }
  }

  return (
    <>
      <Header/>
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
      <><SafeAreaView>
        <Container >
          <Center style={{ paddingBottom: 25 }}>
            <TitleText>
              Lista de Chamados
          </TitleText>
          </Center>
          <FlatList
            style={{ backgroundColor: '#eaeaea', height: '91%' }}
            data={formatedData}
            renderItem={({ item }) =>

              <AccompanimentsCard
                protocol={item.protocol}
                subject={item.subject}
                openDate={item.openData}
                status={item.status}
                id={item.rn}
              />
            }

            initialNumToRender={formatedData?.length}
            keyExtractor={(item) => item.rn?.toString()}
          // onEndReached={loadMore}
          // onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          />
        </Container>
      </SafeAreaView>
      </>
    )
  }
}

export default List;
