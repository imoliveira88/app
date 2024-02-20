import React, { useState, useRef, useCallback, useEffect } from 'react'
import { TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import SelectPicker from './../../components/SelectPicker'
import FilePicker from './../../components/FilePicker';

import { FormHandles } from '@unform/core'

import Header from '../../components/Header'

import { Container, RequestForm, MessageInput, SendButton, SendButtonRed } from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { TitleText, Center } from './../../components/GlobalStyles'
import api from '../../services/api'
import Config from './../../config/config';
import KeyboardView from './../../components/KeyboardView'
import Loader from './../../components/Loader';
import axios from '../../services/api'


interface RequestFormData {
  assunto: String,
  message: string,
  contrato: string,
  tipo: string,
  anexo: any[]
}

interface RequestProps {
  navigation: {
    navigate: Function,
  }
}

const Request: React.FC<RequestProps> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState<String>('');
  const [contractNumber, setContractNumber] = useState<string>('');
  const [imagePath, setImagePath] = useState('')
  const [complaintTypes, setComplaintTypes] = useState<any>([])
  const formRef = useRef<FormHandles>(null)
  const [sendForm, setSendForm] = useState(false);
  let attachments: any[] = [];

  useEffect(() => {
    async function getComplaintTypes() {
      const response = await api.post('api/complaints/type', { value: 1 });

      setComplaintTypes(response.data);
    }

    async function getContract() {
      let data = await AsyncStorage.getItem('@Copergas:user');
      let decoded = JSON.parse(data);
      setContractNumber(decoded.contract_number);
    }

    getContract();
    getComplaintTypes();
  }, [])

  const onStartUpload = (file: any) => {
    console.log('iniciou o upload');
    console.log(file);
  }

  const onUploadFile = (files: any) => {
    attachments = files;
    console.log(attachments);
  }

  const onRemoveFile = (files: any) => {
    attachments = files;
    console.log(attachments);
  }


  const handleSubmitRequest = (data: RequestFormData): void => {
    data.assunto = selectedValue;
    data.contrato = contractNumber;
    saveData(data);
  }

  const saveData = async (data: RequestFormData): Promise<void> => {
    try {
      data.anexo = attachments.map((attachment: any) => {
        return `${attachment.serverPath}`;
      })
      data.tipo = 'solicitacao';

      setSendForm(true);
      const response = await axios.post('api/complaints/send-mobile', data);
      setSendForm(false);
      Alert.alert(
        "Sucesso!",
        `Chamado aberto com sucesso!`
        // Número do protocolo: ${response.data.protocolo}`
      );
    } catch (e) {
      setSendForm(false)

      Alert.alert(
        "Erro ao registrar reclamação!",
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
          complaintTypes.length > 0 && contractNumber != null ? (
            body()
          ) : (
              <Loader />
            )
        }
      </>
    </KeyboardView>
  )

  function body() {
    return (
      <ScrollView>
        <Container>
          <RequestForm ref={formRef} onSubmit={handleSubmitRequest}>
            <Center>
              <TitleText>Solicitações {'\n \n'} </TitleText>
            </Center>

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

            <MessageInput
              style={{ elevation: 5, textAlignVertical: 'top' }}
              multiline={true}
              placeholderTextColor="#003882"
              returnKeyType="next"
              keyboardType="ascii-capable"
              name="message"
              placeholder="Mensagem"
            />

            <FilePicker
              uploadUrl="/api/complaints/send-image"
              onUploadFile={onUploadFile}
              onRemoveFile={onRemoveFile}
              onStartUpload={onStartUpload}
            />

            <SendButtonRed isLoading={sendForm} onPress={() => formRef.current?.submitForm()}>
              Enviar
          </SendButtonRed>
          </RequestForm>
        </Container>
      </ScrollView>
    )
  }
}

export default Request
