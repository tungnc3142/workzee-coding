/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import SurveyScreen from './SurveyScreen';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {View} from 'react-native';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <SurveyScreen />
      </View>
    </NativeBaseProvider>
  );
}

export default App;
