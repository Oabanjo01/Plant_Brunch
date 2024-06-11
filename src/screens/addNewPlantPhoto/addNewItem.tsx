import GroupedTextInput from '@app/components/addNewPlantPhoto/groupedTextInput';
import WTextInput from '@app/components/addNewPlantPhoto/textInput';
import Backbutton from '@app/components/backbutton';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/ConfirmButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewItem'>;

const AddNewItem = ({navigation, route}: Props) => {
  const params = route.params;
  const {photoType, uri} = params;

  const [groupedInputs, setGroupedInputs] = useState([
    {id: '1', title: '', description: ''},
  ]);
  const [groupedSolutionInputs, setGroupedSolutionInputs] = useState([
    {id: '1', title: '', description: ''},
  ]);

  const addGroupedInput = () => {
    const newInput = {
      id: String(`description - ${groupedInputs.length + 1}`),
      title: '',
      description: '',
    };
    setGroupedInputs(previousState => [...previousState, newInput]);
  };

  const addGroupedSolutionInput = () => {
    const newInput = {
      id: String(`solution - ${groupedSolutionInputs.length + 1}`),
      title: '',
      description: '',
    };
    setGroupedSolutionInputs(previousState => [...previousState, newInput]);
  };

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const validationSchema = Yup.object().shape({
    price: Yup.string().required('No price set').trim(),
    common_name: Yup.string()
      .required('What is this popularly known as?')
      .trim(),
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
        common_name: '',
        other_Name: '',
        cycle: '',
        watering: '',
        sunlight: '',
        groupedInputs: groupedInputs,
        groupedSolutionInputs: groupedSolutionInputs,
        family: '',
        host: '',
        solution: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {}}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View
          style={{
            backgroundColor: Colors.screenColor,
            flex: 1,
            paddingTop: screenHeight * 0.1,
          }}>
          <ScrollView keyboardShouldPersistTaps="never" style={{flexGrow: 1}}>
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
                        width: screenWidth * 0.85,
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
              showError={errors.other_Name && touched.other_Name}
              errorMessage={errors.other_Name}
            />
            <WTextInput
              handleBlur={handleBlur('common_name')}
              handleChangeText={handleChange('common_name')}
              placeholder={'Common Name'}
              showError={errors.common_name && touched.common_name}
              errorMessage={errors.common_name}
            />

            {photoType === 'plantPhotograph' && (
              <>
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
              </>
            )}

            {photoType === 'plantDisease' && (
              <>
                <WTextInput
                  handleBlur={handleBlur('family')}
                  handleChangeText={handleChange('family')}
                  placeholder={'Family'}
                  showError={errors.family && touched.family}
                  errorMessage={errors.family}
                />
                <WTextInput
                  handleBlur={handleBlur('host')}
                  handleChangeText={handleChange('host')}
                  placeholder={'Host'}
                  showError={errors.host && touched.host}
                  errorMessage={errors.host}
                />
                <WTextInput
                  handleBlur={handleBlur('solution')}
                  handleChangeText={handleChange('solution')}
                  placeholder={'Solution'}
                  showError={errors.solution && touched.solution}
                  errorMessage={errors.solution}
                />
                {groupedInputs.map((input, index) => (
                  <GroupedTextInput
                    headerTitle="Need to add a catchy detail?"
                    key={1}
                    error={errors.groupedInputs && errors.groupedInputs[index]}
                    handleBlur={() => {
                      handleBlur(`groupedInputs[${index}].title`);
                      handleBlur(`groupedInputs[${index}].description`);
                    }}
                    handleChangeTextTitle={(text: string) => {
                      setFieldValue(`groupedInputs[${index}].title`, text);
                    }}
                    handleChangeTextDescription={(text: string) => {
                      setFieldValue(
                        `groupedInputs[${index}].description`,
                        text,
                      );
                    }}
                    inputListLength={groupedInputs.length}
                    createTextInput={() => {
                      addGroupedInput();
                    }}
                  />
                ))}
                {groupedSolutionInputs.map((input, index) => (
                  <GroupedTextInput
                    headerTitle="Need to add a catchy detail?"
                    key={input.id}
                    error={
                      errors.groupedSolutionInputs &&
                      errors.groupedSolutionInputs[index]
                    }
                    handleBlur={() => {
                      handleBlur(`groupedSolutionInputs[${index}].title`);
                      handleBlur(`groupedSolutionInputs[${index}].description`);
                    }}
                    handleChangeTextTitle={(text: string) => {
                      setFieldValue(
                        `groupedSolutionInputs[${index}].title`,
                        text,
                      );
                    }}
                    handleChangeTextDescription={(text: string) => {
                      setFieldValue(
                        `groupedSolutionInputs[${index}].description`,
                        text,
                      );
                    }}
                    inputListLength={groupedSolutionInputs.length}
                    createTextInput={() => {
                      addGroupedSolutionInput();
                    }}
                  />
                ))}
              </>
            )}

            <WTextInput
              handleBlur={handleBlur('price')}
              handleChangeText={handleChange('price')}
              placeholder={'Price'}
              showError={errors.price && touched.price}
              errorMessage={errors.price}
              keyboardType="numeric"
            />
          </ScrollView>
          <KeyboardAvoidingView
            style={{backgroundColor: Colors.screenColor}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ConfirmButton buttonText="Add a new Item" onPress={handleSubmit} />
          </KeyboardAvoidingView>
          <Backbutton containsTitle title="Add a New Plant" />
        </View>
      )}
    </Formik>
  );
};

export default AddNewItem;
