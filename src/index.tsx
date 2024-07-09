import axios from 'axios';
import instance, {generateConfigObject} from './api';
import {plantDisease, plantList} from './paths';
import {Plant, PlantDiseaseType} from './redux/types';

export const speciesListResponse = instance.request(
  generateConfigObject('get', plantList, {
    page: 10,
  }),
);
export const planDiseasesResponse = instance.request(
  generateConfigObject('get', plantDisease, {
    page: 2,
  }),
);

const transformPlantData: (a: Plant[]) => Plant[] = (plants: Plant[]) => {
  const newPlantData: Plant[] = plants.map((plant: any) => ({
    ...plant,
    default_image: [plant.default_image],
  }));
  return newPlantData;
};

export const fetchHomePagedata = async () => {
  try {
    const allResponses = await axios.all([
      speciesListResponse,
      planDiseasesResponse,
    ]);
    const plantList: Plant[] = allResponses[0].data.data;
    const plantDisease: PlantDiseaseType[] = allResponses[1].data.data;
    const modifiedPlantList: Plant[] = transformPlantData(plantList);
    // console.log(modifiedPlantList[0].default_image, 'modified plant list');
    return {
      modifiedPlantList,
      // plantList,
      plantDisease,
    };
  } catch (error) {
    console.log(error);
  }
};

const MAX_RETRIES = 2;
const RETRY_BASE_DELAY = 1000;

export const retryWithBackoff = async (
  operation: () => Promise<any>,
  retryCount = 0,
): Promise<any> => {
  try {
    return await operation();
  } catch (error) {
    if (retryCount >= MAX_RETRIES) {
      throw error;
    }

    const delayMs = RETRY_BASE_DELAY * Math.pow(2, retryCount);

    await new Promise(resolve => setTimeout(resolve, delayMs));
    return retryWithBackoff(operation, retryCount + 1);
  }
};
