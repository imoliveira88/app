import axios from './../services/api';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export default class UploadService {

    /**
     * Upload a file to server
     * @param file
     * @param url
     * @param progressCallback
     * @author Michael Douglas
     */
    async upload(file: FormData, url: string, rawFile: any,progressCallback?: Function) : Promise<any> {
        try {
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            let response = {data: ''};
            
            if(Platform.OS == 'ios'){
                response = await axios.post(url, file, {
                    onUploadProgress: (progressEvent) => {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (progressCallback)
                            progressCallback(percentCompleted)
                    }
                });
            }else{
               const base64 = await RNFS.readFile(rawFile.localUri, 'base64');
                response = await await axios.post(url, {file: base64, ...rawFile}, {
                    onUploadProgress: (progressEvent) => {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                        if (progressCallback)
                            progressCallback(percentCompleted)
                    }
                });
            }


            return {path: response.data};
        } catch (e) {
            let message = e.response ? e.response.data.error : e.message;
            console.log(e);
            throw new Error(message);

        }
    }

}
