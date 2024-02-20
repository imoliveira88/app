import React, { useEffect, useState, } from 'react'
import { ActivityIndicator } from 'react-native'

import { Container, LoaderText} from './styles'

const Loader: React.FC = () => {
  return (
    <Container>
        <ActivityIndicator color="#000000" size="large"/>
        <LoaderText>Carregando...</LoaderText>
    </Container>
  )
}

export default Loader
