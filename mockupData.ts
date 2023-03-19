import {
  IInputProps,
  IRadioGroupProps,
  IRadioProps,
  Input,
  Radio,
} from 'native-base';
import {MutableRefObject} from 'react';

export type AllSurveyValues = {
  [key: string]: any;
};

export type IRadioComponentType = ((props: IRadioProps) => JSX.Element) & {
  Group: React.MemoExoticComponent<
    (
      props: IRadioGroupProps & {
        ref?: MutableRefObject<any>;
      },
    ) => JSX.Element
  >;
};

export type IInputComponentType = (props: IInputProps) => JSX.Element;

export type AnswerComponent = {
  value: any;
  onChange: (newValue: any) => void;
  allAnswers: AllSurveyValues;
};

export type MultiStepSurveyQuestion = {
  key: string;
  questionText: string;
  descriptionText?: string;
  initialValue?: any;
  answerComponent?: React.ComponentType<AnswerComponent>;
  // if no custom answer component - list of checkboxes/radios:
  answers?: {label: string; value: any}[];
  summaryComponent?: React.ComponentType<{
    value: any;
  }>;
  skipable?: boolean;
  isPresent?: (values: AllSurveyValues) => boolean;
  isValid?: (value: any, allValues: AllSurveyValues) => boolean;
};

export const surveyList: Array<MultiStepSurveyQuestion> = [
  {
    key: '1',
    questionText: 'Do you enjoy learning remotely?',
    answerComponent: Radio,
    answers: [
      {
        label: 'Yes',
        value: 'Yes',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    skipable: false,
  },
  {
    key: '2',
    questionText:
      'Are there any specific strengths of this school that you would like to address?',
    skipable: false,
    answerComponent: Input,
  },
  {
    key: '3',
    questionText: 'How helpful is your guidance counselor?',
    skipable: true,
    initialValue: 'Helpful',
    answerComponent: Radio,
    answers: [
      {
        value: 'Extremely Helpful',
        label: 'Extremely Helpful',
      },
      {
        value: 'Helpful',
        label: 'Helpful',
      },
      {
        value: 'Somewhat Helpful',
        label: 'Somewhat Helpful',
      },
      {
        value: 'Not Helpful',
        label: 'Not Helpful',
      },
    ],
  },
  {
    key: '4',
    questionText: 'Do you have a dog?',
    answers: [
      {
        label: 'Yes',
        value: 'Yes',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    skipable: false,
    answerComponent: Radio,
  },
  {
    key: '5',
    questionText: 'What’s your dog’s name?',
    answerComponent: Input,
    isPresent: value => value?.value === 'Yes',
  },
];
