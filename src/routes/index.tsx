import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

import TaskLists from '../pages/TaskList';
import Tasks from '../pages/Task/List';

export default function Routes() {
  const options = {
    headerShown: false,
    ...TransitionPresets.RevealFromBottomAndroid,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskLists" component={TaskLists} options={options} />
      <Stack.Screen name="Tasks" component={Tasks} options={options} />
    </Stack.Navigator>
  );
}
