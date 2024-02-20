import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

class FCMService {


    register = (onRegister:any, onNotification:any, onOpenNotification:any):void => {
      this.checkPermission(onRegister)
      this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

     registerAppWithFCM = async () => {
       if (Platform.OS === 'ios') {
         await messaging().registerDeviceForRemoteMessages()
         await messaging().setAutoInitEnabled(true)
       }
     }

     checkPermission = (onRegister:any):void => {
       messaging().hasPermission()
         .then(enabled => {
           if (enabled) {
             this.getToken(onRegister)
           }

           this.requestPermission(onRegister)
         }).catch(error => {
           console.log('FCMService Permission rejected', error)
         })
     }

     getToken = (onRegister:any):void => {
       messaging().getToken()
         .then(fcmToken => {
           if (fcmToken) {
             onRegister(fcmToken)
           }

           console.log('FCMService USER does not have a device token')
         }).catch(error => {
           console.log('FCMService getToken rejected', error)
         })
     }

     requestPermission = (onRegister:any):void => {
       messaging().requestPermission()
         .then(() => {
           this.getToken(onRegister)
         }).catch(error => {
           console.log('FCMSERVICE request Permission rejected', error)
         })
     }

     deleteToken = () => {
       console.log('FCMService deleteToken')
       messaging().deleteToken()
         .catch(error => {
           console.log('FCMService delete token error', error)
         })
     }

     createNotificationListeners = (onRegister:any, onNotification:any, onOpenNotification:any):void => {
       // aplicação está rodando em background
       messaging()
         .onNotificationOpenedApp(remoteMessage => {
           console.log('FCMService onNotificationOpenedApp Notification caused app to open')
           if (remoteMessage) {
             const notification = remoteMessage.notification
             onOpenNotification(notification)
           }
         })

       // aplicação foi aberta a partir de um estado fechado
       messaging()
         .getInitialNotification()
         .then(remoteMessage => {
           console.log('FCMService getInitialNotification Notification caused app to open ')
           if (remoteMessage) {
             const notification = remoteMessage.notification
             onOpenNotification(notification)
           }
         })

       // mensagens em estado de foreground
       this.messageListener = messaging().onMessage(async remoteMessage => {
         console.log('FCMServise a new FCM message arrived')
         if (remoteMessage) {
           let notification = null
           if (Platform.OS === 'ios') {
             notification = remoteMessage.data.notification
           }

           notification = remoteMessage.notification
           onNotification(notification)
         }
       })

       // acionado quando tem um novo token
       messaging().onTokenRefresh(fcmToken => {
         console.log('FCMService new Token refresh:', fcmToken)
         onRegister(fcmToken)
       })
     }

     unRegister = () => {
       this.messageListener()
     }
}

export const fcmService = new FCMService()
