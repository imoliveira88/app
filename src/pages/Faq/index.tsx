import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { List } from 'react-native-paper'

import Header from './../../components/Header';

import {
  Container,
  StyledForm,
  ScrollView,
  Text,
  DescriptionText
} from './styles';
import { color } from 'd3';
import Loader from '../../components/Loader';
import api from '../../services/api';

const Faq: React.FC = () => {
  const [data, setData] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFaq = async () => {
      try{
        setIsLoading(true);
        const response = await api.get('/api/faqs');
        setData(response.data.data);
        setIsLoading(false);
      }catch(e){
        setIsLoading(false);
        let message = e.response != null ? e.response.data.error : e.message;

        Alert.alert('Obs!',
          message
        );
      }
    }
    getFaq()
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
        <SafeAreaView>
          <Container>
            <StyledForm>
              <Text>FAQ</Text>
              {
                data.map((item) => (
                  <List.Accordion
                    titleStyle={{ color: '#000' }}
                    key={item.id}
                    title={item.question}
                    titleNumberOfLines={3}
                  >
                    <DescriptionText>
                      {item.answer}
                    </DescriptionText>
                  </List.Accordion>))
              }
            </StyledForm>
          </Container>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default Faq;
