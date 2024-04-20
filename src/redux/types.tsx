import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const OnboardingStatus = 'Onboarding';
export const ToggleStatus = 'Toggle';

// reducer action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
  default_image: {
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
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
  images: {
    license: number;
    license_name: string;
    license_url: string;
    medium_url: string;
    original_url: string;
    regular_url: string;
    small_url: string;
    thumbnail: string;
  }[];
  other_name: string[];
  scientific_name: string;
  solution: {
    description: string;
    subtitle: string;
  }[];
}

export interface PlantListResponse {
  data: Plant[];
}

export type AuthenticationTypes = {
  isAuthenticated: boolean;
  user: FirebaseAuthTypes.UserCredential;
};
