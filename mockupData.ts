import {answerTextInput, answerRadioButton} from './components';

type AllSurveyValues = {
  [key: string]: any;
};

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
    answerComponent: answerTextInput,
  },
  {
    key: '3',
    questionText: 'How helpful is your guidance counselor?',
    skipable: true,
    initialValue: 'Excellent',
    answerComponent: answerRadioButton,
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
];
