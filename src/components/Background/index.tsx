import React from 'react';
import {BackgroundStyle} from './styles';
export default function Background({children}: any) {
  const backgroundImage = require('../../assets/tasklist-city.jpg');
  return (
    <BackgroundStyle source={backgroundImage} resizeMode={'cover'}>
      {children}
    </BackgroundStyle>
  );
}
