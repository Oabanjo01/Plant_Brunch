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
    const plantList: Plant[] = allResponses[0].data;
    const plantDisease: PlantDiseaseType[] = allResponses[1].data;
    return {
      plantList,
      plantDisease,
    };
  } catch (error) {}
};
