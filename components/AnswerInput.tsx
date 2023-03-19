import React, {FC} from 'react';
import {AnswerComponent} from '../mockupData';
import {TextInput} from 'react-native';

export const answerTextInput: FC<AnswerComponent> = ({value, onChange}) => (
  <TextInput value={value} onChange={onChange} placeholder="12321" />
);
