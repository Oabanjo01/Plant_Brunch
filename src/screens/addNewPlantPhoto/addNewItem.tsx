import WTextInput from '@app/components/addNewPlantPhoto/textInput';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/ConfirmButton';
import Backbutton from '@app/utilities/backbutton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewItem'>;

const AddNewItem = ({navigation, route}: Props) => {
  const params = route.params;
  const {photoType, uri} = params;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  console.log(params);
  const validationSchema = Yup.object().shape({
    price: Yup.string().required('No price set').trim(),
    scientific_Name: Yup.string()
      .required('Scientific name is a required field')
      .trim(),
    other_Name: Yup.string()
      .required('"Other" name is a required field')
      .trim(),
    cycle: Yup.string().required('Plant cycle is a required field').trim(),
    watering: Yup.string()
      .required('Rate of watering is a required field')
      .trim(),
    sunlight: Yup.string()
      .required('Intensity of sunlight is a required field')
      .trim(),
  });
  return (
    <Formik
      initialValues={{
        price: '',
        scientific_Name: '',
        other_Name: '',
        cycle: '',
        watering: '',
        sunlight: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: Colors.screenColor}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="never">
            <View
              style={{
                backgroundColor: Colors.screenColor,
                height: '100%',
                paddingTop: screenHeight * 0.2,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: screenWidth * 0.9,
                  marginBottom: screenHeight * 0.025,
                }}>
                <SwiperFlatList
                  index={0}
                  showPagination
                  paginationDefaultColor={Colors.lighterBlack}
                  paginationActiveColor={Colors.primary}
                  keyExtractor={item => item}
                  data={uri}
                  renderItem={({item}: {item: string}) => {
                    return (
                      <FastImage
                        source={{uri: `file://${item}`}}
                        resizeMode={
                          Platform.OS === 'android' ? 'cover' : 'contain'
                        }
                        style={{
                          height: screenHeight * 0.4,
                          width: screenWidth * 0.9,
                          borderWidth: 1,
                          borderColor: Colors.lighterBlack,
                          marginBottom: screenHeight * 0.05,
                          borderRadius: 20,
                        }}
                      />
                    );
                  }}
                />
              </View>

              <WTextInput
                handleBlur={handleBlur('scientific_Name')}
                handleChangeText={handleChange('scientific_Name')}
                placeholder={'Scientific Name'}
                showError={errors.scientific_Name && touched.scientific_Name}
                errorMessage={errors.scientific_Name}
              />
              <WTextInput
                handleBlur={handleBlur('other_Name')}
                handleChangeText={handleChange('other_Name')}
                placeholder={'Other Name'}
                showError={errors.other_Name}
                errorMessage={errors.other_Name}
              />
              <WTextInput
                handleBlur={handleBlur('cycle')}
                handleChangeText={handleChange('cycle')}
                placeholder={'Cycle'}
                showError={errors.cycle && touched.cycle}
                errorMessage={errors.cycle}
              />
              <WTextInput
                handleBlur={handleBlur('watering')}
                handleChangeText={handleChange('watering')}
                placeholder={'Watering'}
                showError={errors.watering && touched.watering}
                errorMessage={errors.watering}
              />
              <WTextInput
                handleBlur={handleBlur('sunlight')}
                handleChangeText={handleChange('sunlight')}
                placeholder={'Sunlight'}
                showError={errors.sunlight && touched.sunlight}
                errorMessage={errors.sunlight}
              />
              <WTextInput
                handleBlur={handleBlur('price')}
                handleChangeText={handleChange('price')}
                placeholder={'Price'}
                showError={errors.price && touched.price}
                errorMessage={errors.price}
                keyboardType="numeric"
              />
              <ConfirmButton
                buttonText="Add a new Item"
                onPress={handleSubmit}
              />
            </View>
            <Backbutton containsTitle title="Add a New Plant" />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default AddNewItem;
