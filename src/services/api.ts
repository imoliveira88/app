import {Platform, Alert, Linking} from 'react-native'
import {getDeviceName, getVersion, getManufacturer} from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import config from '../config/config';
import { navigationRef } from './RootNavigation';

const getToken = async () => {
  let data = await AsyncStorage.getItem('@Copergas:auth');
  if (data) {
    data = JSON.parse(data).access_token;
    return data;
  }
}

const api = axios.create({
  baseURL: config.API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  }
})

api.interceptors.request.use(config => {
  return getToken().then(async (token) => {
    console.log(token);
    if (token != null)
      config.headers.Authorization = `Bearer ${token}`

    /**
     * Tell to server that request is from app
     */
    config.headers['app-client'] = true;
    config.headers['app-version'] = await getVersion();
    config.headers['app-os'] = Platform.OS;
    config.headers['app-os-version'] = Platform.Version;
    config.headers['app-device'] = await getDeviceName();
    config.headers['app-device-manufacturer'] = await getManufacturer();
    return Promise.resolve(config);
  }).catch((error) => {
    return Promise.resolve(config);
  })
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use((response: any) => {
  return Promise.resolve(response);
}, error => {
  const response = error.response;

  console.log(response.data);

  if(response.status){
    // NAO AUTENTICADO //
    if (response.status == 401) {
      AsyncStorage.removeItem('@Copergas:user').then(() => {
        AsyncStorage.removeItem('@Copergas:auth').then(() => {
          console.log('redireciona o maluco!');
          navigationRef.current.navigate('NoAuthStack', {
            screen: 'Login'
          });
        })
      })
    }

    if(response.status == 412){
      if(response.data.type != null && response.data.type == 'appDeprecated'){
        handleDeprecatedApp(response.data.error, response.data.store_url);
      }
    }
  }

  return Promise.reject(error);
});

/**
 * Force user to update app
 */
function handleDeprecatedApp(message: string, storeUrl: string)
{
  Alert.alert(
    "Aplicativo desatualizado!",
    message,
    [
      { text: "OK", onPress: () => Linking.openURL(storeUrl) }
    ],
    { cancelable: false }
  );
}



export default api
