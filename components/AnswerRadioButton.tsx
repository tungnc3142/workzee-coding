import React, {FC} from 'react';
import {AnswerComponent} from '../mockupData';
import {Radio} from 'native-base';

export const answerRadioButton: FC<AnswerComponent> = ({value}) => {
  return <Radio value={value} margin={1} />;
};
