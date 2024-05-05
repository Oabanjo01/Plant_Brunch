import {
  fetchHomePagedata,
  planDiseasesResponse,
  retryWithBackoff,
  speciesListResponse,
} from '@app/index';
import {RootState} from '@app/redux/store';
import {Plant, PlantDiseaseType} from '@app/redux/types';
import {showToast} from '@app/utilities/toast';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const db = firestore();

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [plantList, setPlantList] = useState<Plant[]>();
  const [plantDisease, setPlantDisease] = useState<PlantDiseaseType[]>();

  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName: storedUserName, email, uid} = userData;

  useEffect(() => {
    const fetchdata = async () => {
      console.log(`Fetching plant`);
      setIsLoading(true);
      try {
        await retryWithBackoff(fetchHomePagedata, 2)
          .then((data: any) => {
            setPlantList(data?.plantList);
            setPlantDisease(data?.plantDisease);
          })
          .catch((err: any) => {
            showToast(err);
          });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchdata();
  }, [email, uid]);

  return {isLoading, plantList, plantDisease, storedUserName};
};
