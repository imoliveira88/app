import React from 'react';
import { Image } from 'react-native';
import logo from '../../assets/logo-horizontal.png';
import Input from '../../components/Input';

import {
  Container,
  Background,
  StyledForm,
  ScrollView,
  HeadText,
  Text,
  TextForm,
  RecoverButton
} from './styles';

const ForgetPassword: React.FC = () => {
  return <>
    <Background/>
    <Container>
      <StyledForm>
        <ScrollView>
          <Image source={logo} resizeMode="stretch" style={{ width: 300, height: 100, alignSelf: 'center', marginTop: 20, marginBottom: 20 }} />
            <TextForm>Contrato</TextForm>
            <Input
              icon={null}
              name="cpf"
              placeholder="Insira o seu número de contrato"
              keyboardType="numeric"
            />

            <RecoverButton>
              Recuperar senha
            </RecoverButton>

        </ScrollView>
      </StyledForm>
      </Container>
  </>
}

export default ForgetPassword;
