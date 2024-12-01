import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
import useCollapsibleContext from '../../hooks/useCollapsibleContext';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { CollapsibleHeaderContext } from '../../hooks/useCollapsibleHeaderContext';
import useSharedValueRef from '../../utils/useSharedValueRef';
export default function CollapsibleHeaderContainerProvider(_ref) {
  let {
    children,
    containerStyle,
    contentKey
  } = _ref;
  const {
    handleHeaderContainerLayout,
    headerViewPositions
  } = useInternalCollapsibleContext();
  const {
    scrollY
  } = useCollapsibleContext();
  const currentLayout = useSharedValue(undefined);
  const [stickyLayouts, setStickyLayouts] = useSharedValueRef({});
  useEffect(() => {
    return () => {
      handleHeaderContainerLayout(contentKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);
  const stickyHeight = useDerivedValue(() => Object.values(stickyLayouts.value).reduce((acc, value) => acc + ((value === null || value === void 0 ? void 0 : value.height) ?? 0), 0), []);
  useAnimatedReaction(() => {
    if (!currentLayout.value) {
      return -1;
    }
    return currentLayout.value.height - currentLayout.value.y - stickyHeight.value;
  }, (result, previous) => {
    if (result !== -1 && result !== previous) {
      runOnJS(handleHeaderContainerLayout)(contentKey, currentLayout.value, stickyHeight.value);
    }
  });
  const handleLayout = useCallback(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    currentLayout.value = layout;
  }, [currentLayout]);
  const handleStickyViewLayout = useCallback((stickyKey, layout) => {
    setStickyLayouts({
      [stickyKey]: layout
    });
  }, [setStickyLayouts]);
  const translateY = useDerivedValue(() => {
    const position = headerViewPositions.value[contentKey];
    if (!currentLayout.value || !position) {
      return 0;
    }
    const topPosition = currentLayout.value.height + currentLayout.value.y - position.top - position.stickyHeight;
    return interpolate(scrollY.value, [0, topPosition, 10000], [0, -topPosition, -topPosition], Extrapolate.CLAMP);
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: translateY.value
      }]
    };
  });
  const animatedY = useDerivedValue(() => {
    const position = headerViewPositions.value[contentKey];
    if (!currentLayout.value || !position) {
      return 0;
    }
    const value = scrollY.value - currentLayout.value.y + position.top;
    const maxV = currentLayout.value.height - stickyHeight.value;
    return Math.max(0, Math.min(value, maxV));
  });
  const value = useMemo(() => ({
    handleStickyViewLayout,
    animatedY
  }), [handleStickyViewLayout, animatedY]);
  return /*#__PURE__*/React.createElement(CollapsibleHeaderContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(Animated.View, {
    key: contentKey,
    style: [styles.container, containerStyle, animatedStyle],
    pointerEvents: "box-none",
    onLayout: handleLayout
  }, children));
}
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=CollapsibleHeaderContainerProvider.js.map