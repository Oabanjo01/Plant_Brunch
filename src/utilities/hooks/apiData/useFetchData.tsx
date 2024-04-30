import {fetchHomePagedata} from '@app/index';
import {RootState} from '@app/redux/store';
import {Plant, PlantDiseaseType} from '@app/redux/types';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [plantList, setPlantList] = useState<Plant[]>();
  const [plantDisease, setPlantDisease] = useState<PlantDiseaseType[]>();

  setIsLoading(true);

  const userData = useSelector((state: RootState) => state.auth.user);
  //   const fetchedData = useSelector((state: RootState) => state.fetchData);

  const {displayName: storedUserName, email, uid} = userData;

  //   const {plantList, plantDisease, isLoading: loadedData} = fetchedData;

  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const userName = await db
        .collection('Signups')
        .doc('Usernames')
        .collection(email)
        .doc(uid)
        .get({
          source: 'server',
        });

      await fetchHomePagedata().then(data => {
        setPlantList(data?.plantList);
        setPlantDisease(data?.plantDisease);
      });
      console.log(userName);
      //   store.dispatch(fetchHomeData);
      //   setDisplayName(userName);
      setIsLoading(false);
      return;
    } catch (error) {
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
      return;
    }
  };

  return {
    setIsLoading,
    isLoading,
    // loadedData,
    fetchdata,
    plantList,
    plantDisease,
    storedUserName,
    useFetchData,
  };
};
