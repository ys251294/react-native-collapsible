import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
export default function AnimatedTopView(_ref) {
  let {
    height
  } = _ref;
  const contentStyle = useAnimatedStyle(() => ({
    height: height.value
  }), []);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: contentStyle
  });
}
//# sourceMappingURL=AnimatedTopView.js.map