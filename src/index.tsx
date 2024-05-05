import axios from 'axios';
import {plantDisease, plantList} from './paths';
import instance, {generateConfigObject} from './api';
import {
  Plant,
  PlantDiseaseResponse,
  PlantDiseaseType,
  PlantListResponse,
} from './redux/types';

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

export const fetchHomePagedata = async () => {
  try {
    const allResponses = await axios.all([
      speciesListResponse,
      planDiseasesResponse,
    ]);
    const plantList: Plant[] = allResponses[0].data.data;
    const plantDisease: PlantDiseaseType[] = allResponses[1].data.data;
    return {
      plantList,
      plantDisease,
    };
  } catch (error) {}
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
    console.log(error);
    if (retryCount >= MAX_RETRIES) {
      throw error;
    }

    const delayMs = RETRY_BASE_DELAY * Math.pow(2, retryCount);
    console.log(`Retrying in ${delayMs} ms...`);

    await new Promise(resolve => setTimeout(resolve, delayMs));
    return retryWithBackoff(operation, retryCount + 1);
  }
};
