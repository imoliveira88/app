import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'


import {
  Container,
  Background,
  StyledForm,
  ScrollView,
  HeadText,
  Text,
  TitleText,
  DescText,
  UploadButton,
  RulesBox,
  DocumentButton,
  DocumentButtonText,
  ArchivesText,
  ButtonBox,
  ArchivesBox,
  ArchivesButton
} from './styles';

interface HolderDocumentationProps {
  navigation: {
    navigate: Function,
  }
}

const HolderDocumentation: React.FC<HolderDocumentationProps> = ({navigation}) => {
  const [identificationDocs, setIdentificationDocs] = useState<any>([]);
  const [residenceDocs, setResidenceDocs] = useState<any>([]);


  async function IdentificationDocUpload () {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type,
          res.name,
          res.size
        );
      }
      setIdentificationDocs(results)
      console.log(results)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
    console.log(identificationDocs);
  }

  async function ResidenceDocUpload () {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type,
          res.name,
          res.size
        );
      }
      setResidenceDocs(results)
      console.log(results)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }

  }

  function clearIdentificationDocs () {
    setIdentificationDocs([])
  }

  function clearResidenceDocs () {
    setResidenceDocs([])
  }

  function cancelArchive (item) {
    console.log(identificationDocs[3])
  }
  return (
    <>
      <Background>
        <Container>
          <StyledForm
          >
            <ScrollView>
              <HeadText>
                Contrato de Fornecimento de Gás Canalizado Residencial para Unidades
                Consumidoras com Medição Individualizada.
              </HeadText>

              <Text>3. Envio de Documentação do Titular</Text>

              <TitleText>1° Documento de Identificação com CPF, foto e assinatura</TitleText>
              <DescText>RG, CNH, Passaporte ou Carteira Profissional</DescText>

              <DocumentButton icon={null} image={null} onPress={IdentificationDocUpload}>
                <DocumentButtonText>
                  Anexar Arquivo
                </DocumentButtonText>
              </DocumentButton>

              <RulesBox>
                <DescText style={{ color: "#000000" }}>Regras: </DescText>
                <DescText>Limite de arquivos: 5 – Tamanho total: 13MB</DescText>
              </RulesBox>

              {
                identificationDocs.map( (item) => (
                  <ArchivesBox>
                    <ArchivesText>°{item.name}</ArchivesText>
                    <ArchivesButton onPress={cancelArchive}> X </ArchivesButton>
                  </ArchivesBox>
                ) )
              }

              <ButtonBox>
                <UploadButton image={null} icon={null}>
                  Enviar arquivos
                </UploadButton>

                <UploadButton image={null} icon={null} style={{ backgroundColor: "#CC2128" }}
                  onPress={clearIdentificationDocs}
                >
                  Limpar campos
                </UploadButton>
              </ButtonBox>



              <TitleText>2° Comprovante de Residência do imóvel consumidor de gás</TitleText>

              <DescText>Uma das opções abaixo:</DescText>
              <DescText>a) Conta de Celpe, Compesa, Internet, Telefone, Condomínio, IPTU, etc.</DescText>
              <DescText>b) Contrato de Compra e Venda ou de Aluguel (com todas as assinaturas das partes)</DescText>
              <DescText>c) Declaração de Residência ou de Propriedade da Construtura/Imobiliária/Administradora</DescText>
              <DescText>(com assinatura da Construtora/Imobiliária/Administradora)</DescText>

              <DocumentButton icon={null} image={null} onPress={ResidenceDocUpload}>
                <DocumentButtonText>
                  Anexar Arquivo
                </DocumentButtonText>
              </DocumentButton>

              <RulesBox>
                <DescText style={{ color: "#000000" }}>Regras: </DescText>
                <DescText>Limite de arquivos: 5 – Tamanho total: 13MB</DescText>
              </RulesBox>
              {
                residenceDocs.map( (item) => ( <ArchivesText>°{item.name}</ArchivesText>) )
              }

              <ButtonBox>
                <UploadButton image={null} icon={null} >
                  Enviar arquivos
                </UploadButton>

                <UploadButton image={null} icon={null} style={{ backgroundColor: "#CC2128" }}
                  onPress={clearResidenceDocs}
                >
                  Limpar Campos
                </UploadButton>
              </ButtonBox>


              <UploadButton style={{ backgroundColor: "#CC2128" }}
                onPress={() => navigation.navigate('Login')}
              >
                Enviar contrato
              </UploadButton>
            </ScrollView>
          </StyledForm>
        </Container>
      </Background>

    </>
  )
}

export default HolderDocumentation;
