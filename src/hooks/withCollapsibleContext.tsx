/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useMemo, useRef } from 'react';
import type { CollapsibleHandles, LayoutParams } from '../types';
import { CollapsibleContext } from './useCollapsibleContext';
import { InternalCollapsibleContext } from './useInternalCollapsibleContext';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { View } from 'react-native';

export default function withCollapsibleContext<T>(Component: FC<T>) {
  return (props: T) => {
    const collapsibleHandlers = useRef<CollapsibleHandles>();
    const headerHeight = useSharedValue(0);
    const fixedHeaderHeight = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const stickyHeaderHeight = useSharedValue(0);
    const headerCollapsed = useSharedValue(false);
    const contentMinHeight = useSharedValue(0);
    const containerHeight = useSharedValue(0);
    const firstStickyViewY = useSharedValue(1000000);
    const headerContainersHeight = useRef<Record<string, number>>({});
    const stickyViewTops = useSharedValue<Record<string, number>>({});
    const StickyViewPositions = useRef<Record<string, LayoutParams>>({});
    const containerRef = useRef<View>(null);

    const setCollapsibleHandlers = useCallback((handlers) => {
      collapsibleHandlers.current = handlers;
    }, []);

    const populateData = useCallback(
      (viewPositions: any, headerHeight: number) => {
        const sortedKeys = Object.keys(viewPositions).sort(
          (a, b) => viewPositions[a].top - viewPositions[b].top
        );
        let totalTop = 0;
        const values: any = {};
        for (let i = 0; i < sortedKeys.length; i++) {
          values[sortedKeys[i]] = totalTop;
          // Try minus 1 make it filled when scrolling up.
          // Otherwise, we can see a small space between the persits views
          totalTop += viewPositions[sortedKeys[i]].height - 1;
        }
        stickyViewTops.value = values;
        firstStickyViewY.value = viewPositions[sortedKeys[0]]?.top || 0;
        const stickyHeader = sortedKeys.reduce((acc, key) => {
          const data = viewPositions[key];
          const isInsideHeader = data.top < headerHeight;
          if (isInsideHeader) {
            return acc + data.height;
          }
          return acc;
        }, 0);
        stickyHeaderHeight.value = stickyHeader;
      },
      []
    );

    const handleStickyViewLayout = useCallback(
      (viewKey: string, layout?: LayoutParams) => {
        if (!layout) {
          delete StickyViewPositions.current[viewKey];
        } else {
          StickyViewPositions.current = {
            ...StickyViewPositions.current,
            [viewKey]: layout,
          };
        }
        populateData(StickyViewPositions.current, fixedHeaderHeight.value);
      },
      [populateData, fixedHeaderHeight]
    );

    const handleHeaderContainerLayout = useCallback(
      (viewKey: string, height?: number) => {
        if (!height) {
          delete headerContainersHeight.current[viewKey];
        } else {
          headerContainersHeight.current[viewKey] = height;
        }
        const totalHeight = Object.keys(headerContainersHeight.current).reduce(
          (acc, key) => headerContainersHeight.current[key] + acc,
          0
        );
        headerHeight.value = withTiming(totalHeight, {
          duration:
            fixedHeaderHeight.value === 0 || headerCollapsed.value ? 0 : 200,
        });
        fixedHeaderHeight.value = totalHeight;
        populateData(StickyViewPositions.current, totalHeight);
      },
      [populateData, fixedHeaderHeight, headerCollapsed]
    );

    const context = useMemo(() => {
      return {
        collapse: () => collapsibleHandlers.current?.collapse(),
        expand: () => collapsibleHandlers.current?.expand(),
        scrollTo: (offset: number, animate?: boolean) =>
          collapsibleHandlers.current?.scrollTo(offset, animate),
        headerHeight,
        scrollY,
        headerCollapsed,
      };
    }, [scrollY, headerHeight, headerCollapsed]);

    const internalContext = useMemo(
      () => ({
        containerRef,
        handleStickyViewLayout,
        handleHeaderContainerLayout,
        setCollapsibleHandlers,
        containerHeight,
        firstStickyViewY,
        stickyViewTops,
        fixedHeaderHeight,
        stickyHeaderHeight,
        contentMinHeight,
      }),
      [
        setCollapsibleHandlers,
        handleStickyViewLayout,
        handleHeaderContainerLayout,
        containerHeight,
        firstStickyViewY,
        stickyViewTops,
        fixedHeaderHeight,
        stickyHeaderHeight,
        contentMinHeight,
      ]
    );

    return (
      <CollapsibleContext.Provider value={context}>
        <InternalCollapsibleContext.Provider value={internalContext}>
          <Component {...props} />
        </InternalCollapsibleContext.Provider>
      </CollapsibleContext.Provider>
    );
  };
}
