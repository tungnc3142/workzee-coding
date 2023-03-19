import {
  MultiStepSurveyQuestion,
  IRadioComponentType,
  IInputComponentType,
  AnswerComponent,
} from '../mockupData';
import {Box} from 'native-base';
import React, {FC, useMemo} from 'react';

type Props = {
  survey: MultiStepSurveyQuestion;
  onChange: (value: any) => void;
  value: any;
};

export const SurveyAnswer: FC<Props> = ({survey, onChange, value}) => {
  const Component = useMemo(() => {
    return survey?.answerComponent as React.ComponentType<AnswerComponent>;
  }, [survey]);

  if (!Component) {
    return null;
  }

  if (!survey.answers?.length) {
    var Input = Component as IInputComponentType;
    return (
      <Box my={3}>
        <Input value={value} onChangeText={onChange} />
      </Box>
    );
  }
  var Radio = Component as IRadioComponentType;
  return (
    <Box my={3}>
      {survey.answers?.map(e => (
        <Box>
          <Radio.Group name="survey-radio" onChange={onChange} value={value}>
            <Radio my={2} value={e.value}>
              {e.label}
            </Radio>
          </Radio.Group>
        </Box> // TODO: render answer with multi option
      ))}
    </Box>
  );
};
