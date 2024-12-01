function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable react-hooks/exhaustive-deps */
import AnimatedTopView from '../header/AnimatedTopView';
import useAnimatedScroll from './useAnimatedScroll';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated';
import useCollapsibleContext from '../../hooks/useCollapsibleContext';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
export default function CollapsibleScrollView(_ref) {
  let {
    headerSnappable = true,
    children,
    refreshing = false,
    onRefresh,
    ...props
  } = _ref;
  const {
    contentMinHeight,
    scrollViewRef,
    fixedHeaderHeight
  } = useInternalCollapsibleContext();
  const {
    headerHeight
  } = useCollapsibleContext();
  const [internalProgressViewOffset, setInternalProgressViewOffset] = useState(0);
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const scrollTo = useCallback(function (yValue) {
    var _scrollViewRef$curren;
    let animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollTo({
      y: yValue,
      animated
    });
  }, []);
  const scrollToIndex = useCallback(() => {
    console.warn("CollapsibleScrollView doesn't support scrollToIndex");
  }, []);
  const scrollToLocation = useCallback(() => {
    console.warn('CollapsibleFlatList does not support scrollToLocation');
  }, []);
  const {
    scrollHandler
  } = useAnimatedScroll({
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      minHeight: contentMinHeight.value
    };
  }, []);
  const handleInternalProgressViewOffset = useCallback(value => {
    if (mounted.current) {
      setInternalProgressViewOffset(value);
    }
  }, []);
  useAnimatedReaction(() => {
    return fixedHeaderHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      runOnJS(handleInternalProgressViewOffset)(result);
    }
  });
  const contentContainerStyle = useMemo(() => [styles.contentContainer, props.contentContainerStyle], [props.contentContainerStyle]);
  return /*#__PURE__*/React.createElement(Animated.ScrollView, _extends({
    ref: scrollViewRef,
    refreshControl: onRefresh ? /*#__PURE__*/React.createElement(RefreshControl, {
      progressViewOffset: internalProgressViewOffset,
      refreshing: refreshing,
      onRefresh: onRefresh
    }) : undefined
  }, props, {
    style: [styles.container, props.style],
    contentContainerStyle: contentContainerStyle,
    onScroll: scrollHandler,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: animatedStyle
  }, /*#__PURE__*/React.createElement(AnimatedTopView, {
    height: headerHeight
  }), children));
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainer: {
    flexGrow: 1
  }
});
//# sourceMappingURL=CollapsibleScrollView.js.map