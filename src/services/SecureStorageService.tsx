import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'


export default class SecureStorageService {

    /**
     * Store user login credentials
     * @param username 
     * @param password 
     * @author Michael Douglas
     */
    async storeCredentials(name: string, username: string, password: string): Promise<void> {
        let data = { 
            name,
            username,
            password
         };

        try {
            const response = await RNSecureStorage.set("credentials", JSON.stringify(data), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
            console.log(response);
        } catch (e) {
            console.log(e);
        }

    }

    /**
     * Update user credentials password
     * @author Michael Douglas
     */
    async updateCredentialPassword(password: string): Promise<any>{
        try{
            const credentials = await this.getCredentials();
            credentials.password = password;
            await this.storeCredentials(credentials.name, credentials.username, credentials.password);
        }catch(e){
            console.log(e);
        }
    }

    /**
     * Return user secure credentials
     * @author Michael Douglas
     */
    async getCredentials(): Promise<any> {
        try {
            const response = await RNSecureStorage.get('credentials');
            return JSON.parse(response);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Remove user credentials
     * @author Michael Douglas
     */
    async removeCredentials() : Promise<any> {
        try{
            await RNSecureStorage.remove('credentials');
        }catch(e){
            console.log(e);
        }
    }

}