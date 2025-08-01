/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useRef } from 'react';
import { CollapsibleContext } from './hooks/useCollapsibleContext';
import { InternalCollapsibleContext } from './hooks/useInternalCollapsibleContext';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
export default function withCollapsibleContext(Component) {
  return props => {
    const collapsibleHandlers = useRef();
    const headerHeight = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const fixedHeaderHeight = useSharedValue(0);
    const stickyHeaderHeight = useSharedValue(0);
    const containerHeight = useSharedValue(0);
    const scrollViewRef = useRef(null);
    const scrollViewRefs = useRef([]);
    const containerRef = useRef(null);
    const headerContainerLayouts = useRef({});
    const headerViewPositions = useSharedValue({});
    const setCollapsibleHandlers = useCallback(handlers => {
      collapsibleHandlers.current = handlers;
    }, []);
    const headerCollapsed = useDerivedValue(() => {
      const maxY = fixedHeaderHeight.value - stickyHeaderHeight.value;
      return scrollY.value >= maxY;
    }, []);
    const contentMinHeight = useDerivedValue(() => {
      return containerHeight.value + (fixedHeaderHeight.value - stickyHeaderHeight.value);
    }, []);
    const handleHeaderContainerLayout = useCallback((key, layout, stickyHeight) => {
      headerContainerLayouts.current[key] = layout ? {
        ...layout,
        stickyHeight
      } : undefined;
      const headerContainers = Object.keys(headerContainerLayouts.current).filter(k => !!headerContainerLayouts.current[k]);
      // Calculate header positions
      const sortedHeaders = headerContainers.sort((a, b) => {
        var _headerContainerLayou, _headerContainerLayou2;
        return (((_headerContainerLayou = headerContainerLayouts.current[a]) === null || _headerContainerLayou === void 0 ? void 0 : _headerContainerLayou.y) || 0) - (((_headerContainerLayou2 = headerContainerLayouts.current[b]) === null || _headerContainerLayou2 === void 0 ? void 0 : _headerContainerLayou2.y) || 0);
      });
      const values = {};
      let aStickyHeight = 0;
      for (let index = 0; index < sortedHeaders.length; index++) {
        var _headerContainerLayou3;
        const headerKey = sortedHeaders[index];
        const sHeight = ((_headerContainerLayou3 = headerContainerLayouts.current[headerKey]) === null || _headerContainerLayou3 === void 0 ? void 0 : _headerContainerLayou3.stickyHeight) ?? 0;
        values[headerKey] = {
          top: aStickyHeight,
          stickyHeight: sHeight
        };
        aStickyHeight += sHeight;
      }
      stickyHeaderHeight.value = stickyHeight ?? 0;
      headerViewPositions.value = values;
    }, []);
    const handleScrollToView = useCallback((ref, animated) => {
      if (!ref.current) {
        return;
      }
      ref.current.measureLayout(containerRef.current, (_left, top, _width, _height) => {
        var _collapsibleHandlers$;
        const headerContainers = Object.keys(headerContainerLayouts.current).filter(k => {
          const layout = headerContainerLayouts.current[k];
          if (layout) {
            return layout.y + layout.height < top;
          }
          return false;
        });
        const stickyHeightAbove = headerContainers.reduce((acc, key) => {
          const layout = headerContainerLayouts.current[key];
          acc += (layout === null || layout === void 0 ? void 0 : layout.stickyHeight) ?? 0;
          return acc;
        }, 0);
        (_collapsibleHandlers$ = collapsibleHandlers.current) === null || _collapsibleHandlers$ === void 0 ? void 0 : _collapsibleHandlers$.scrollTo(top - stickyHeightAbove, animated);
      }, () => {});
    }, []);
    const context = useMemo(() => {
      return {
        collapse: animated => {
          var _collapsibleHandlers$2;
          return (_collapsibleHandlers$2 = collapsibleHandlers.current) === null || _collapsibleHandlers$2 === void 0 ? void 0 : _collapsibleHandlers$2.collapse(animated);
        },
        expand: () => {
          var _collapsibleHandlers$3;
          return (_collapsibleHandlers$3 = collapsibleHandlers.current) === null || _collapsibleHandlers$3 === void 0 ? void 0 : _collapsibleHandlers$3.expand();
        },
        scrollTo: (offset, animate) => {
          var _collapsibleHandlers$4;
          return (_collapsibleHandlers$4 = collapsibleHandlers.current) === null || _collapsibleHandlers$4 === void 0 ? void 0 : _collapsibleHandlers$4.scrollTo(offset, animate);
        },
        scrollToIndex: params => {
          var _collapsibleHandlers$5;
          return (_collapsibleHandlers$5 = collapsibleHandlers.current) === null || _collapsibleHandlers$5 === void 0 ? void 0 : _collapsibleHandlers$5.scrollToIndex(params);
        },
        scrollToLocation: params => {
          var _collapsibleHandlers$6;
          return (_collapsibleHandlers$6 = collapsibleHandlers.current) === null || _collapsibleHandlers$6 === void 0 ? void 0 : _collapsibleHandlers$6.scrollToLocation(params);
        },
        headerHeight,
        stickyHeaderHeight,
        scrollY,
        headerCollapsed,
        scrollViewRefs,
        scrollToView: handleScrollToView
      };
    }, [scrollY, headerHeight, stickyHeaderHeight, headerCollapsed, handleScrollToView]);
    const internalContext = useMemo(() => ({
      containerRef,
      containerHeight,
      scrollViewRef,
      scrollViewRefs,
      handleHeaderContainerLayout,
      setCollapsibleHandlers,
      headerHeight,
      fixedHeaderHeight,
      contentMinHeight,
      headerViewPositions
    }), [setCollapsibleHandlers, handleHeaderContainerLayout, headerHeight, fixedHeaderHeight, contentMinHeight, headerViewPositions]);
    return /*#__PURE__*/React.createElement(CollapsibleContext.Provider, {
      value: context
    }, /*#__PURE__*/React.createElement(InternalCollapsibleContext.Provider, {
      value: internalContext
    }, /*#__PURE__*/React.createElement(Component, props)));
  };
}
//# sourceMappingURL=withCollapsibleContext.js.map