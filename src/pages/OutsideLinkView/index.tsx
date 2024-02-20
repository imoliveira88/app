import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import Header from '../../components/Header'
import { Container, Loading } from './styles'

interface OutsideLinkViewProps {
  route: {
    params: {
      uri: string
    }
  },

}

const OutsideLinkView: React.FC<OutsideLinkViewProps> = ({ route }) => {
  const [loading, setLoading] = useState(true)

  const { uri } = route.params
  return (
    <Container>
      <Header/>
      <WebView
        onLoad={() => setLoading(false)}
        source={{ uri: uri }}
        style={{ marginTop: 20 }}
      />
      {loading && <Loading
        size="large"
      />}
    </Container>
  )
}

export default OutsideLinkView
