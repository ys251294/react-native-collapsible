function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import Animated, { runOnJS, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import useAnimatedScroll from './useAnimatedScroll';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
import AnimatedTopView from '../header/AnimatedTopView';
import useCollapsibleContext from '../../hooks/useCollapsibleContext';
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
export default function CollapsibleSectionList(_ref) {
  let {
    headerSnappable = true,
    ...props
  } = _ref;
  const {
    headerHeight,
    stickyHeaderHeight
  } = useCollapsibleContext();
  const {
    contentMinHeight,
    scrollViewRef,
    fixedHeaderHeight,
    scrollViewRefs
  } = useInternalCollapsibleContext();
  const mounted = useRef(true);
  const contentHeight = useRef(0);
  const [internalContentMinHeight, setInternalContentMinHeight] = useState(contentMinHeight.value);
  const [internalProgressViewOffset, setInternalProgressViewOffset] = useState(0);
  function setRef(ref) {
    var _scrollViewRefs$curre;
    (_scrollViewRefs$curre = scrollViewRefs.current) === null || _scrollViewRefs$curre === void 0 ? void 0 : _scrollViewRefs$curre.push(ref);
    // TODO: might be breaking some functionality another option might be to try callback ref
    // @ts-ignore
    scrollViewRef.current = ref;
  }
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const scrollTo = useCallback(() => {
    console.warn('Not supported');
  }, []);
  const scrollToIndex = useCallback(() => {
    console.warn('Not supported');
  }, []);
  const scrollToLocation = useCallback(params => {
    var _scrollViewRef$curren;
    (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollToLocation(params);
  }, [scrollViewRef]);
  const {
    scrollHandler
  } = useAnimatedScroll({
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  });
  const handleInternalContentHeight = useCallback(value => {
    if (mounted.current) {
      setInternalContentMinHeight(value);
    }
  }, []);
  const handleInternalProgressViewOffset = useCallback(value => {
    if (mounted.current) {
      setInternalProgressViewOffset(value);
    }
  }, []);
  useAnimatedReaction(() => {
    return contentMinHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      if (contentHeight.current < result && internalContentMinHeight !== result) {
        runOnJS(handleInternalContentHeight)(result);
      }
    }
  });
  useAnimatedReaction(() => {
    return fixedHeaderHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      runOnJS(handleInternalProgressViewOffset)(result);
    }
  });
  const contentContainerStyle = useMemo(() => {
    var _props$contentContain;
    return [styles.contentContainer, props.contentContainerStyle, {
      minHeight: internalContentMinHeight,
      paddingTop: stickyHeaderHeight.value + +(((_props$contentContain = props.contentContainerStyle) === null || _props$contentContain === void 0 ? void 0 : _props$contentContain.paddingTop) || 0)
    }];
  }, [props.contentContainerStyle, internalContentMinHeight, stickyHeaderHeight]);
  const handleContentSizeChange = useCallback((_, height) => {
    contentHeight.current = height;
  }, []);
  const handleScrollToIndexFailed = useCallback(() => {}, []);
  const topBarHeight = useDerivedValue(() => headerHeight.value - stickyHeaderHeight.value, [headerHeight, stickyHeaderHeight]);
  function renderListHeader() {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(AnimatedTopView, {
      height: topBarHeight
    }), props.ListHeaderComponent);
  }
  return /*#__PURE__*/React.createElement(AnimatedSectionList, _extends({
    ref: setRef,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1,
    onScrollToIndexFailed: handleScrollToIndexFailed
  }, props, {
    style: [styles.container, props.style],
    contentContainerStyle: contentContainerStyle,
    onScroll: scrollHandler,
    ListHeaderComponent: renderListHeader(),
    onContentSizeChange: handleContentSizeChange
    //@ts-ignore
    ,
    simultaneousHandlers: [],
    progressViewOffset: internalProgressViewOffset
  }));
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
//# sourceMappingURL=CollapsibleSectionList.js.map