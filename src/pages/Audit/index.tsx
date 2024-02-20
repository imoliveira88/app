import React, { } from 'react'
import { useNavigation } from '@react-navigation/core'

import Header from '../../components/Header'

import { Container, AuditButton } from './styles'

const Audit: React.FC = () => {
  const navigation = useNavigation()

  const handleNavigate = (uri:string):void => {
    navigation.navigate('OutsideLinkView', { uri })
  }

  return (
    <>
      <Header/>
      <Container>
        <AuditButton onPress={() => handleNavigate('http://200.238.112.13:8080/ModuloCidadao/atendimento_edit.xhtml')}>
        Abrir Manifesto
        </AuditButton>
        <AuditButton onPress={() => handleNavigate('http://200.238.112.13:8080/ModuloCidadao/atendimento_list.xhtml')}>
        Acompanhar Manifesto
        </AuditButton>
      </Container>

    </>
  )
}

export default Audit
/**

       */
