/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolateColor, interpolate, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
let key = 0;
export default function CollapsibleView(_ref) {
  let {
    initialState = 'collapsed',
    collapseState = useSharedValue(0),
    renderHeader,
    children,
    containerStyle,
    collapsedBackgroundColor,
    expandedBackgroundColor,
    onToggle
  } = _ref;
  const actualHeight = useSharedValue(11110);
  const contentKey = useMemo(() => `collapsible-view-${key++}`, []);
  useEffect(() => {
    const newValue = initialState === 'collapsed' ? 0 : 1;
    if (newValue === collapseState.value) {
      return;
    }
    collapseState.value = newValue;
  }, [initialState]);
  const handleToggle = useCallback(() => {
    collapseState.value = withSpring(collapseState.value === 0 ? 1 : 0, {
      overshootClamping: true
    });
  }, []);
  const handleLayout = useCallback(event => {
    if (event.nativeEvent.layout.height >= 0) {
      actualHeight.value = event.nativeEvent.layout.height;
    }
  }, []);
  const wrapperStyle = useAnimatedStyle(() => ({
    height: withSpring(collapseState.value === 1 ? actualHeight.value : 0, {
      damping: 5,
      stiffness: 130,
      overshootClamping: true
    })
  }), [actualHeight, contentKey]);
  const contentHeight = useAnimatedStyle(() => ({
    height: actualHeight.value > 0 ? actualHeight.value : undefined
  }), [actualHeight, contentKey]);
  useAnimatedReaction(() => collapseState.value === 0 ? 0 : collapseState.value === 1 ? 1 : 0, (result, prev) => {
    if (prev === null || result === prev) {
      return;
    }
    if (onToggle) {
      runOnJS(onToggle)(result === 1);
    }
  });

  // @ts-ignore
  const containerAnimatedStyle = useAnimatedStyle(() => {
    if (collapsedBackgroundColor && expandedBackgroundColor) {
      return {
        backgroundColor: interpolateColor(collapseState.value, [0, 1], [collapsedBackgroundColor, expandedBackgroundColor])
      };
    }
    return {};
  }, []);
  const headerProps = useMemo(() => ({
    onToggle: handleToggle,
    collapsed: collapseState
  }), [handleToggle, collapseState]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [containerStyle, containerAnimatedStyle],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(View, {
    pointerEvents: "box-none"
  }, renderHeader(headerProps)), /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.wrapper, wrapperStyle],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.content, contentHeight],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(View, {
    key: contentKey,
    onLayout: handleLayout,
    pointerEvents: "box-none"
  }, children))));
}
export function CollapsibleHeaderText(_ref2) {
  let {
    title,
    collapsed,
    onToggle,
    style,
    titleStyle,
    icon,
    iconInitialAngle = 0,
    children
  } = _ref2;
  const iconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(collapsed.value, [0, 1], [iconInitialAngle, 180]);
    return {
      transform: [{
        rotate: `${rotate}deg`
      }]
    };
  }, [iconInitialAngle]);
  return /*#__PURE__*/React.createElement(View, {
    style: style,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Pressable, {
    onPress: onToggle
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.headerTitle, titleStyle]
  }, title)), icon && /*#__PURE__*/React.createElement(Pressable, {
    onPress: onToggle
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: iconStyle
  }, icon))), children);
}
const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden'
  },
  content: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    // flex: 1,
  }
});
//# sourceMappingURL=CollapsibleView.js.map