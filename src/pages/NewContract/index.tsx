import React, { useEffect, useRef, useState } from 'react';
import { FlatList, LogBox, SafeAreaView} from 'react-native';
import { FormHandles } from '@unform/core';

import Header from './../../components/Header'
import SelectPicker from './../../components/SelectPicker'
import { Col } from './../../components/GlobalStyles'

import Input from '../../components/Input';
import api from '../../services/api'

import {
  Container,
  StyledForm,
  HeadText,
  TextForm,
  FormButton,
  ButtonBox,
  Text,
  ScrollView,
} from './styles';
import { Alert } from 'react-native';
import Houses from '../../components/Houses'

interface HousesResponse {
  cep_nm_municipio: string,
  cep_nm_bairro: string,
  imov_nm: string,
  cep_nr: string,
  rn: string,
  endereco: string,
  numero: string,
  complemento: string,
}

const NewContract: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const [cityValue, setCityValue] = useState<any>(null)
  const [neighborhoodValue, setNeighborhoodValue] = useState<any>(null)
  const [cities, setCities] = useState<any>([])
  const [houseValue, setHouseValue] = useState<any>(null)
  const [houseList, setHouseList] = useState<HousesResponse[]>([])
  const [neighborhoods, setNeighborhoods] = useState<any>([])

  const [loaderCity, setLoaderCity] = useState(false);
  const [loaderNeiborhood, setLoaderNeiborhood] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showHouses, setShowHouses] = useState(false)

  useEffect(() => {
    async function LoadCities() {
      setLoaderCity(true);
      const response = await api.get('api/online-contracts-cities')
      setCities(response.data);
      setLoaderCity(false);
    }
    LoadCities();
  }, []);

  function clearFields() {
    setCityValue(null);
    setNeighborhoodValue(null);
    setHouseValue(null);
    setShowHouses(false);
  }

  async function selectCity(city) {
    setLoaderNeiborhood(true);
    const response = await api.get(`api/online-contracts-neighborhoods?city=${city}`);
    setNeighborhoods(response.data);

    setCityValue(city);

    setLoaderNeiborhood(false);
  }

  async function houseFilter() {
    if(!cityValue || !neighborhoodValue || !houseValue) {
       Alert.alert('Erro na busca', 'Por favor preencha os campos corretamente')
       return;
    }

    setIsLoading(true);

    const response = await api.post('api/online-contracts', {
      city: cityValue,
      neighborhood: neighborhoodValue,
      place: houseValue.trim()
    })
    const housesData = response.data.data
    const formatedHouseList = housesData.map((item: HousesResponse) => ({
      ...item,
      county: item.cep_nm_municipio,
      neighborhood: item.cep_nm_bairro,
      house: item.imov_nm,
      cep: item.cep_nr,
      id: item.rn,
      adress: item.endereco,
      houseNumber: item.numero,
      complement: item.complemento,
    }))

    setIsLoading(false);

    setHouseList(formatedHouseList);
    setShowHouses(true);
  }

  return (
    <SafeAreaView>
      <Header/>
      <Container>
        <StyledForm ref={formRef} onSubmit={houseFilter} style={{ elevation: 5 }}>
          <ScrollView>
            <HeadText>
              Contrato de Fornecimento de Gás Canalizado Residencial para Unidades
              Consumidoras com Medição Individualizada.
              </HeadText>

            <Text>1. Busca de Imóveis</Text>

            <TextForm>Cidade*</TextForm>

            <SelectPicker
              onChange={(value: any) => selectCity(value)}
              value={cityValue}
              placeholder={loaderCity == true ? 'Carregando...' : null}
              items={cities.map((item: any) => {
                return {
                  label: item.cidades,
                  value: item.cidades
                }
              })}
            />

            <TextForm>Bairro*</TextForm>

            <SelectPicker
              onChange={(value: any) => setNeighborhoodValue(value)}
              value={neighborhoodValue}
              placeholder={loaderNeiborhood == true ? 'Carregando...' : null}
              items={neighborhoods.map((item: any) => {
                return {
                  label: item.bairros,
                  value: item.bairros
                }
              })}
            />

            <TextForm>Imóvel*</TextForm>
            <Input
              icon={null}
              name="place"
              defaultValue={houseValue}
              onChangeText={text => setHouseValue(text)}
            />

            <ButtonBox>
              <Col>
                <FormButton
                  isLoading={isLoading}
                  onPress={() => houseFilter()}
                >Pesquisar</FormButton>
              </Col>

              <Col>
                <FormButton
                  onPress={() => clearFields()}
                >Limpar</FormButton>
              </Col>
            </ButtonBox>

            {showHouses === true ?
              <FlatList
                data={houseList}
                renderItem={({ item }) =>

                  <Houses
                    county={item.cep_nm_municipio}
                    neighborhood={item.cep_nm_bairro}
                    house={item.imov_nm}
                    cep={item.cep_nr}
                    id={item.rn}
                    adress={item.endereco}
                    complement={item.complemento}
                    houseNumber={item.numero}
                  />
                }
                initialNumToRender={houseList.length}
                keyExtractor={(item) => item.rn.toString()}
              /> : <TextForm></TextForm>}


          </ScrollView>
        </StyledForm>
      </Container>
    </SafeAreaView>
  )
}

export default NewContract;
