import {Platform, StatusBar, StyleSheet} from 'react-native';

const Wrapper = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#6495ED',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // This is for automatically positioning the screen in android
  },
});

export default Wrapper;
