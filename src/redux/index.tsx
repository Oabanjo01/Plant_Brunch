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
    console.log('Fetching');
    const allResponses = await axios.all([
      speciesListResponse,
      planDiseasesResponse,
    ]);
    const response1 = allResponses[0].data;
    const response2 = allResponses[1].data;
    return {
      response1,
      response2,
    };
  } catch (error) {
    console.log(error, 'error');
  }
};
