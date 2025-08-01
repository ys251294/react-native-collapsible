function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { runOnJS, useAnimatedProps, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import useAnimatedScroll from '../components/scrollable/useAnimatedScroll';
import useInternalCollapsibleContext from '../hooks/useInternalCollapsibleContext';
import AnimatedTopView from '../components/header/AnimatedTopView';
import useCollapsibleContext from '../hooks/useCollapsibleContext';
import { AnimatedLegendList } from '@legendapp/list/reanimated';
export default function CollapsibleLegendList(_ref) {
  let {
    headerSnappable = true,
    ...props
  } = _ref;
  const {
    headerHeight
  } = useCollapsibleContext();
  const {
    scrollViewRef,
    fixedHeaderHeight
  } = useInternalCollapsibleContext();
  const mounted = useRef(true);
  const internalProgressViewOffset = useSharedValue(0);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const scrollTo = useCallback(function (yValue) {
    var _scrollViewRef$curren;
    let animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollToOffset({
      offset: yValue,
      animated
    });
  }, []);
  const scrollToIndex = useCallback(params => {
    var _scrollViewRef$curren2;
    (_scrollViewRef$curren2 = scrollViewRef.current) === null || _scrollViewRef$curren2 === void 0 ? void 0 : _scrollViewRef$curren2.scrollToIndex(params);
  }, []);
  const scrollToLocation = useCallback(() => {
    console.warn('CollapsibleLegendList does not support scrollToLocation');
  }, []);
  const {
    scrollHandler
  } = useAnimatedScroll({
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  });
  const handleInternalProgressViewOffset = useCallback(value => {
    if (mounted.current) {
      internalProgressViewOffset.value = value;
    }
  }, []);
  useAnimatedReaction(() => {
    return fixedHeaderHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      runOnJS(handleInternalProgressViewOffset)(result);
    }
  });
  const handleScrollToIndexFailed = useCallback(() => {}, []);
  function renderListHeader() {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(AnimatedTopView, {
      height: headerHeight
    }), props.ListHeaderComponent);
  }
  const animatedProps = useAnimatedProps(() => {
    return {
      progressViewOffset: internalProgressViewOffset.value
    };
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/React.createElement(AnimatedLegendList, _extends({
    ref: scrollViewRef,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1,
    onScrollToIndexFailed: handleScrollToIndexFailed
  }, props, {
    onScroll: scrollHandler,
    ListHeaderComponent: renderListHeader()
    //@ts-ignore
    ,
    simultaneousHandlers: [],
    animatedProps: animatedProps
  })));
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainer: {
    flexGrow: 1
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
//# sourceMappingURL=CollapsibleLegendList.js.map