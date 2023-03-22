import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AnswerType, MultiStepSurveyQuestion, surveyList} from './mockupData';
import {Box, FormControl} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SurveyAction,
  SurveyAnswer,
  SurveyResult,
  SurveyTitle,
} from './components';

const SurveyScreen: React.FC = ({}) => {
  const [answers, setAnswer] = useState<Array<AnswerType>>([]);
  const [currentSurveyIndex, setCurrentSurvey] = useState<number>(0);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false);

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

  const updateAnswerValue = useCallback((value: any, index: number) => {
    setAnswer(prev => {
      const _allAnswer = [...prev];
      _allAnswer[index].value = value;
      return _allAnswer;
    });
  }, []);

  const isShowAnswerDependentAfterEdit = useCallback(
    (answerCanVisible: MultiStepSurveyQuestion, currentAnswer: AnswerType) => {
      if (
        answerCanVisible &&
        answerCanVisible.visibleIf &&
        currentAnswer.key === answerCanVisible.visibleIf().key
      ) {
        if (currentAnswer.value === answerCanVisible.visibleIf().value) {
          return true;
        }
      }
      return false;
    },
    [],
  );

  const showResultAfterEditAnswer = useCallback(() => {
    // check if current question has child question -> show or remove answer in results
    const currentAnswer = answers[currentSurveyIndex];
    const answerCanVisibleIndex = surveyList.findIndex(s => s.visibleIf);
    if (answerCanVisibleIndex !== -1) {
      const answerCanVisible = surveyList[answerCanVisibleIndex];
      if (isShowAnswerDependentAfterEdit(answerCanVisible, currentAnswer)) {
        setCurrentSurvey(answerCanVisibleIndex);
        return;
      }

      if (
        answerCanVisible.visibleIf &&
        currentAnswer.value === answerCanVisible.visibleIf().value
      ) {
        updateAnswerValue(undefined, answerCanVisibleIndex);
      }
    }
    setShowResult(true);
    setIsEditQuestion(false);
  }, [
    answers,
    currentSurveyIndex,
    isShowAnswerDependentAfterEdit,
    updateAnswerValue,
  ]);

  const onShowResult = useCallback(() => setShowResult(true), []);

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

    // TODO: check is edit question mode -> show summary result
    if (isEditQuestion) {
      showResultAfterEditAnswer();
      return;
    }
    setCurrentSurvey(prev => prev + 1);
  }, [
    checkIsValidAnswer,
    isEditQuestion,
    isInvalid,
    showResultAfterEditAnswer,
  ]);

  const disableNext = useMemo(() => {
    return currentSurveyIndex === surveyList.length - 1;
  }, [currentSurveyIndex]);

  const disablePrevious = useMemo(() => {
    return currentSurveyIndex === 0;
  }, [currentSurveyIndex]);

  const onEditAnswer = useCallback((index: number) => {
    setIsEditQuestion(true);
    setShowResult(false);
    setCurrentSurvey(index);
  }, []);

  useEffect(() => {
    const currentSurvey = surveyList[currentSurveyIndex];
    if (
      currentSurveyIndex <= surveyList.length - 1 &&
      currentSurvey &&
      currentSurvey.visibleIf
    ) {
      const {key, value} = currentSurvey.visibleIf();
      const isVisible =
        answers.findIndex(a => a.key === key && a.value === value) !== -1;
      if (!isVisible) {
        if (currentSurveyIndex === surveyList.length - 1) {
          // question dependent is last survey -> show summary survey
          setShowResult(true);
          return;
        }
        setCurrentSurvey(prev => prev + 1);
      }
    }
  }, [answers, currentSurveyIndex]);

  useEffect(() => {
    const initialAnswer: Array<AnswerType> = [];
    var answer: AnswerType = {
      value: '',
      key: '',
    };
    surveyList.forEach(s => {
      answer = {
        key: s.key,
        value: s?.initialValue || undefined,
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
                  updateAnswerValue(value, currentSurveyIndex);
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
              onShowResult={onShowResult}
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
