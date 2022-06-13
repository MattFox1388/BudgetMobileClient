import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface HamburgerIconProps {
  color?: string;
  height?: number;
  width?: number;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  color = '#000000',
  height = 10,
  width = 10,
}) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 24 24">
        <path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z" />
      </Svg>
    </View>
  );
};

export default HamburgerIcon;
