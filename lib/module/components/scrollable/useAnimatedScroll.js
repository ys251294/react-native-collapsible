/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import useCollapsibleContext from '../../hooks/useCollapsibleContext';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
const {
  height: wHeight
} = Dimensions.get('window');
export default function useAnimatedScroll(_ref) {
  let {
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  } = _ref;
  const scrollDirection = useSharedValue('unknown');
  const {
    scrollY
  } = useCollapsibleContext();
  const {
    setCollapsibleHandlers,
    fixedHeaderHeight
  } = useInternalCollapsibleContext();
  useEffect(() => {
    if (scrollY.value > 0) {
      requestAnimationFrame(() => scrollTo(scrollY.value, false));
    }
  }, []);
  const collapse = useCallback(function () {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    scrollTo(fixedHeaderHeight.value, animated);
  }, [scrollTo]);
  const expand = useCallback(() => scrollTo(0), [scrollTo]);
  useEffect(() => {
    setCollapsibleHandlers({
      collapse,
      expand,
      scrollTo,
      scrollToIndex,
      scrollToLocation
    });
  }, [setCollapsibleHandlers, collapse, expand, scrollTo, scrollToIndex, scrollToLocation]);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const offset = event.contentOffset.y;
      const diff = scrollY.value - offset;
      scrollDirection.value = diff > 0 ? 'down' : diff < 0 ? 'up' : 'unknown';
      scrollY.value = offset;
    },
    onEndDrag: () => {
      if (!headerSnappable) return;
      const maxY = fixedHeaderHeight.value;
      if (scrollY.value < maxY) {
        const delta = Math.abs(scrollY.value - maxY);
        if (delta < wHeight / 2) {
          let yValue = 0;
          if (scrollDirection.value === 'up') {
            yValue = maxY;
          }
          runOnJS(scrollTo)(yValue);
        }
      }
    }
  }, [scrollTo]);
  return {
    scrollHandler,
    collapse,
    expand
  };
}
//# sourceMappingURL=useAnimatedScroll.js.map