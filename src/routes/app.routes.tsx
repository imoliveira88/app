import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Menu from './../components/Menu'
import Home from '../pages/Home'
import Invoice from '../pages/Invoice'
import InvoiceDetails from '../pages/Invoice/Details'
import Audit from '../pages/Audit'
import Complaint from '../pages/Complaint'
import Request from '../pages/Request'
import DischargeStatement from '../pages/DischargeStatement'
import ConsumptionHistory from '../pages/ConsumptionHistory'
import OutsideLinkView from '../pages/OutsideLinkView'
import NewContract from '../pages/NewContract'
import NewRegister from '../pages/NewRegister'
import Login from '../pages/Login'
import Boleto from '../pages/Invoice/Boleto'
import HolderDocumentation from '../pages/HolderDocumentation'
import Contract from '../pages/Contract'
import ForgetPassword from '../pages/ForgetPassword'
import PasswordChange from '../pages/PasswordChange'
import ResetPassword from './../pages/ResetPassword'
import Accompaniments from './../pages/Accompaniments'
import Faq from '../pages/Faq'
import RecoverPassword from '../pages/RecoverPassword'
import List from './../pages/Accompaniments/List'
import ListDetails from './../pages/Accompaniments/List/ListDetails'
import PrivacyTerms from '../pages/PrivacyTerms'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

const App = createStackNavigator()
const Drawer = createDrawerNavigator()

/**
 * Authenticated pages
 */
function AuthStack() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FDFDFD' },
      }}
    >
      <App.Screen name="Login" component={Login} />
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Invoice" component={Invoice} />
      <App.Screen name="InvoiceDetails" component={InvoiceDetails} />
      <App.Screen name="Audit" component={Audit} />
      <App.Screen name="Complaint" component={Complaint} />
      <App.Screen name="Request" component={Request} />
      <App.Screen name="DischargeStatement" component={DischargeStatement} />
      <App.Screen name="ConsumptionHistory" component={ConsumptionHistory} />
      <App.Screen name="OutsideLinkView" component={OutsideLinkView} />
      <App.Screen name="NewContract" component={NewContract} />
      <App.Screen name="NewRegister" component={NewRegister} />
      <App.Screen name="BoletoDetails" component={Boleto} />
      <App.Screen name="HolderDocumentation" component={HolderDocumentation} />
      <App.Screen name="Contract" component={Contract} />
      <App.Screen name="ForgetPassword" component={ForgetPassword} />
      <App.Screen name="ResetPassword" component={ResetPassword} />
      <App.Screen name="Faq" component={Faq} />
      <App.Screen name="Accompaniments" component={Accompaniments} />
      <App.Screen name="List" component={List} />
      <App.Screen name="ListDetails" component={ListDetails} />
    </App.Navigator>
  )
}

/**
 * No authenticated pages
 */
function NoAuthStack() {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Login" component={Login} />
      <App.Screen name="PasswordChange" component={PasswordChange} />
      <App.Screen name="RecoverPassword" component={RecoverPassword} />
      <App.Screen name="PrivacyTerms" component={PrivacyTerms} />
    </App.Navigator>
  )
}

const AppRoutes: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="NoAuthStack"
        component={NoAuthStack}
        options={{
          unmountOnBlur: true,
          swipeEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Drawer.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  </>
)

export default AppRoutes
