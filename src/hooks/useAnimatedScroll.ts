/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useCollapsibleContext } from './useCollapsibleContext';
import { useInternalCollapsibleContext } from './useInternalCollapsibleContext';

const { height: wHeight } = Dimensions.get('window');

type Props = {
  persistHeaderHeight: number;
  scrollTo: (yValue: number, animated?: boolean) => void;
};

export default function useAnimatedScroll({
  persistHeaderHeight,
  scrollTo,
}: Props) {
  const scrollDirection = useSharedValue('unknown');
  const {
    scrollY,
    headerHeight,
    persistHeaderHeight: animatedPersistHeaderHeight,
    headerCollapsed,
  } = useCollapsibleContext();
  const { setCollapsibleHandlers } = useInternalCollapsibleContext();

  useEffect(() => {
    if (scrollY.value > 0) {
      scrollTo(scrollY.value, false);
    }
  }, []);

  useEffect(() => {
    setCollapsibleHandlers({
      collapse,
      expand,
    });
  }, [setCollapsibleHandlers, scrollTo, headerHeight, persistHeaderHeight]);

  useEffect(() => {
    animatedPersistHeaderHeight.value = persistHeaderHeight;
  }, [persistHeaderHeight]);

  const collapse = useCallback(
    () => scrollTo(headerHeight.value - persistHeaderHeight),
    [scrollTo]
  );

  const expand = useCallback(() => scrollTo(0), [scrollTo]);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        const offset = event.contentOffset.y;
        const diff = scrollY.value - offset;
        scrollDirection.value = diff > 0 ? 'down' : diff < 0 ? 'up' : 'unknown';
        scrollY.value = offset;
        const maxY = headerHeight.value - persistHeaderHeight;
        const isCollapsed = offset >= maxY;
        if (headerCollapsed) {
          headerCollapsed.value = isCollapsed;
        }
      },
      onEndDrag: () => {
        const maxY = headerHeight.value - persistHeaderHeight;
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
      },
    },
    [scrollTo, persistHeaderHeight]
  );

  return {
    scrollHandler,
    collapse,
    expand,
  };
}
