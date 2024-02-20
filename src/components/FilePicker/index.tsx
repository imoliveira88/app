import React, { useEffect, useState, } from 'react';
import { Platform } from 'react-native';
import FormData from 'form-data';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

import UploadService from './../../services/UploadService';

import {
  Center
} from './../GlobalStyles';


import {
  SendButton,
  ArchivesBox,
  ArchivesText,
  ArchivesButton,
  ArchivesContainer,
  ArchiveIcon,
  ArchivesAreaText,
  ArchivesAreaIcon,
  ArchiveLoader
} from './styles'


interface FilePickerProps {
  uploadUrl: string,
  onUploadFile?: Function | null,
  onStartUpload?: Function | null,
  onRemoveFile?: Function | null
}

const FilePicker: React.FC<FilePickerProps> = ({ uploadUrl, onUploadFile, onStartUpload, onRemoveFile }) => {
  const [filesToUpload, setFilesToUpload] = useState<any>([]);
  const [uploadDone, setUploadDone] = useState<any>(null);
  const uploadService = new UploadService();

  const createFormData = (file: any) => {
    const data = new FormData();

    const item = {
      name: file.name,
      type: file.type,
      uri: Platform.OS === 'android' ? file.localUri : file.localUri.replace('file://', ''),
    }

    data.append('file', item);

    return data;
  };

  /**
   * Execute always upload is done
   * @author Michael Douglas
   */
  useEffect(() => {
    if (uploadDone)
      setFileUploaded(uploadDone.key, uploadDone.path)
  }, [uploadDone]);


  async function PickFile(response: any) {
    try {
      let files: any = [];
      const file = { name: response.fileName, type: response.type, localUri: response.uri, size: response.fileSize, isUploaded: false, serverPath: null };
      setFilesToUpload((prevArray: any) => {
        files = [...prevArray, file]
        return files;
      });

      onStartUpload != null ? onStartUpload(file) : null;

      const fileKey = files.length > 0 ? files.length - 1 : files.length;

      const formData = createFormData(file);

      const res = await uploadService.upload(formData, uploadUrl, file);

      setUploadDone({ key: fileKey, path: res.path });
    } catch (err) {
      console.log(err)
    }
  }
  /**
   *
   * Upload file to server
   * @author Michael Douglas
   */
  const uploadFile = async (): Promise<void> => {
    const options: ImageLibraryOptions = {mediaType: 'photo', quality:0.5, includeBase64: false};
    launchImageLibrary(options, response => {
      console.log(response);
      if (!response.didCancel)
        PickFile(response);
    })
  }

  /**
   * Remove a file from list
   * @param file
   * @author Michael Douglas
   */
  const removeFile = (key: any): any => {
    const files = [...filesToUpload];
    const result: any = files.filter((item: any, fileKey: any) => {
      if (fileKey != key) {
        return item;
      }
    })
    setFilesToUpload(result);
    onRemoveFile != null ? onRemoveFile(result) : null;
  }

  const setFileUploaded = (key: any, serverPath: String): any => {
    const files = [...filesToUpload];

    const result: any = files.map((item: any, fileKey: any) => {
      if (fileKey == key) {
        item.serverPath = serverPath;
        item.isUploaded = true;
      }
      return item;
    });

    onUploadFile != null ? onUploadFile(result) : null;
    setFilesToUpload(result);
  }

  const archiveStyle = {
    flexGrow: 1,
    justifyContent: filesToUpload.length > 0 ? 'flex-start' : 'center'
  }

  return (
    <>
      <ArchivesContainer contentContainerStyle={archiveStyle} horizontal>
        {filesToUpload.length > 0 ? (
          listFiles()
        ) : (
          noFilesContent()
        )}
      </ArchivesContainer>

      <SendButton onPress={uploadFile}>
        Anexar Arquivo
            </SendButton>
    </>
  )

  function listFiles() {
    return (
      <>
        {
          filesToUpload.map((file: any, key: any) => (
            <ArchivesBox key={key}>
              {!file.isUploaded && <ArchiveLoader size="large" />}
              <ArchiveIcon name={file.type == 'application/pdf' ? 'file-pdf' : 'file-image'} size={50} color='#dddd' />
              <ArchivesText>{file.name}</ArchivesText>
              {file.isUploaded && <ArchivesButton onPress={() => removeFile(key)}> Remover </ArchivesButton>}
            </ArchivesBox>
          ))
        }
      </>
    )
  }

  function noFilesContent() {
    return (
      <Center>
        <ArchivesAreaIcon name="paperclip" size={75} color="black" />
        <ArchivesAreaText>Anexos</ArchivesAreaText>
      </Center>
    )
  }
}

export default FilePicker
