import React from 'react';
import { useNavigation } from '@react-navigation/core'

import {
  Container,
  HouseButton,
  TitleLeft,
  TitleMiddle,
  TitleRight,
  TextLeft,
  TextMiddle,
  TextRight,
  ButtonTextArea,
} from './styles'

interface HousesProps {
  county: string,
  neighborhood: string,
  house: string,
  cep: string,
  id: string,
  adress: string,
  houseNumber: string,
  complement: string
}

const Houses: React.FC<HousesProps> = ({ county, neighborhood, house, cep, id, adress, houseNumber, complement }) => {
  const navigation = useNavigation()

  const houseData = {
    county: county,
    neighborhood: neighborhood,
    house: house,
    cep: cep,
    id: id,
    adress: adress,
    houseNumber: houseNumber,
    complement: complement
  }

  return (
    <HouseButton onPress={() => navigation.navigate('NewRegister', { houseData })}>
      <Container>
        <ButtonTextArea>
          <TitleLeft>
            Imóvel:
          </TitleLeft>
        </ButtonTextArea>

        <ButtonTextArea>
          <TextLeft>
            {house}
          </TextLeft>
        </ButtonTextArea>

        <ButtonTextArea>
          <TitleLeft>
            Estado:
          </TitleLeft>
          <TitleMiddle>
            Bairo:
          </TitleMiddle>
          <TitleRight>
            CEP:
          </TitleRight>
        </ButtonTextArea>

        <ButtonTextArea>
          <TextLeft>
            {county}
          </TextLeft>
          <TextMiddle>
            {neighborhood}
          </TextMiddle>
          <TextRight>
            {cep}
          </TextRight>
        </ButtonTextArea>
      </Container>
    </HouseButton>
  )
}

export default Houses;
