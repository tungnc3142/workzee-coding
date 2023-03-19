import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  surveyList,
  MultiStepSurveyQuestion,
  AnswerComponent,
} from './mockupData';
import {Box, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

const SurveyScreen: React.FC = ({}) => {
  const [currentSurveyIndex, setCurrentSurvey] = useState<number>(1);

  const renderAnswerSurvey = useCallback((survey: MultiStepSurveyQuestion) => {
    const Component: React.ComponentType<AnswerComponent> | undefined =
      survey.answerComponent;
    return (
      <Box>
        {survey.answers?.map(e => (
          <Box>
            {Component !== undefined && (
              <Component
                value={e.value}
                onChange={value => {
                  console.log(value);
                }}
                allAnswers={{}}
              />
            )}
          </Box>
        ))}
        {Component !== undefined && (
          <Component
            value={''}
            onChange={value => {
              console.log(value);
            }}
            allAnswers={{}}
          />
        )}
      </Box>
    );
  }, []);

  const renderSurvey = useCallback(() => {
    const _survey = surveyList[currentSurveyIndex];
    return (
      <Box key={_survey.key}>
        <Text bold fontSize={16}>
          {currentSurveyIndex + 1}.{_survey.questionText}
          {!_survey.skipable && (
            <Text bold style={styles.txtRequire}>
              {' '}
              *
            </Text>
          )}
        </Text>
        {!_survey.answers?.length && renderAnswerSurvey(_survey)}
      </Box>
    );
  }, [currentSurveyIndex, renderAnswerSurvey]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.content]}>{renderSurvey()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 16,
  },
  txtRequire: {
    color: 'red',
  },
});

export default SurveyScreen;
