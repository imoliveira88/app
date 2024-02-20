import 'react-native-gesture-handler'
import React /*, { useEffect } */ from 'react'
// import Orientation from 'react-native-orientation-locker'
import { NavigationContainer } from '@react-navigation/native'
import AppProvider from './hooks'
import Routes from './routes'
import { navigationRef } from './services/RootNavigation'
// import OneSignalService from './services/Notification/OneSignalService'
import codePush from 'react-native-code-push'

const App: React.FC = () => {
  // const oneSignal = new OneSignalService()

  // useEffect(() => {
  //   Orientation.lockToPortrait()
  //   oneSignal.init()
  // }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  )
}
export default codePush(App)
