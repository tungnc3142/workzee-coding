type AllSurveyValues = {
  [key: string]: any;
};
export type MultiStepSurveyQuestion = {
  key: string;
  questionText: string;
  descriptionText?: string;
  initialValue?: any;
  answerComponent?: React.ComponentType<{
    value: any;
    onChange: (newValue: any) => void;
    allAnswers: AllSurveyValues;
  }>;
  // if no custom answer component - list of checkboxes/radios:
  answers?: {label: string; value: any}[];
  summaryComponent?: React.ComponentType<{
    value: any;
  }>;
  skipable?: boolean;
  isPresent?: (values: AllSurveyValues) => boolean;
  isValid?: (value: any, allValues: AllSurveyValues) => boolean;
};
