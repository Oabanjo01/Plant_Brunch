import GroupedTextInput from '@app/components/addNewPlantPhoto/groupedTextInput';
import WTextInput from '@app/components/addNewPlantPhoto/textInput';
import Backbutton from '@app/components/backbutton';
import {Routes} from '@app/constants';
import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/confirmButton';
import {useConvertToBase64} from '@app/utilities/convertToBase64';
import WText from '@app/utilities/customText';
import {useAddNewItem} from '@app/utilities/hooks/addNewItem/useAddNewItem';
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
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewItem'>;

interface GroupedInputProps {
  id: string;
  subtitle: string;
  description: string;
}
interface GroupedInputProps {
  id: string;
  subtitle: string;
  description: string;
}

// TODO: Fix issue with bottom button

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
        subtitle: '',
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
        subtitle: '',
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

  const {base64List} = useConvertToBase64(uri);
  const {addNewItem, isLoading} = useAddNewItem();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        const regularPayload = {
          price: values.price,
          scientific_Name: values.scientific_Name,
          common_name: values.common_name,
          other_Name: values.other_Name,
          cycle: values.cycle,
          type: 'regular',
          watering: values.watering,
          sunlight: values.sunlight,
          images: base64List,
        };
        const diseasePayload = {
          price: values.price,
          scientific_Name: values.scientific_Name,
          common_name: values.common_name,
          other_Name: values.other_Name,
          type: 'disease',
          groupedInputs: values.groupedInputs,
          groupedSolutionInputs: values.groupedSolutionInputs,
          family: values.family,
          host: values.host,
          images: base64List,
        };
        addNewItem(
          values.common_name,
          photoType === 'plantDisease' ? diseasePayload : regularPayload,
        ).then(() => navigation.navigate(Routes.Home));
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: screenHeight * 0.2}}>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                width: screenWidth,
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
                    <View
                      style={{
                        width: screenWidth,
                        alignItems: 'center',
                      }}>
                      <FastImage
                        source={{uri: `file://${item}`}}
                        resizeMode={'cover'}
                        style={{
                          height: screenHeight * 0.4,
                          width: screenWidth * 0.85,
                          borderWidth: 1,
                          borderColor: Colors.lighterBlack,
                          marginBottom: screenHeight * 0.05,
                          borderRadius: 20,
                        }}
                      />
                    </View>
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
                      handleBlur(`groupedInputs[${index}].subtitle`);
                      handleBlur(`groupedInputs[${index}].description`);
                    }}
                    handleChangeTextTitle={(text: string) => {
                      setFieldValue(`groupedInputs[${index}].subtitle`, text);
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
                      handleBlur(`groupedSolutionInputs[${index}].subtitle`);
                      handleBlur(`groupedSolutionInputs[${index}].description`);
                    }}
                    handleChangeTextTitle={(text: string) => {
                      setFieldValue(
                        `groupedSolutionInputs[${index}].subtitle`,
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
          </ScrollView>
          <Backbutton containsTitle title="Add a New Plant" />
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
