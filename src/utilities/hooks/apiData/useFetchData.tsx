import {fetchHomePagedata, retryWithBackoff} from '@app/index';
import {RootState} from '@app/redux/store';
import {Plant, PlantDiseaseType} from '@app/redux/types';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [plantList, setPlantList] = useState<Plant[]>([]);
  const [plantDisease, setPlantDisease] = useState<PlantDiseaseType[]>([]);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName, email, uid} = userData;

  const fetchdata = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      await retryWithBackoff(fetchHomePagedata, 2)
        .then((data: any) => {
          console.log('response loading 1');
          setPlantList(data?.plantList);
          setPlantDisease(data?.plantDisease);
        })
        .catch((err: any) => {
          console.log('response loading 2');
          showToast(err);
        });
      console.log('response loading 3');
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  };
  useEffect(() => {
    fetchdata();
  }, [email, uid]);

  return {
    isLoading,
    plantList,
    plantDisease,
    displayName,
    fetchdata,
    refreshing,
    setRefreshing,
  };
};
