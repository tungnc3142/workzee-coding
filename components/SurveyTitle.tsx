import {Text} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  index: number;
  title: string;
  skipable?: boolean;
};

const styles = StyleSheet.create({
  txtRequire: {
    color: 'red',
  },
});

export const SurveyTitle: FC<Props> = ({title, index, skipable}) => (
  <Text bold fontSize={16}>
    {index + 1}.{title}
    {!skipable && (
      <Text bold style={styles.txtRequire}>
        {' '}
        *
      </Text>
    )}
  </Text>
);
