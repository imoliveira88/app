import OneSignal from 'react-native-onesignal'


export default class OneSignalService {


    constructor() {
        OneSignal.setLogLevel(6, 0);
        
        OneSignal.init("ada2f8ec-f95f-4003-b7a1-283cccf768b5", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(this.myiOSPromptCallback);
    }

    init() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    onReceived(notification: any) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult: any) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device: any) {
        console.log('Device info: ', device);
    }


    myiOSPromptCallback(permission: any) {
        console.log(permission);
    }
}