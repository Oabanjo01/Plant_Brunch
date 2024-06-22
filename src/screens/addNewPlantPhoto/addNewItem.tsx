import GroupedTextInput from '@app/components/addNewPlantPhoto/groupedTextInput';
import WTextInput from '@app/components/addNewPlantPhoto/textInput';
import Backbutton from '@app/components/backbutton';
import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/ConfirmButton';
import WText from '@app/utilities/customText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {err} from 'react-native-svg';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewItem'>;

interface GroupedInputProps {
  id: string;
  title: string;
  description: string;
}
interface GroupedInputProps {
  id: string;
  title: string;
  description: string;
}

const AddNewItem = ({navigation, route}: Props) => {
  const params = route.params;
  const {photoType, uri} = params;

  const [groupedInputs, setGroupedInputs] = useState<GroupedInputProps[]>([]);
  const [groupedSolutionInputs, setGroupedSolutionInputs] = useState<
    GroupedInputProps[]
  >([]);
  const [uniqueIdCounter, setUniqueIdCounter] = useState(0);

  const addGroupedInput = () => {
    setGroupedInputs(previousState => [
      ...previousState,
      {
        id: String(`description - ${uniqueIdCounter}`),
        title: '',
        description: '',
      },
    ]);
    setUniqueIdCounter(prevCounter => prevCounter + 1);
  };

  const addGroupedSolutionInput = () => {
    setGroupedSolutionInputs(previousState => [
      ...previousState,
      {
        id: String(`solution - ${groupedSolutionInputs.length + 1}`),
        title: '',
        description: '',
      },
    ]);
    setUniqueIdCounter(prevCounter => prevCounter + 1);
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
    cycle: Yup.string().test(
      'cyclePlantTypeCheck',
      'Plant cycle is a required field',
      (value, context) => photoType !== 'plantPhotograph' || !!value?.trim(),
    ),
    watering: Yup.string().test(
      'watering',
      'Rate of watering is a required field',
      (value, context) => photoType !== 'plantPhotograph' || !!value?.trim(),
    ),
    sunlight: Yup.string().test(
      'sunlight',
      'Intensity of sunlight is a required field',
      (value, context) => photoType !== 'plantPhotograph' || !!value?.trim(),
    ),
    family: Yup.string().test(
      'family',
      'Family of this plant is a required field',
      (value, context) => photoType !== 'plantDisease' || !!value?.trim(),
    ),
    host: Yup.string().test(
      'host',
      'Host of this plant is a required field',
      (value, context) => photoType !== 'plantDisease' || !!value?.trim(),
    ),
  });

  const initialValues = {
    price: '',
    scientific_Name: '',
    common_name: '',
    other_Name: '',
    cycle: '', // regular
    watering: '', // regular
    sunlight: '', // regular
    groupedInputs: groupedInputs, // disease
    groupedSolutionInputs: groupedSolutionInputs, // disease
    family: '', // disease
    host: '', // disease
  };

  console.log(groupedSolutionInputs, 'groupedInput');
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}>
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
            height: '100%',
          }}>
          <ScrollView
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                width: screenWidth * 0.9,
                // marginBottom: screenHeight * 0.025,
                paddingTop: screenHeight * 0.15,
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

                <Pressable
                  style={{...styles.addInputStyle, marginTop: 10}}
                  onPress={
                    groupedInputs.length === 0 ? () => addGroupedInput() : null
                  }>
                  <View>
                    <WText>Description - {groupedInputs.length}</WText>
                  </View>
                </Pressable>
                {groupedInputs.map((input, index) => (
                  <GroupedTextInput
                    headerTitle="Need to add a catchy detail?"
                    index={index}
                    key={input.id}
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
                    deleteItem={() => {
                      setGroupedInputs(prev =>
                        prev.filter((_, i) => i !== index),
                      );
                    }}
                  />
                ))}
                <Pressable
                  style={styles.addInputStyle}
                  onPress={
                    groupedSolutionInputs.length === 0
                      ? () => addGroupedSolutionInput()
                      : null
                  }>
                  <View>
                    <WText>Solution - {groupedSolutionInputs.length}</WText>
                  </View>
                </Pressable>
                {groupedSolutionInputs.map((input, index) => (
                  <GroupedTextInput
                    headerTitle="Need to add a catchy detail?"
                    key={input.id}
                    index={index}
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
                    deleteItem={() =>
                      setGroupedSolutionInputs(prev =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                  />
                ))}
              </>
            )}

            <WTextInput
              handleBlur={handleBlur('price')}
              handleChangeText={handleChange('price')}
              placeholder={'Price'}
              isAmount
              showError={errors.price && touched.price}
              errorMessage={errors.price}
              keyboardType="numeric"
            />

            <Backbutton containsTitle title="Add a New Plant" />
          </ScrollView>
          <KeyboardAvoidingView
            style={{
              backgroundColor: Colors.screenColor,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ConfirmButton
              buttonText="Add a new Item"
              onPress={() => {
                handleSubmit();
              }}
            />
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  addInputStyle: {
    borderWidth: 1,
    paddingHorizontal: screenWidth * 0.1,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default AddNewItem;
