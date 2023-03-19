import {StyleSheet} from 'react-native';
import {AllSurveyValues, surveyList} from '../mockupData';
import {Box, FlatList, Flex, IconButton, Text, DeleteIcon} from 'native-base';
import React, {FC} from 'react';

type Props = {
  answers: Array<AllSurveyValues>;
  onEditAnswer: (index: number) => void;
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export const SurveyResult: FC<Props> = ({answers, onEditAnswer}) => {
  const onPressIcon = (index: number) => () => {
    onEditAnswer(index);
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: AllSurveyValues;
    index: number;
  }) => {
    if (item.value === undefined) {
      return null;
    }
    return (
      <Box key={index} marginBottom={5}>
        <Flex direction="row" alignItems="center">
          <Text bold style={styles.container}>
            {index + 1}.{surveyList[index].questionText}
          </Text>
          <IconButton
            onPress={onPressIcon(index)}
            icon={<DeleteIcon size={4} />}
          />
        </Flex>
        <Text>{item.value?.toString()}</Text>
      </Box>
    );
  };
  return (
    <Box>
      <Text bold textAlign="center" fontSize={18} marginBottom={5}>
        Survey Result
      </Text>
      <FlatList bounces={false} data={answers} renderItem={renderItem} />
    </Box>
  );
};
