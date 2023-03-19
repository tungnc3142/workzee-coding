import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {surveyList} from './mockupData';
import {Box, FormControl} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SurveyAction,
  SurveyAnswer,
  SurveyResult,
  SurveyTitle,
} from './components';

export type AnswerType = {
  value: any;
};

const SurveyScreen: React.FC = ({}) => {
  const [answers, setAnswer] = useState<Array<AnswerType>>([]);
  const [currentSurveyIndex, setCurrentSurvey] = useState<number>(0);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  const survey = useMemo(
    () => surveyList[currentSurveyIndex],
    [currentSurveyIndex],
  );

  const checkIsValidAnswer = useCallback(() => {
    if (surveyList[currentSurveyIndex].skipable) {
      return true;
    }
    return answers[currentSurveyIndex].value !== undefined;
  }, [answers, currentSurveyIndex]);

  const messageError = useMemo(() => {
    if (surveyList[currentSurveyIndex].answers?.length) {
      return 'Please select a answer';
    }
    return 'Please enter the answer';
  }, [currentSurveyIndex]);

  const onPrev = useCallback(() => {
    if (!checkIsValidAnswer()) {
      setIsInvalid(true);
      return;
    }
    if (isInvalid) {
      setIsInvalid(false);
    }
    setCurrentSurvey(prev => prev - 1);
  }, [checkIsValidAnswer, isInvalid]);

  const onNext = useCallback(() => {
    if (!checkIsValidAnswer()) {
      setIsInvalid(true);
      return;
    }
    if (isInvalid) {
      setIsInvalid(false);
    }
    if (currentSurveyIndex !== surveyList.length - 1) {
      setCurrentSurvey(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [checkIsValidAnswer, currentSurveyIndex, isInvalid]);

  const disableNext = useMemo(() => {
    return currentSurveyIndex === surveyList.length - 1;
  }, [currentSurveyIndex]);

  const disablePrevious = useMemo(() => {
    return currentSurveyIndex === 0;
  }, [currentSurveyIndex]);

  const onEditAnswer = useCallback((index: number) => {
    setShowResult(false);
    setCurrentSurvey(index);
  }, []);

  useEffect(() => {
    const initialAnswer: Array<AnswerType> = [];
    var answer: AnswerType = {
      value: '',
    };
    surveyList.forEach(_ => {
      answer = {
        value: undefined,
      };
      initialAnswer.push(answer);
    });
    setAnswer(initialAnswer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Box style={[styles.container, styles.content]}>
        {!showResult ? (
          <FormControl style={styles.container} isInvalid={isInvalid}>
            <SurveyTitle
              index={currentSurveyIndex}
              title={survey.questionText}
              skipable={survey.skipable}
            />
            <Box style={styles.container}>
              <SurveyAnswer
                survey={survey}
                onChange={value => {
                  setAnswer(prev => {
                    const _allAnswer = [...prev];
                    _allAnswer[currentSurveyIndex].value = value;
                    return _allAnswer;
                  });
                }}
                value={answers[currentSurveyIndex]?.value}
              />
              <FormControl.ErrorMessage>
                {messageError}
              </FormControl.ErrorMessage>
            </Box>
            <SurveyAction
              onPrev={onPrev}
              onNext={onNext}
              disableNext={disableNext}
              disablePrevious={disablePrevious}
              isLastQuestion={currentSurveyIndex === surveyList.length - 1}
            />
          </FormControl>
        ) : (
          <SurveyResult answers={answers} onEditAnswer={onEditAnswer} />
        )}
      </Box>
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
