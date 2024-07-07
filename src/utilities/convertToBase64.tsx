import RNFS from 'react-native-fs';
import {showToast} from './toast';
import {useEffect, useState} from 'react';

export const useConvertToBase64 = (uri: string[] | undefined) => {
  const [base64List, setbase64List] = useState<string[]>([]);

  const convertToBase64 = () => {
    try {
      let newImage;
      newImage = uri?.map(async (item, index) => {
        for (let i = index; i < uri.length; i++) {
          const newImage = await RNFS.readFile(item, 'base64');
          const modifiedImage = `data:image/jpeg;base64,${newImage}`;
          setbase64List(prev => [...prev, modifiedImage]);
        }
      });
    } catch (error) {
      showToast({
        text1: 'Error',
        text2: 'Cannot read file',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    convertToBase64();
  }, [uri]);

  return {
    base64List,
  };
};
