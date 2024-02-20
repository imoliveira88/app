import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SelectPicker from './../../components/SelectPicker';
import FilePicker from './../../components/FilePicker';

import { FormHandles } from '@unform/core'

import Header from '../../components/Header'

import { Container, ComplaintForm, MessageInput, SendButtonRed } from './styles'
import { TitleText, Center } from './../../components/GlobalStyles'
import axios from '../../services/api'
import { ScrollView } from 'react-native-gesture-handler'

import Loader from './../../components/Loader';
import KeyboardView from './../../components/KeyboardView'
import config from './../../config/config';
import api from '../../services/api';
import { Title } from 'react-native-paper';


interface ComplaintFormData {
  assunto: String,
  message: string,
  contrato: string,
  tipo: string,
  anexo: any[]
}

interface ComplaintProps {
  navigation: {
    navigate: Function,
  }
}

const Complaint: React.FC<ComplaintProps> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState<String>('')
  const [contractNumber, setContractNumber] = useState<string>('');
  const [complaintTypes, setComplaintTypes] = useState<any>([]);
  const [sendForm, setSendForm] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showDropzone, setShowDropzone] = useState(false);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const apiUrl = config.API_ENDPOINT;
  let attachments: any[] = [];

  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    async function getContract() {
      let data = await AsyncStorage.getItem('@Copergas:user');
      let decoded = JSON.parse(data);
      setContractNumber(decoded.contract_number);
    }
    getContract();
  }, [])

  async function getTypesBySubject(data) {
    setIsLoading2(true)
    setShowSecondPart(true);
    try {
      const response = await axios.post('api/complaints/type', { value: data });
      setComplaintTypes(response.data);
      setIsLoading2(false);
      setShowDropzone(true);
    } catch (e) {
      setIsLoading2(false);
      let message = e.response != null ? e.response.data.error : e.message;
      Alert.alert('Erro', message)
    }
  }

  const handleSubmitComplaint = (data: ComplaintFormData): void => {
    data.assunto = selectedValue;
    data.contrato = contractNumber;
    saveData(data);
  }

  const onStartUpload = (file: any) => {
    console.log('iniciou o upload');
    setIsUploading(true);
  }

  const onUploadFile = (files: any) => {
    console.log(files)
    setIsUploading(false);
    attachments = files;
  }

  const onRemoveFile = (files: any) => {
    attachments = files;
  }

  const saveData = async (data: ComplaintFormData): Promise<void> => {
    try {
      data.anexo = attachments.map((attachment: any) => {
        return `${apiUrl}/${attachment.serverPath}`;
      })
      setSendForm(true);
      const response = await api.post('api/complaints/send', data);
      setSendForm(false);
      Alert.alert(
        "Sucesso!",
        `Chamado aberto com sucesso!`,
        // Número do protocolo: ${response.data.protocolo}`
        [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ],
      );
    } catch (e) {
      setSendForm(false)
      Alert.alert(
        "Erro ao registrar chamado!",
        e.response.data.error,
        [
          { text: "OK", onPress: () => navigation.pop() }
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <KeyboardView>
      <>
        <Header />
        {
          isLoading == false && contractNumber != null ? (
            body()
          ) : (
            <Loader />
          )
        }
      </>
    </KeyboardView>
  )

  function secondPart() {
    return (
      <>
        {
          isLoading2 == false ? (
            <>
              <TitleText>
                {'Selecione o tipo de chamado'}
              </TitleText>

              <SelectPicker
                onChange={(value: any) => setSelectedValue(value)}
                value={selectedValue}
                items={complaintTypes.map((item: any) => {
                  return {
                    label: item.assunto,
                    value: item.cod_assunto
                  }
                })}
              />
            </>
          ) : (
            <TitleText>{'Carregando...'}</TitleText>
          )
        }
      </>


    )
  }

  function body() {
    return (
      <ScrollView>
        <Container>
          <ComplaintForm style={{ marginBottom: 0 }} ref={formRef} onSubmit={handleSubmitComplaint}>

            <Center>
              <TitleText>Chamados {'\n \n'}</TitleText>
            </Center>

            <TitleText>
              {'Selecione o tipo de assunto'}
            </TitleText>

            <SelectPicker
              onChange={(value: any) => getTypesBySubject(value)}
              value={setSelectedType}
              items={[
                {
                  label: 'Reclamações',
                  value: 0
                },
                {
                  label: 'Solicitações',
                  value: 1
                },
              ]}
            />

            {
              showSecondPart == true ? (
                secondPart()
              ) : (
                null
              )
            }

            <MessageInput
              placeholderTextColor="#003882"
              multiline={true}
              keyboardType="ascii-capable"
              name="message"
              placeholder="Mensagem"
            />

            {
              showDropzone == true ? (
                <FilePicker
                  uploadUrl="/api/complaints/send-image"
                  onUploadFile={onUploadFile}
                  onRemoveFile={onRemoveFile}
                  onStartUpload={onStartUpload}
                />
              ) : (
                null
              )
            }
            {
              isUploading == false ? (
                <SendButtonRed isLoading={sendForm} onPress={() => formRef.current?.submitForm()}>
                  Enviar
                </SendButtonRed>
              ) : (
                <SendButtonRed
                  isLoading={isUploading}
                  onPress={() => {}}
                >
                  Carregando imagem...
                </SendButtonRed>
              )
            }
          </ComplaintForm>
        </Container>
      </ScrollView>
    )
  }
}

export default Complaint
