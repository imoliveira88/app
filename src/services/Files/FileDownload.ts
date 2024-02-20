import AsyncStorage from '@react-native-community/async-storage'
import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import config from '../../config/config'
import FileViewer from 'react-native-file-viewer'

export const downloadFile = async (
  url: string,
  filename: string,
  ext = 'pdf',
  absolutePath: boolean = true
) => {
  url = !absolutePath ? config.API_ENDPOINT + url : url
  let authData: any = await AsyncStorage.getItem('@Copergas:auth')
  authData = JSON.parse(authData)
  const fileDir =
    Platform.OS === 'ios'
      ? RNFetchBlob.fs.dirs.DocumentDir
      : RNFetchBlob.fs.dirs.DownloadDir

  const data = Math.round(new Date().getTime() / 1000)

  console.log(fileDir + '/' + filename + '-' + data + '.' + ext)

  const configfb = {
    fileCache: true,
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: filename + '-' + data + '.' + ext,
    path: fileDir + '/' + filename + '-' + data + '.' + ext,
  }

  const configOptions = Platform.select({
    ios: {
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
      appendExt: ext,
    },
    android: {
      addAndroidDownloads: {
        useDownloadManager: configfb.useDownloadManager,
        notification: configfb.notification,
        mediaScannable: configfb.mediaScannable,
        title: configfb.title,
        path: configfb.path,
      },
      fileCache: configfb.fileCache,
    },
  })

  const returnFile = () =>
    RNFetchBlob.config(configOptions)
      .fetch('GET', url, {
        Authorization: 'Bearer ' + authData.access_token,
      })
      .then(async res => {
        console.log(Platform.OS)
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64')
        }

        console.log(res.path())

        try {
          const response = await FileViewer.open(res.path())
          console.log(response)
          console.log('deu bom')
          return res.path()
        } catch (error) {
          console.log(error)
        }
      })
      .catch((errorMessage, statusCode) => {
        console.log('erros: ' + statusCode)
        console.log(errorMessage)
      })

  return returnFile()
}
