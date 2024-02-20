import React, { useRef, useCallback, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import InputMask from '../../components/InputMask';
import Input from '../../components/Input';
import SelectPicker from './../../components/SelectPicker';

import Header from './../../components/Header';

import {
  Row,
  Col
} from './../../components/GlobalStyles';

import {
  Container,
  StyledForm,
  HeadText,
  Text,
  ButtonBox,
  FormButton,
  TextForm,
  ScrollView,
  TextContainer,
  FilterButton,
  FilterArea,
  FilterText,
  TermsBox,
  TermsText
} from './styles';
import { Alert } from 'react-native';
import getValidationErrors from '../../utils/getValidationError';

interface ContractProps {
  navigation: {
    navigate: Function,
  }
}

const NewRegister: React.FC<ContractProps> = ({ route, navigation, errors }) => {
  const { houseData } = route.params;

  const [selectedPhysicalPerson, setSelectedPhysicalPerson] = useState(true);
  const [selectedJuridicalPerson, setSelectedJuridicalPerson] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const formRef = useRef<FormHandles>(null)

  const [cpf, setCpf] = useState(null);
  const [cep, setCep] = useState(null);
  const [cnpj, setCnpj] = useState(null);
  const [phoneOne, setPhoneOne] = useState(null);
  const [phoneTwo, setPhoneTwo] = useState(null);
  const [dddOne, setDddOne] = useState(null);
  const [dddTwo, setDddTwo] = useState(null);
  const [adress, setAdress] = useState(null);
  const [houseNumber, setHouseNumber] = useState(null);
  const [houseComplement, setHouseComplement] = useState(null);
  const [sexValue, setSexValue] = useState('0');
  const [phoneOneValue, setPhoneOneValue] = useState('0');
  const [phoneTwoValue, setPhoneTwoValue] = useState('0');

  async function handleRegister(data) {
    data.cpf = cpf
    data.cnpj = cnpj
    data.cep = cep
    data.phoneOne = phoneOne
    data.phoneTwo = phoneTwo
    data.dddOne = dddOne
    data.dddTwo = dddTwo
    data.sexValue = sexValue
    data.phoneOneValue = phoneOneValue
    data.phoneTwoValue = phoneTwoValue
    data.adress = adress
    data.houseNumber = houseNumber
    data.houseComplement = houseComplement

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        cpf: selectedPhysicalPerson === true ? Yup.string().required('Cpf obrigatório') : null,
        cnpj: selectedJuridicalPerson === true ? Yup.string().required('Cnpj obrigatório') : null,
        fantasyName: selectedJuridicalPerson === true ? Yup.string().required('Nome fantasia obrigatório') : null,
        stateInscription: selectedJuridicalPerson === true ? Yup.string().required('Inscrição estadual obrigatória') : null,
        name: selectedPhysicalPerson === true ? Yup.string().required('Nome obrigatório') : null,
        //sex: Yup.number().required('sexo obrigatório'),
        mail: Yup.string().trim().email().required('email obrigatório'),
        cep: Yup.string().required('Cep obrigatório'),
        adress: Yup.string().required('Endereço obrigatório'),
        houseNumber: Yup.string().required('Número da casa é obrigatório'),
        dddOne: Yup.string().required('DDD obrigatório'),
        phoneOne: Yup.string().required('Número de celular obrigatório'),

      })

      await schema.validate(data, {
        abortEarly: false,
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        Alert.alert('Erro no Cadastro',
          'Por favor preencha todos os campos corretamente!')
        console.log(errors)
        return;
      }

    }
    toggleCheckBox === true ? navigation.navigate('HolderDocumentation') : Alert.alert('Erro', 'Por favor concorde com os termos')
    console.log(data);
  }

  function handleSelectPublicPerson() {
    setSelectedPhysicalPerson(true)
    setSelectedJuridicalPerson(false)
  }

  function handleSelectJuridicalPerson() {
    setSelectedPhysicalPerson(false)
    setSelectedJuridicalPerson(true)
  }

  function validateForm() {
    formRef.current?.submitForm();
  }

  function FillFields() {
    setCep(houseData.cep)
    setAdress(houseData.adress)
    setHouseNumber(houseData.houseNumber)
    setHouseComplement(houseData.complement)
  }

  return (
    <>
      <Header/>
      <Container>
        <StyledForm ref={formRef} onSubmit={handleRegister}>
          <ScrollView>
            <HeadText>
              Contrato de Fornecimento de Gás Canalizado Residencial para Unidades
              Consumidoras com Medição Individualizada.
            </HeadText>

            <Text>2. Registro de Titular do contrato</Text>

            <FilterArea>
              <Row>
                <Col>
                  <FilterButton style={{ elevation: 5 }}
                    image={null}
                    icon={null}
                    selected={selectedPhysicalPerson}
                    onPress={handleSelectPublicPerson}>
                    <FilterText>
                      Pessoa Física
                </FilterText>
                  </FilterButton>
                </Col>

                <Col>
                  <FilterButton style={{ elevation: 5 }}
                    image={null}
                    icon={null}
                    selected={selectedJuridicalPerson}
                    onPress={handleSelectJuridicalPerson}>
                    <FilterText>
                      Pessoa Júridica
                </FilterText>
                  </FilterButton>
                </Col>
              </Row>
            </FilterArea>

            {selectedPhysicalPerson ?

              <>
                <TextForm>Cpf*</TextForm>
                <InputMask
                  type="cpf"
                  name="cpf"
                  value={cpf}
                  onChangeText={(text: React.SetStateAction<null>) => { setCpf(text) }}
                />

                <TextForm>Nome*</TextForm>
                <Input
                  icon={null}
                  name="name"
                />

              </>
              :
              <>
                <TextForm>Cnpj*</TextForm>
                <InputMask
                  type="cnpj"
                  name="cnpj"
                  value={cnpj}
                  onChangeText={(text: React.SetStateAction<null>) => { setCnpj(text) }}
                />

                <TextForm>Nome Fantasia*</TextForm>
                <Input
                  icon={null}
                  name="fantasyName"
                />

                <TextForm>Inscrição Estadual*</TextForm>
                <Input
                  icon={null}
                  name="stateInscription"
                  keyboardType="numeric"
                />
              </>

            }
            <TextForm>Sexo*</TextForm>

            <SelectPicker
              onChange={(value: any) => setSexValue(value)}
              value={sexValue}
              items={[
                {
                  label: 'Não informado',
                  value: 0
                },
                {
                  label: 'Masculino',
                  value: 1
                },
                {
                  label: 'Feminino',
                  value: 2
                },
                {
                  label: 'Outros',
                  value: 3
                }
              ]}
            />

            <TextForm>Email para receber Fatura*</TextForm>
            <Input
              icon={null}
              name="mail"
            />
            <TextContainer>
              <Text style={{ color: "#777777" }}
              >ENDEREÇO PARA COBRANÇA
              </Text>
            </TextContainer>

            <Row>
              <Col>
                <FormButton
                  onPress={() => FillFields()}
                >
                  Replicar endereço do imóvel
              </FormButton>
              </Col>
            </Row>

            <TextForm>CEP*</TextForm>
            <InputMask
              type="zip-code"
              name="cep"
              value={cep}
              onChangeText={(text: React.SetStateAction<null>) => { setCep(text) }}
            />

            <TextForm>Endereço*</TextForm>
            <Input
              icon={null}
              defaultValue={adress}
              name="adress"
            />

            <TextForm>Número*</TextForm>
            <Input
              icon={null}
              defaultValue={houseNumber}
              name="houseNumber"
              keyboardType="numeric"
            />

            <TextForm>Complemento*</TextForm>
            <Input
              icon={null}
              defaultValue={houseComplement}
              name="HouseComplement"
            />

            <Text style={{ color: "#777777" }}>TELEFONES</Text>

            <TextForm>Tipo de Telefone 1*</TextForm>

            <SelectPicker
              onChange={(value: any) => setPhoneOneValue(value)}
              value={phoneOneValue}
              items={[
                { label: "NÃO INFORMADO", value: 0 },
                { label: "CELULAR", value: 1 },
                { label: "FIXO", value: 2 },
                { label: "TRABALHO", value: 3 }
              ]}
            />

            <TextForm>DDD*</TextForm>
            <InputMask
              type="custom"
              name="dddOne"
              options={{
                mask: '99'
              }}
              keyboardType="numeric"
              placeholder="Ex:99"
              value={dddOne}
              onChangeText={(text: React.SetStateAction<null>) => { setDddOne(text) }}
            />

            <TextForm>Número*</TextForm>
            <InputMask
              type="custom"
              name="phoneOne"
              options={{
                mask: '99999-9999'
              }}
              keyboardType="numeric"
              placeholder="Ex: 99999-9999"
              value={phoneOne}
              onChangeText={(text: React.SetStateAction<null>) => { setPhoneOne(text) }}
            />

            <TextForm>Tipo de Telefone 2</TextForm>

            <SelectPicker
              onChange={(value: any) => setPhoneTwoValue(value)}
              value={phoneTwoValue}
              items={[
                { label: "NÃO INFORMADO", value: 0 },
                { label: "CELULAR", value: 1 },
                { label: "FIXO", value: 2 },
                { label: "TRABALHO", value: 3 }
              ]}
            />

            <TextForm>DDD</TextForm>
            <InputMask
              type="custom"
              name="dddTwo"
              options={{
                mask: '99'
              }}
              keyboardType="numeric"
              placeholder="Ex: 99"
              value={dddTwo}
              onChangeText={(text: React.SetStateAction<null>) => { setDddTwo(text) }}
            />

            <TextForm>Número</TextForm>
            <InputMask
              type="custom"
              name="phoneTwoNumer"
              options={{
                mask: '99999-9999'
              }}
              keyboardType="numeric"
              placeholder="Ex: 99999-9999"
              value={phoneTwo}
              onChangeText={(text: React.SetStateAction<null>) => { setPhoneTwo(text) }}
            />

            <TermsBox>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: 'black', false: 'black' }}
              />
              <TermsText
                onPress={() => navigation.navigate('Contract')}
              >Li e concordo com os termos</TermsText>
            </TermsBox>

            <Row>
              <Col>
                <FormButton
                  onPress={() => validateForm()}
                  style={{ backgroundColor: "#CC2128" }}>Próxima Etapa</FormButton>
              </Col>
            </Row>


          </ScrollView>
        </StyledForm>
      </Container >
    </>
  )
}

export default NewRegister;
