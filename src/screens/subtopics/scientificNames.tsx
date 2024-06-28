import {View, SectionList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import WText from '@app/utilities/customText';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {getThemeColor} from '@app/constants/colors';

import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {useFetchData} from '@app/utilities/hooks/apiData/useFetchData';
import LoadingIndicator from '@app/utilities/loadingIndicator';
import {showToast} from '@app/utilities/toast';
import Backbutton from '@app/components/backbutton';

interface SectionType {
  title: string;
  data: string[];
}

const PlantList = () => {
  const [scientificNamesList, setScientificNameList] = useState<SectionType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    plantList,
    plantDisease,
    isLoading: isFetching,
    displayName,
    fetchdata,
    refreshing,
    setRefreshing,
  } = useFetchData();

  useEffect(() => {
    const fetchDataAndProcessData = async () => {
      setIsLoading(true);
      try {
        await fetchdata();
        getScientificNamesInSections();
      } catch (error) {
        showToast({
          text1: 'Error',
          text2: 'An error occurred while fetching list',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataAndProcessData();
  }, [plantList, plantDisease]);

  const getScientificNamesInSections = () => {
    const generalPhotographyList = plantList.map(item => {
      return item.scientific_name[0];
    });
    const generalDiseaseList = plantDisease.map(item => {
      return item.scientific_name;
    });
    const generalList = [...generalPhotographyList, ...generalDiseaseList];
    // const list = generalList.sort((a, b) => (a > b ? 1 : -1)); // works
    const filteredList = generalList.filter(item => item.trim() !== '');
    const sortedList = filteredList.sort((a, b) => a.localeCompare(b)); // this is better with strings tho, cause of special characters and localizations
    try {
      const scientificNamesList: string[][] = [];

      let currentList: string[] = [];
      if (sortedList.length > 0) {
        let firstLetter = sortedList[0][0];

        for (let index = 0; index < sortedList.length; index++) {
          const firstWord = sortedList[index];
          if (firstWord[0] === firstLetter) {
            currentList.push(firstWord);
          } else {
            scientificNamesList.push(currentList);
            currentList = [firstWord];
            firstLetter = firstWord[0]; // this is where it reassigns firstLetter.
          }
        }
        scientificNamesList.push(currentList);
      }
      const sections: SectionType[] = scientificNamesList.map(data => ({
        title: data[0][0], // Assuming the title is the first letter of the first word in the group
        data: data,
      }));
      setScientificNameList(sections);
      return scientificNamesList;
    } catch (error) {
      console.error(error);
    }
  };

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingIndicator size={40} showIcon />
      ) : (
        <View
          style={{
            paddingTop: screenHeight * 0.14,
            backgroundColor: Colors.screenColor,
            height: '100%',
          }}>
          <SectionList
            contentContainerStyle={{
              paddingBottom: screenHeight * 0.05,
            }}
            sections={scientificNamesList}
            ListEmptyComponent={
              <View
                style={{
                  height: '100%',
                  alignSelf: 'center',
                }}>
                <WText>We can't fetch these names now</WText>
              </View>
            }
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section}) => (
              <View
                style={{
                  backgroundColor: Colors.lighterBlack,
                  marginHorizontal: screenWidth * 0.05,
                  paddingHorizontal: screenHeight * 0.02,
                  paddingVertical: screenHeight * 0.02,
                  borderRadius: 10,
                  marginBottom: screenHeight * 0.01,
                }}>
                <WText style={{color: Colors.primaryTextColor}}>{item}</WText>
              </View>
            )}
            stickySectionHeadersEnabled
            renderSectionHeader={({section: {title}}) => (
              <View
                style={{
                  paddingVertical: screenHeight * 0.02,
                  marginVertical: screenHeight * 0.03,
                  borderWidth: 1,
                  borderRadius: 20,
                  width: screenWidth * 0.5,
                  alignSelf: 'center',
                  borderColor: Colors.primary,
                  alignItems: 'center',
                  paddingHorizontal: screenWidth * 0.05,
                }}>
                <WText
                  style={{
                    color: Colors.primaryTextColor,
                    fontFamily: Fonts.semiBold,
                  }}>
                  {title}
                </WText>
              </View>
            )}
          />
          <Backbutton containsTitle title="Scientific Names" />
        </View>
      )}
    </>
  );
};

export default PlantList;

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    padding: 10,
  },
});
