import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, View, StatusBar, TouchableHighlight, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, IconButton } from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { useAuth } from '../../hooks/auth'

import Icon from 'react-native-vector-icons/Feather'

import logo from '../../assets/logo-horizontal.png'
import { Text } from '../../pages/NewContract/styles';


interface HeaderProps {
  hideLogo?: boolean | false
  backButtonColor?: string | 'black'
}

const Header: React.FC<HeaderProps> = ({hideLogo, backButtonColor}) => {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
  })

  const handleVisible = (): void => {
    setVisible(!visible)
  }

  const handleDrawer = (): void => {
    navigation.toggleDrawer();
  }

  return (
    <SafeAreaView>
      {Platform.OS === 'ios' ? <StatusBar translucent barStyle="dark-content" /> : <StatusBar barStyle="dark-content" backgroundColor="#fff" />}
      <Container>
        {route.name != 'Home' ? (
          <IconButton onPress={navigation.goBack}>
            <FontAwesome name="chevron-left" size={25} color={backButtonColor}  />
          </IconButton>
        ) : (
            <IconButton onPress={handleDrawer}>
              <FontAwesome name="bars" size={25} color='black'/>
            </IconButton>
        )}
        <Image source={logo} resizeMode="stretch" style={{  display: hideLogo ? 'none' : 'flex' ,width: 220, height: 80, backgroundColor: '#FFF' }} />

        <FontAwesome name="bell" size={25} color='transparent'/>

      </Container>
      {visible && <View style={{ width: 300, height: 700, backgroundColor: 'red', zIndex: 10, alignSelf: 'baseline', position: 'absolute', }}></View>}
    </SafeAreaView>
  )
}

export default Header
