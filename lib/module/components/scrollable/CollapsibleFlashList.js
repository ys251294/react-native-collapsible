function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import useAnimatedScroll from './useAnimatedScroll';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
import AnimatedTopView from '../header/AnimatedTopView';
import useCollapsibleContext from '../../hooks/useCollapsibleContext';
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
export default function CollapsibleFlatList(_ref) {
  let {
    headerSnappable = true,
    ...props
  } = _ref;
  const {
    headerHeight
  } = useCollapsibleContext();
  const {
    scrollViewRef,
    fixedHeaderHeight,
    contentMinHeight
  } = useInternalCollapsibleContext();
  const mounted = useRef(true);
  const [internalProgressViewOffset, setInternalProgressViewOffset] = useState(0);
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
  const handleInternalProgressViewOffset = useCallback(value => {
    if (mounted.current) {
      setInternalProgressViewOffset(value);
    }
  }, []);
  const additionalBottomHeight = useDerivedValue(() => {
    return contentMinHeight.value - fixedHeaderHeight.value;
  });
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
  function renderListFooter() {
    return /*#__PURE__*/React.createElement(View, null, props.ListFooterComponent, /*#__PURE__*/React.createElement(AnimatedTopView, {
      height: additionalBottomHeight
    }));
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/React.createElement(AnimatedFlashList, _extends({
    ref: scrollViewRef,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1,
    onScrollToIndexFailed: handleScrollToIndexFailed
  }, props, {
    onScroll: scrollHandler,
    ListHeaderComponent: renderListHeader(),
    ListFooterComponent: renderListFooter()
    //@ts-ignore
    ,
    simultaneousHandlers: [],
    progressViewOffset: internalProgressViewOffset
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
//# sourceMappingURL=CollapsibleFlashList.js.map