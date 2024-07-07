import {fetchHomePagedata, retryWithBackoff} from '@app/index';
import {RootState} from '@app/redux/store';
import {Plant, PlantDiseaseImageType, PlantDiseaseType} from '@app/redux/types';
import {showToast} from '@app/utilities/toast';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useLoadingIndicator} from '../../../../App';

const db = firestore();
export const useFetchData = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [plantList, setPlantList] = useState<Plant[]>([]);
  const [plantDisease, setPlantDisease] = useState<PlantDiseaseType[]>([]);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName, email, uid} = userData;
  const {isLoading, setIsLoading} = useLoadingIndicator();

  const convertToImageList: (item: string[]) => PlantDiseaseImageType[] = (
    item: string[],
  ) => {
    let imageList: PlantDiseaseImageType[] = item?.map((item: string) => {
      return {
        original_url: item,
        regular_url: item,
      };
    });
    return imageList;
  };

  const fetchDataFromFirestore = async () => {
    const generalList = db.collection('Items');
    const regularResponses: Plant[] = [];
    const diseaseResponses: PlantDiseaseType[] = [];

    const itemList = (await generalList.get()).docs.map(item => {
      let imageList = convertToImageList(item.data().images);
      let itemType = item.data().type;

      let regularResponse: {plantList: Plant} = {
        plantList: {
          id: item.data().id,
          common_name: item.data().common_name,
          scientific_name: [item.data().scientific_Name],
          other_name: [item.data().other_Name],
          cycle: item.data().cycle,
          watering: item.data().watering,
          sunlight: [item.data().sunlight],
          default_image: {
            original_url: item.data().images[0],
            regular_url: item.data().images[0],
          },
          date_Added: item.data().dateAdded,
          item_Owner: item.data().itemOwner,
          price: item.data().price,
        },
      };
      let diseaseResponse: {plantDisease: PlantDiseaseType} = {
        plantDisease: {
          common_name: item.data().common_name,
          description: item.data().groupedInputs,
          family: item.data().family,
          host: [item.data().host],
          id: item.data().id,
          images: imageList,
          other_name: [item.data().other_Name],
          scientific_name: item.data().scientific_Name,
          solution: item.data().groupedSolutionInputs,
          date_Added: item.data().dateAdded,
          item_Owner: item.data().itemOwner,
          price: item.data().price,
        },
      };
      return {
        itemType,
        regularResponse,
        diseaseResponse,
      };
    });

    itemList.forEach(item => {
      if (item.itemType === 'regular') {
        regularResponses.push(item.regularResponse.plantList);
      } else if (item.itemType === 'disease') {
        diseaseResponses.push(item.diseaseResponse.plantDisease);
      }
    });

    // const regularResponses = itemList.map(item => item.regularResponse);
    // const diseaseResponses = itemList.map(item => item.diseaseResponse);
    return {
      regularResponses,
      diseaseResponses,
    };
  };

  const fetchdata = async (isRefresh = false, noLoader?: boolean) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      noLoader ? null : setIsLoading(true);
    }
    try {
      const plantListFirestore = (await fetchDataFromFirestore())
        .regularResponses;
      const plantDiseaseListFirestore = (await fetchDataFromFirestore())
        .diseaseResponses;

      await retryWithBackoff(fetchHomePagedata, 2)
        .then((data: any) => {
          setPlantList([...plantListFirestore, ...data?.plantList]);
          setPlantDisease([
            ...plantDiseaseListFirestore,
            ...data?.plantDisease,
          ]);
        })
        .catch((err: any) => {
          // showToast(err);
        });

      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      // console.error(error);
    } finally {
      setIsLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  };
  useEffect(() => {
    fetchdata();
    return () => setIsFirstTime(true);
  }, []);
  // useEffect(() => {
  //   if (!displayName) {
  //     setIsLoading(true);
  //   }
  // }, [displayName]);

  return {
    isLoading,
    plantList,
    plantDisease,
    displayName,
    setIsLoading,
    fetchdata,
    refreshing,
    setRefreshing,
    setIsFirstTime,
    isFirstTime,
  };
};
