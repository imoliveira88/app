import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default class BiometricService {


    /**
     * Peform biometric authentication
     * @author Michael Douglas
     */
    async authenticate(): Promise<boolean> {
        try {
            await FingerprintScanner
                .authenticate({ description: 'Valide sua impressão digital para continuar' })

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * Return if biometrics is available
     * @author Michael Douglas
     */
    async isAvailbale(): Promise<boolean> {
        try {
            await FingerprintScanner.isSensorAvailable();
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
        return false;
    }

    /**
     * Check if user has informed he wants to use biometrics
     */
    async userHasInformedIfWantToUseBiometrics(): Promise<boolean> {
        const response = await AsyncStorage.getItem('allowBiometrics');

        if (response != null)
            return true;

        return false;
    }

    /**
     * Set response of user if want to use biometrics
     * @param response 
     * @author Michael Douglas
     */
    async userInformedIfWantToUseBiometrics(response: boolean): Promise<void> {
        await AsyncStorage.setItem('allowBiometrics', response.toString());
    }

    /**
     * Reset biometrics settings
     * @author Michael Douglas
     */
    async reset(): Promise<void> {
        await AsyncStorage.removeItem('allowBiometrics');
    }

    /**
   * Check if user has informed he wants to use biometrics
   * @author Michael Douglas
   */
    async IsUsingBiometric(): Promise<boolean> {
        const response = await AsyncStorage.getItem('allowBiometrics');

        if (response != null) {
            if (response === 'true')
                return true;
            else
                return false;
        }
        return false;
    }

    async getBiometricName(): Promise<string> {
        try {
            return await FingerprintScanner.isSensorAvailable();
        } catch (e) {
            console.log(e);
            return '';
        }
        return '';
    }

    /**
     * Alert form request use of biometrics
     * @author Michael Douglas
     */
    async requestBiometrics(): Promise<boolean> {
        let biometricName = await this.getBiometricName();
        let message = biometricName == 'Biometrics' ? "Deseja utilizar a impressão digital para fazer login?" : `Deseja utilizar o ${biometricName} para fazer login?`;

        return new Promise((resolve, reject) => {
            Alert.alert(
                biometricName == 'Biometrics' ? 'Digital' : biometricName,
                message,
                [
                    { text: "Não", onPress: () => resolve(false) },
                    { text: "Sim", onPress: () => resolve(true) }
                ],
                { cancelable: false }
            );
        })
    }

}