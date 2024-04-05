import axios from 'axios';
import {plantDisease, plantList} from './paths';
import instance, {generateConfigObject} from './api';

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
    const plantList = allResponses[0].data;
    const plantDisease = allResponses[1].data;
    // console.log(plantDisease, 'all responses');
    return {
      plantList,
      plantDisease,
    };
  } catch (error) {
    console.log(error, 'error');
  }
};
