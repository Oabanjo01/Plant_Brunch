import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBECp4P7CO5JiQQ-AUR8M8U7wRHmLI_xgc',
  authDomain: 'plant-app-aff11.firebaseapp.com',
  projectId: 'plant-app-aff11',
  storageBucket: 'plant-app-aff11.appspot.com',
  messagingSenderId: '641536110383',
  appId: '1:641536110383:web:f6adeff9fd0bb6732bfbda',
};

const app = firebase.initializeApp(firebaseConfig);
export {auth, firestore};
export default app;
