import {RootState} from '@app/redux/store';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

interface ArticleProps {
  timeCreated: string;
  title: string;
  image: string;
  bookmarked?: boolean;
}

const useArticles = () => {
  const [articleList, setArticleList] = useState<ArticleProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detectError, setDetectError] = useState<string>('');

  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName: storedUserName, email, uid} = userData;
  const today = new Date();
  const date = today.getDate();

  const collection = db
    .collection('UserData')
    .doc(uid)
    .collection('ProfileItems')
    .doc('Articles')
    .collection(storedUserName);

  function fetchData(articleName: string) {
    return collection.doc(articleName);
  }

  const fetchArticleStatus = async (articleName: string) => {
    try {
      const userArticles = await fetchData(articleName).get();
      if (userArticles.exists) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching article bookmark status',
      });
    } finally {
      setIsFetching(false);
    }
  };

  const fetchAllUserArticles = async () => {
    setIsLoading(true);
    try {
      const userArticleSnapshot = await collection.get();
      const list: ArticleProps[] = userArticleSnapshot.docs.map(doc => ({
        timeCreated: doc.data().timeCreated,
        title: doc.data().title,
        image: doc.data().image,
        description: doc.data().description,
      }));
      setArticleList(list);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching your articles',
      });
      setArticleList([]);
    }
  };
  const addOrRemoveArticle = async (
    articleName: string,
    liked: boolean,
    image: string,
  ) => {
    setIsLoading(true);
    setIsBookmarked(liked);
    try {
      const exists = (await fetchData(articleName).get()).exists;
      const payload: ArticleProps = {
        image: image,
        timeCreated: date.toString(),
        title: articleName,
        bookmarked: true,
      };
      if (!exists) {
        await fetchData(articleName).set(payload);
        showToast({
          text1: 'Bookmarked',
          type: 'success',
          text2: `This has been added to your bookmarked items ${String.fromCodePoint(
            0x1f600,
          )}`,
          position: 'top',
        });
      } else {
        await fetchData(articleName).delete();

        showToast({
          text1: 'Unbookmarked',
          type: 'success',
          text2: `This has been removed from your bookmarked items ${String.fromCodePoint(
            0x1f641,
          )}`,
          position: 'top',
        });
      }
      await fetchAllUserArticles();
    } catch (error) {
      setIsLoading(false);
      setIsBookmarked(!liked);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    articleList,
    fetchAllUserArticles,
    addOrRemoveArticle,
    fetchArticleStatus,
    isFetching,
    isLoading,
    isBookmarked,
  };
};

export default useArticles;
