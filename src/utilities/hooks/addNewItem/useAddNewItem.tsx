import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();
export const useAddNewItem = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {uid} = userData;

  const collection = db
    .collection('UserData')
    .doc(uid)
    .collection('AddedItems');
  const addNewItem = async (itemName: string, payload: any) => {
    setIsLoading(true);
    console.log(itemName, payload, 'heree');
    try {
      console.log('here, I guess');
      await collection.doc(itemName).set(payload);
      setIsLoading(false);
      showToast({
        text1: 'Success',
        text2: 'Successfully added item',
        type: 'success',
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error');
    }
  };

  return {
    addNewItem,
    isLoading,
    setIsLoading,
  };
};
