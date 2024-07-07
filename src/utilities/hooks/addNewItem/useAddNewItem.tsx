import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useLoadingIndicator} from '../../../../App';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();
export const useAddNewItem = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {uid, displayName} = userData;
  const {isLoading, setIsLoading} = useLoadingIndicator();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  const generalList = db.collection('Items');

  const collection = db
    .collection('UserData')
    .doc(uid)
    .collection('AddedItems');

  const addNewItem = async (itemName: string, payload: any) => {
    const newID = (await generalList.get()).docs.length;
    setIsLoading(true);
    const additionalPayload = {
      ...payload,
      id: newID + 1,
      itemOwner: displayName,
      dateAdded: formattedDate.toString(),
    };
    try {
      await collection.doc(itemName).set(payload);
      await generalList.doc(itemName).set(additionalPayload);
      setIsLoading(false);
      showToast({
        text1: 'Success',
        text2: 'Successfully added item',
        type: 'success',
      });
    } catch (error) {
      setIsLoading(false);
      showToast({
        text1: 'Failed',
        text2: 'Failed to add item',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNewItem,
    isLoading,
    setIsLoading,
  };
};
