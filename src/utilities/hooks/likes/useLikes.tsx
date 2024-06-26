import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

interface AddLikesPayload {
  liked: boolean;
  itemName: string;
  image: string;
}

export interface DataFromLikesCollection {
  timeCreated?: string;
  image: string;
  itemName: string;
  liked: boolean;
  type?: string;
  category: string;
}

export const useLikes = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName: storedUserName, email, uid} = userData;
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isFavourited, setIsFavourited] = useState<boolean>(false);
  const [likesList, setLikesList] = useState<DataFromLikesCollection[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [detectError, setDetectError] = useState<string>('');

  const collection = db
    .collection('UserData')
    .doc(uid)
    .collection('ProfileItems');

  function fetchData(itemName: string, category: string) {
    return collection.doc(category).collection('Likes').doc(itemName);
  }

  const fetchAllLikes = async () => {
    setIsLoading(true);
    try {
      const plantListSnapshot = await collection
        .doc('PlantList')
        .collection('Likes')
        .get();
      const plantDiseaseSnapshot = await collection
        .doc('PlantDisease')
        .collection('Likes')
        .get();

      const allLikes: DataFromLikesCollection[] = [
        ...plantListSnapshot.docs.map(doc => ({
          image: doc.data().image,
          itemName: doc.data().itemName,
          liked: doc.data().liked,
          type: 'Photography',
          category: 'PlantList',
        })),
        ...plantDiseaseSnapshot.docs.map(doc => ({
          image: doc.data().image,
          itemName: doc.data().itemName,
          liked: doc.data().liked,
          type: 'Plant Disease',
          category: 'PlantDisease',
        })),
      ];
      setLikesList(allLikes);
      setIsLoading(false);
      return;
    } catch (error) {
      setIsLoading(false);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching your likes',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLikeStatus = async (itemName: string, category: string) => {
    try {
      const doc = await fetchData(itemName, category).get();
      if (doc.exists) {
        setIsFavourited(true);
      } else {
        setIsFavourited(false);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while like status',
      });
    } finally {
      setIsFetching(false);
    }
  };

  const addorRemoveLikes = async (
    itemName: string,
    liked: boolean,
    category: string,
    image: string,
  ) => {
    setIsLoading(true);
    setIsFavourited(liked);
    const payload: AddLikesPayload = {
      liked,
      itemName,
      image,
    };
    try {
      const exists = (await fetchData(itemName, category).get()).exists;
      if (!exists) {
        await fetchData(itemName, category).set(payload);
        showToast({
          text1: 'Liked',
          type: 'success',
          text2: `This has been added to your liked items ${String.fromCodePoint(
            0x1f600,
          )}`,
          position: 'top',
        });
      } else {
        await fetchData(itemName, category).delete();

        showToast({
          text1: 'Unliked',
          type: 'success',
          text2: `This has been removed from your liked items ${String.fromCodePoint(
            0x1f641,
          )}`,
          position: 'top',
        });
      }
      await fetchAllLikes();
    } catch (error) {
      setIsLoading(false);
      setIsFavourited(!isFavourited);
      setDetectError('An error occurred while adding the item');
    } finally {
      setIsLoading(false);
    }
  };
  return {
    addorRemoveLikes,
    likesList,
    isFetching,
    fetchData,
    detectError,
    setDetectError,
    isFavourited,
    setIsFavourited,
    fetchAllLikes,
    isLoading,
    setIsLoading,
    fetchLikeStatus,
  };
};
