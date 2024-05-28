import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

export interface CartProps {
  timeCarted?: string;
  title: string;
  image: string;
  carted?: boolean;
  type: string;
}

const useCart = () => {
  const [cartedList, setCartedList] = useState<CartProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isCarted, setIsCarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {uid} = userData;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  const collection = db.collection('UserData').doc(uid).collection('Cart');

  function fetchData(cartedItemName: string) {
    return collection.doc(cartedItemName);
  }

  const fetchCartStatus = async (cartedItemName: string) => {
    try {
      const userCartedItems = await fetchData(cartedItemName).get();
      if (userCartedItems.exists) {
        setIsCarted(true);
      } else {
        setIsCarted(false);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching carted status',
      });
    } finally {
      setIsFetching(false);
    }
  };

  const fetchAllUserCartedItems = async () => {
    try {
      const userCartedSnapshot = await collection.get();
      const list: CartProps[] = userCartedSnapshot.docs.map(doc => ({
        type: doc.data().type,
        title: doc.data().title,
        image: doc.data().image,
        description: doc.data().description,
        timeCarted: doc.data().timeCarted,
      }));
      setCartedList(list);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching your cart items',
      });
      setIsLoading(false);
      setCartedList([]);
    } finally {
      setIsLoading(false);
    }
  };
  const addOrRemoveCartItem = async (
    cartedItemName: string,
    liked: boolean,
    image: string,
    type: string,
  ) => {
    setIsLoading(true);
    setIsCarted(liked);
    try {
      const exists = (await fetchData(cartedItemName).get()).exists;
      const payload: CartProps = {
        image: image,
        type: type,
        title: cartedItemName,
        carted: true,
        timeCarted: formattedDate.toString(),
      };
      if (!exists) {
        await fetchData(cartedItemName).set(payload);
        showToast({
          text1: 'Carted',
          type: 'success',
          text2: `This has been added to your cart items ${String.fromCodePoint(
            0x1f600,
          )}`,
          position: 'top',
        });
      } else {
        await fetchData(cartedItemName).delete();

        showToast({
          text1: 'Uncarted',
          type: 'success',
          text2: `This has been removed from your carted items ${String.fromCodePoint(
            0x1f641,
          )}`,
          position: 'top',
        });
      }
      await fetchAllUserCartedItems();
    } catch (error) {
      setIsCarted(!liked);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cartedList,
    fetchAllUserCartedItems,
    addOrRemoveCartItem,
    fetchCartStatus,
    isFetching,
    isLoading,
    isCarted,
  };
};

export default useCart;
