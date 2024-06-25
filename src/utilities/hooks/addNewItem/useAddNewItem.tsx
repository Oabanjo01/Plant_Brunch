import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();
export const useAddNewItem = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {uid, displayName} = userData;

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
    // console.log(itemName, payload, 'heree');
    const additionalPayload = {
      ...payload,
      id: newID + 1,
      itemOwner: displayName,
      dateAdded: formattedDate.toString(),
    };
    try {
      // console.log('here, I guess');
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
      // console.log(error, 'error');
    }
  };

  return {
    addNewItem,
    isLoading,
    setIsLoading,
  };
};
