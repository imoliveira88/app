import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView } from 'react-native'
import {
  Container,
  ListView,
  ListItem,
  ParagraphText,
  TitleText,
  SubtitleText,
  FooterText,
  Footer,
  FooterAction,
  AcceptTermsButton,
  ButtonText,
  ListTable,
  ListTableItem,
  ListTableHead,
  ListTableItemHeader
} from './styles'

interface PrivacyTermsProps {
  navigation: {
    navigate: Function
    replace: Function
    setParams: Function
  }
}

const PrivacyTerms: React.FC<PrivacyTermsProps> = ({ navigation }) => {
  const handleAcceptTerms = async (): Promise<void> => {
    await AsyncStorage.setItem('@copergas:agreedPrivaryTerms', 'true')
    navigation.navigate('Login')
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <Header /> */}
      <Container>
        <TitleText>AVISO DE PRIVACIDADE DO APLICATIVO COPERGÁS</TitleText>
        <ParagraphText>
          Agradecemos por baixar o nosso aplicativo! Este Aviso de Privacidade
          destina-se a ajudar o usuário a entender quais dados são coletados,
          por que são coletados e a sua utilização. Este Aviso é muito
          importante, esperamos que os usuários disponibilizem um tempo para
          lê-lo com atenção.
        </ParagraphText>
        <ParagraphText>
          Nosso aplicativo alimenta-se de alguns dados para prover o seu
          serviço. Para deixar claro ao usuário quais dados são coletadas,
          criamos este documento, onde explicamos detalhadamente os seguintes
          pontos:
        </ParagraphText>
        <ListView>
          <ListItem>{'\u2B24' + ' '} Quais dados são coletados;</ListItem>
          <ListItem>{'\u2B24' + ' '} Por que são coletadas;</ListItem>
          <ListItem>{'\u2B24' + ' '} Como os dados serão utilizados;</ListItem>
          <ListItem>
            {'\u2B24' + ' '} Bases legais do tratamento de dados conforme Art.
            7° da Lei Geral de Proteção de Dados Pessoais (LGPD).
          </ListItem>
        </ListView>
        <ParagraphText>
          Tentamos manter tudo o mais simples possível, mas caso haja alguma
          dúvida sobre termo relacionado à privacidade e proteção de dados, ou
          necessidade de mais informações acerca dos processos descritos neste
          documento, entre em contato conosco através do e-mail:
          epd@copergas.com.br
        </ParagraphText>
        <SubtitleText>DADOS COLETADOS E SUA FINALIDADE</SubtitleText>
        <ParagraphText>
          Nosso objetivo é a clareza quanto aos dados que obtivermos do usuário,
          de modo que o usuário possa fazer escolhas importantes sobre como eles
          serão utilizados, visando a proteção de dados e de sua privacidade.
          Por exemplo, o usuário pode escolher não dar a informação sobre sua
          localização real. Sabendo que esta decisão tornará a sua experiência
          com o aplicativo e suas funcionalidades inferior.
        </ParagraphText>
        <ParagraphText>
          Para prover um melhor serviço nós prevemos capturar alguns dados,
          abaixo vamos descrever quais são eles e como os utilizamos:
        </ParagraphText>
        <ListTableHead>
          <ListTableItemHeader>Dados coletados</ListTableItemHeader>
          <ListTableItemHeader>Finalidade</ListTableItemHeader>
        </ListTableHead>
        <ListTable>
          <ListTableItem>
            Dados do dispositivo: versão do sistema operacional, informação
            sobre a rede móvel ou wi-fi e modelo do hardware.
          </ListTableItem>
          <ListTableItem>
            Estas informações servem para testar a conectividade com a internet
            e para consultar dados do nosso WebService, onde estão os dados do
            usuário, como: boletos, descritivos de consumo e demais informações.
          </ListTableItem>
        </ListTable>
        <ListTable>
          <ListTableItem>Dados de localização real do usuário.</ListTableItem>
          <ListTableItem>
            Quando o usuário seleciona alguma solicitação de informações ou
            relata alguma emergência, coletamos a sua localização para que a
            pessoa que irá resolver o chamado possa visualizar a localização
            real de onde o chamado partiu.
          </ListTableItem>
        </ListTable>
        <ListTable>
          <ListTableItem>
            Dados sobre a câmera do usuário, como: disponibilidade de acesso à
            câmera e fotos.
          </ListTableItem>
          <ListTableItem>
            Para tratar da melhor forma possível o chamado realizado através do
            aplicativo, possibilitamos que o usuário anexe fotos ao chamado para
            tornar mais clara a situação encontrada.
          </ListTableItem>
        </ListTable>

        <ListTable>
          <ListTableItem>Número do contrato.</ListTableItem>
          <ListTableItem>
            Para que o usuário realize o login e as informações referentes ao
            seu contrato possam ser visualizadas e processadas, visando a tomada
            de decisões e ações do próprio usuário.
          </ListTableItem>
        </ListTable>

        <ListTable>
          <ListTableItem>Número do CPF.</ListTableItem>
          <ListTableItem>
            Dado necessário apenas para realização do primeiro acesso no
            aplicativo. Este dado é utilizado para a segurança do usuário, sendo
            possível a checagem quanto a sua própria identidade.
          </ListTableItem>
        </ListTable>

        <ListTable>
          <ListTableItem>
            - Nome completo; - Número do CPF; - Endereço para cobrança; -
            Telefone para contato; - E-mail; - Documento de identificação com
            CPF, foto e assinatura; - Comprovante de residência.
          </ListTableItem>
          <ListTableItem>
            Caso o usuário clique em “Quero ser Cliente” -> Dados pessoais de contato são solicitados para o devido retorno ao cliente. Já a coleta de documento pessoais com foto e comprovante de residência são necessários como documentos obrigatórios para elaboração de contrato de fornecimento residencial de gás, ou seja, seu tratamento está embasado na finalidade contratual.
          </ListTableItem>
        </ListTable>

        <ParagraphText>
          Todas as informações que processamos, são coletadas a partir do uso
          que o usuário faz do aplicativo. Utilizamos as informações para
          oferecer uma melhor experiência nas funcionalidades do aplicativo.
        </ParagraphText>
        <SubtitleText>DADOS COMPARTILHADOS</SubtitleText>
        <ParagraphText>
          Os dados pessoais coletados dos usuários serão compartilhados nas
          seguintes situações:
        </ParagraphText>
        <ListView>
          <ListItem>{'\u2B24' + ' '} Para processamento externo:</ListItem>
        </ListView>
        <ParagraphText>
          Fornecemos informações pessoais para serviços externos quando
          precisamos gerar alguma informação nova a partir desta sua informação,
          como, por exemplo, para gerar um link da sua localização real na
          abertura dos chamados e nas ligações de emergência, a informação da
          sua localização é enviada para um serviço oferecido pelo Google. Base
          legal para o compartilhamento de acordo com o Art. 7, inciso V, LGPD
          (Lei Geral de Proteção de Dados Pessoais): - Quando necessário para a
          execução de contrato ou de procedimentos preliminares relacionados a
          contrato do qual seja parte o titular, a pedido do titular dos dados.
        </ParagraphText>
        <ListView>
          <ListItem>{'\u2B24' + ' '} Por motivos legais:</ListItem>
        </ListView>
        <ParagraphText>
          Compartilharemos informações pessoais com empresas, organizações e
          indivíduos externos à Copergás se acreditarmos, de boa-fé, que o
          acesso, uso, conservação ou divulgação das informações seja
          razoavelmente necessário para:
        </ParagraphText>
        <ListView>
          <ListItem>
            {'\u2B24' + ' '} Cumprir qualquer legislação, regulação processo
            formal ou solicitação governamental aplicável.
          </ListItem>
          <ListItem>
            {'\u2B24' + ' '} Cumprir termos de Serviço aplicáveis, inclusive
            investigação de possíveis violações.
          </ListItem>
          <ListItem>
            {'\u2B24' + ' '} Detectar, impedir ou abordar de alguma outra
            fraude, questões técnicas ou de segurança.
          </ListItem>
          <ListItem>
            {'\u2B24' + ' '} Proteger contra dano aos direitos, à propriedade ou
            segurança da Copergás, nossos usuários ou o público, conforme
            solicitado ou permitido por lei.
          </ListItem>
        </ListView>
        <ParagraphText>
          Base legal para o compartilhamento de acordo com o Art. 7, inciso II,
          LGPD (Lei Geral de Proteção de Dados Pessoais): - Para o cumprimento
          de obrigação legal ou regulatória pelo controlador.
        </ParagraphText>
        <SubtitleText>SEGURANÇA DAS INFORMAÇÕES</SubtitleText>
        <ParagraphText>
          Temos o compromisso de proteger os nossos usuários de acessos não
          autorizados; alterações indevidas, divulgação ou destruição não
          autorizadas dos dados sob nossa responsabilidade. Pensando nisto,
          estamos sempre em melhoria contínua dos nossos serviços, visando a
          confiabilidade, disponibilidade e proteção dos dados gerenciados pelos
          nossos aplicativos.
        </ParagraphText>
        <SubtitleText>QUANDO ESTE AVISO DE PRIVACIDADE SE APLICA</SubtitleText>
        <ParagraphText>
          Este Aviso de Privacidade se aplica a partir do download do Aplicativo
          Copergás disponível nas lojas Play Store (versão Android) e Apple
          Store (versão IOS), promovido pela Copergás no intuito de oferecer
          mais um canal de comunicação entre o usuário e a Copergás; porém
          exclui serviços que tenham Termos de Uso / Políticas de Privacidade
          separados que não incorporam este documento
        </ParagraphText>
        <Footer>
          <FooterText>
            A Copergás trabalha com empenho para manter toda e qualquer
            informação pessoal que coleta do usuário de forma particular, segura
            e controlada.
          </FooterText>
          <FooterText>Última modificação: 13 de julho de 2022.</FooterText>

          <FooterAction>
            <AcceptTermsButton onPress={handleAcceptTerms}>
              <ButtonText>Aceitar Termos</ButtonText>
            </AcceptTermsButton>
          </FooterAction>
        </Footer>
      </Container>
    </ScrollView>
  )
}

export default PrivacyTerms
