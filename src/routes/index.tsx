import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

import AllLists from '../pages/TaskList/List';


export default function Routes() {
  const options = {
    headerShown: false,
    ...TransitionPresets.RevealFromBottomAndroid,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="AllLists" component={AllLists} options={options} />
    </Stack.Navigator>
  );
}
