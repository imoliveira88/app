import React from 'react';
import { Image } from 'react-native';
import logo from '../../assets/logo-horizontal.png';
import Header from './../../components/Header';

import {
  Background,
  Container,
  StyledForm,
  Text,
  ScrollView,
  BackButton,
  HeadText
} from './styles';

interface LoginProps {
  navigation: {
    navigate: Function,
    goBack: Function,
  }
}

const Contract: React.FC<LoginProps> = ({ navigation }) => {
  return <>
    <Header/>
    <Container>
      <StyledForm>
        <ScrollView>
            <HeadText> Termo de Aceitação </HeadText>
            <Text><Text style={{ fontWeight: 'bold',}}>1. Objeto</Text> Fornecimento de gás canalizado pela COPERGÁS ao CLIENTE residencial, nas condições a seguir estabelecidas.</Text>

            <Text style={{ fontWeight: 'bold',}}>2. Condições de Eficácia São condições precedentes para a eficácia deste contrato que:</Text>

            <Text><Text style={{ fontWeight: 'bold',}}> a).</Text> Estejam preenchidos os requisitos técnicos que permitam a ligação do <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> à rede de distribuição de gás da <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>b).</Text> As <Text style={{ fontWeight: 'bold',}}>PARTES</Text> declarem que obtiveram todas as autorizações estatutárias e legais cabíveis para a celebração deste contrato.</Text>

            <Text style={{ fontWeight: 'bold',}}>3. Condições de Fornecimento e Medição</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.1</Text> O fornecimento de gás se dará pela rede de distribuição, sendo entregue ao <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> no ponto imediatamente após o Conjunto de Regulagem de Pressão (CR), de propriedade da COPERGÁS. A partir desse ponto de transferência, o <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> será o responsável pelas instalações e equipamentos (exceto pelo medidor de vazão da unidade residencial), incluindo eventuais vazamentos de gás.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.2 O CLIENTE</Text> será responsável pela manutenção da rede interna de distribuição de gás e dos equipamentos de sua propriedade.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.3 A qualidade</Text> do gás deverá atender a <Text style={{ fontWeight: 'bold',}}>RESOLUÇÃO ANP Nº. 16, DE 17 DE JUNHO DE 2008</Text> ou a que vier substituí-la.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}> 3.4</Text> O medidor de vazão é de propriedade da <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text>, ficando o <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> responsável pela sua guarda como depositário fiel, a título gratuito.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.5 O CLIENTE</Text> autoriza a <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> e/ou terceiros por ela contratados, quando devidamente identificados, a realizarem leitura e/ou manutenção do medidor ou equipamentos, bem como execução dos serviços de instalação, construção e fiscalização, suspensão e restabelecimento do fornecimento de gás. As manutenções e as operações serão realizadas exclusivamente pela <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> e/ou terceiros por ela autorizados.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.6.</Text> Os equipamentos ou acessórios instalados pela <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> serão lacrados ficando vedado o rompimento do lacre e/ou qualquer interferência pelo <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> ou por terceiros não expressamente autorizados pela <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.7</Text> A periodicidade da calibração e os critérios de aceitação dos equipamentos do <Text style={{ fontWeight: 'bold',}}>SISTEMA DE MEDIÇÃO</Text> atenderão à legislação metrológica vigente.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>3.8 O CLIENTE</Text> deverá informar à <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> quando desocupar a Unidade Consumidora, sob pena de responder pelos débitos pendentes daquela Unidade até a data da comunicação de alteração de titularidade.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.</Text> Tarifa e Faturamento</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.1</Text> A tarifa do gás fornecido pela <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> observará as faixas de valores aprovados pela Agência de Regulação do Estado de Pernambuco – ARPE, ou pelo órgão que a substituir e estará disponível na sede e no “site” da COPERGÁS (</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.2</Text> O valor mencionado no item 4.1 contempla todos os tributos incidentes sobre este tipo de operação. Não estão incluídos encargos financeiros ou quaisquer outras tributações e/ou contribuições fiscais e para fiscais que venham a ser criadas, ou de execução, as quais, se exigíveis da COPERGÁS, deverão ser adicionadas àquele valor.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.3</Text> O valor a ser mensalmente faturado ao <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> será calculado com base no volume utilizado, aplicando-se a este volume o fator de correção médio especificado na fatura.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.4.</Text> Ocorrendo falha no medidor, o volume de gás utilizado será calculado pela média dos últimos 03 (três) meses ou em um intervalo menor, na hipótese de não existirem registros de medições nesse período.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>4.5.</Text> Os pagamentos efetuados com atraso estarão sujeitos à multa de 2% (dois por cento) e atualização monetária, calculada com base no IGPM/FGV, acrescidos de juros de mora de 1% (um por cento) ao mês, aplicados “pro rata tempore".</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.</Text> Suspensão do Fornecimento</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.1</Text> O fornecimento de gás poderá ser interrompido/suspenso nas seguintes hipóteses:</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.1.1</Text> Falta ou atraso de pagamento de quaisquer valores devidos à <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text>, o que será prévia e expressamente comunicado ao <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> com antecedência de 30 (trinta) dias corridos, por meio de um aviso de débito e suspensão, que poderá ser enviado por carta e/ou meio eletrônico, para endereços fornecidos pelo <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text>, constantes de seu cadastro perante a <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.1.2</Text> Razões de ordem técnica ou de segurança de rede interna de distribuição de gás da Unidade Consumidora.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.1.3</Text> Situação de emergência que ameace a integridade de pessoas, da Unidade Consumidora ou de instalações da <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.1.4</Text> Caso fortuito ou de força maior.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.2.</Text> Para restabelecer o fornecimento de gás, o <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> deverá quitar todos os valores devidos à <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.3 O CLIENTE</Text> poderá, mediante prévia e expressa comunicação, solicitar que a <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> suspenda o fornecimento de gás. O pedido deverá ser feito com antecedência mínima de 15 (quinze) dias.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>5.4.</Text> Em qualquer caso, para solicitar a suspensão ou restabelecer o fornecimento de gás, o <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> deverá quitar todos os valores devidos à <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text>, seja pelo fornecimento do gás ou pelo serviço de religação.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>6.</Text> Penalidades</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>6.1.</Text> A infração aos itens <Text style={{ fontWeight: 'bold',}}>3.6</Text> e <Text style={{ fontWeight: 'bold',}}>3.7</Text> deste contrato implicará na imediata suspensão do fornecimento de gás ao CLIENTE, além de multa contratual de 10% (dez por cento) sobre a média mensal de uso nos últimos 12 (doze) meses ou em intervalo menor, quando não existirem registros de medições nesse período, sem prejuízo do disposto na cláusula 7 e de responder por perdas e danos.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>7.</Text> Vigência e Rescisão</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>7.1.</Text> Este contrato entrará em vigor na data em que ficar caracterizada a adesão do CLIENTE e terá prazo de vigência indeterminado.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>7.2.</Text> É facultada a rescisão do contrato por qualquer das Partes e a qualquer tempo, bastando prévia e expressa comunicação mínima de 30 (trinta) dias.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>8.</Text> Disposições Gerais</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>8.1.</Text> Toda e qualquer tolerância pelas partes quanto ao cumprimento dos prazos e condições estabelecidos neste contrato, não significará novação das disposições ora pactuadas.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>8.2. O CLIENTE</Text> se responsabiliza e se obriga em manter seus dados cadastrais atualizados perante a <Text style={{ fontWeight: 'bold',}}>COPERGÁS.</Text></Text>

            <Text><Text style={{ fontWeight: 'bold',}}>9.</Text> Superveniência <Text style={{ fontWeight: 'bold',}}>CLIENTE</Text> e <Text style={{ fontWeight: 'bold',}}>COPERGÁS</Text> reconhecem e declaram como único instrumento válido e eficaz entre as <Text style={{ fontWeight: 'bold',}}>PARTES</Text>, aquele com data de assinatura mais recente, ficando os demais sem efeito para todos os fins em direito admitidos.</Text>

            <Text><Text style={{ fontWeight: 'bold',}}>10.</Text> Foro <Text style={{ fontWeight: 'bold',}}>10.1</Text> Fica eleito o foro da Comarca do Recife/PE para dirimir quaisquer questões decorrentes deste Contrato.</Text>

            <BackButton
              onPress={() => navigation.goBack() }
            >Voltar</BackButton>

        </ScrollView>
      </StyledForm>
    </Container>
  </>
}

export default Contract;
