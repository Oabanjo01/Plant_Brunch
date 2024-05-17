import {RootState} from '@app/redux/store';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

interface AddLikesPayload {
  liked: boolean;
  itemName: string;
}

export const useLikes = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName: storedUserName, email, uid} = userData;
  const [isLoading, setIsLoading] = useState<boolean>();
  const [detectError, setDetectError] = useState<string>('');

  const addLikes = async (itemName: string, liked: boolean) => {
    setIsLoading(true);
    const payload: AddLikesPayload = {
      liked,
      itemName,
    };
    try {
      await db
        .collection('UserData')
        .doc(uid)
        .collection('Likes')
        .doc(itemName)
        .set(payload);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setDetectError('An error occurred while adding the item');
    }
  };
  return {
    addLikes,
    detectError,
    setDetectError,
    isLoading,
    setIsLoading,
  };
};
