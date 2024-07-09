import {FirebaseAuthTypes} from '@react-native-firebase/auth';

// action names and types
export default {
  ONBOARDING_STATUS: 'Onboarding',
  TOGGLE_STATUS: 'Toggle',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  REMEMBER_ME: 'REMEMBER_ME',
  FETCHING_DATA: 'FETCHING_DATA',
  FETCHED_DATA_SUCCESS: 'FETCHED_DATA_SUCCESS',
  FETCHED_DATA_FAILURE: 'FETCHED_DATA_FAILURE',
};

// action types
export const LOGIN = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT_SUCCESS';

// status codes
export const statusCodes = {
  SUCCESS: '00',
  SERVICE_NOT_AVAILABLE: '55',
  DUPLICATE_REQUEST: '77',
  BAD_REQUEST: '99',
  UNAUTHORIZED: '41',
  PROFILE_LINKED_ALREADY: '62',
  BAD_REQUEST_HTTP_CODE: 400,
  UNAUTHORIZED_HTTP_CODE: 401,
  SERVER_ERROR_HTTP_CODE: 500,
  FETCH_ERROR: 'FETCH_ERROR',
};

export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: PlantListImageType[];
  item_Owner?: string;
  price?: string;
  date_Added?: string;
}
export interface PlantDiseaseType {
  common_name: string;
  description: {
    description: string;
    subtitle: string;
  }[];
  family: string | null;
  host: string[];
  id: number;
  images: PlantDiseaseImageType[];
  other_name: string[];
  item_Owner: string;
  scientific_name: string;
  solution: {
    description: string;
    subtitle: string;
  }[];
  price?: string;
  date_Added?: string;
}

export interface PlantListImageType {
  license?: number;
  license_name?: string;
  license_url?: string;
  original_url?: string;
  regular_url?: string;
  medium_url?: string;
  small_url?: string;
  thumbnail?: string;
}
export interface PlantDiseaseImageType {
  license?: number;
  license_name?: string;
  license_url?: string;
  medium_url?: string;
  original_url?: string;
  regular_url?: string;
  small_url?: string;
  thumbnail?: string;
}

export interface PlantListResponse {
  data: Plant[];
}
export interface PlantDiseaseResponse {
  data: PlantDiseaseType[];
}
