import {Box, Button, Flex} from 'native-base';
import React, {FC} from 'react';

type Props = {
  disableNext?: boolean;
  disablePrevious?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onShowResult: () => void;
  isLastQuestion?: boolean;
};

export const SurveyAction: FC<Props> = ({
  disableNext,
  disablePrevious,
  onPrev,
  onNext,
  onShowResult,
  isLastQuestion,
}) => {
  return (
    <Box width="100%">
      <Flex direction="row">
        <Button
          width="45%"
          isDisabled={disablePrevious}
          onPress={onPrev}
          marginRight={3}>
          Prev
        </Button>
        {!isLastQuestion ? (
          <Button
            width="48%"
            marginLeft={3}
            isDisabled={disableNext}
            onPress={onNext}>
            Next
          </Button>
        ) : (
          <Button width="48%" marginLeft={3} onPress={onShowResult}>
            Get summary survey
          </Button>
        )}
      </Flex>
    </Box>
  );
};
