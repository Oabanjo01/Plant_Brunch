import RNFS from 'react-native-fs';
import {showToast} from './toast';
import {useEffect, useState} from 'react';

export const useConvertToBase64 = (uri: string[] | undefined) => {
  const [base64List, setbase64List] = useState<string[]>([]);

  const convertToBase64 = () => {
    try {
      let newList;
      newList = uri?.map(async (item, i) => {
        for (let i = 0; i < uri.length; i++) {
          const newList = await RNFS.readFile(item, 'base64');
          setbase64List(prev => [...prev, newList]);
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
  }, []);

  return {
    base64List,
  };
};
