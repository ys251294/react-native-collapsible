"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCollapsibleContext;
var _react = _interopRequireWildcard(require("react"));
var _useCollapsibleContext = require("./hooks/useCollapsibleContext");
var _useInternalCollapsibleContext = require("./hooks/useInternalCollapsibleContext");
var _reactNativeReanimated = require("react-native-reanimated");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react-hooks/exhaustive-deps */

function withCollapsibleContext(Component) {
  return props => {
    const collapsibleHandlers = (0, _react.useRef)();
    const headerHeight = (0, _reactNativeReanimated.useSharedValue)(0);
    const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
    const fixedHeaderHeight = (0, _reactNativeReanimated.useSharedValue)(0);
    const stickyHeaderHeight = (0, _reactNativeReanimated.useSharedValue)(0);
    const containerHeight = (0, _reactNativeReanimated.useSharedValue)(0);
    const scrollViewRef = (0, _react.useRef)(null);
    const scrollViewRefs = (0, _react.useRef)([]);
    const containerRef = (0, _react.useRef)(null);
    const headerContainerLayouts = (0, _react.useRef)({});
    const headerViewPositions = (0, _reactNativeReanimated.useSharedValue)({});
    const setCollapsibleHandlers = (0, _react.useCallback)(handlers => {
      collapsibleHandlers.current = handlers;
    }, []);
    const headerCollapsed = (0, _reactNativeReanimated.useDerivedValue)(() => {
      const maxY = fixedHeaderHeight.value - stickyHeaderHeight.value;
      return scrollY.value >= maxY;
    }, []);
    const contentMinHeight = (0, _reactNativeReanimated.useDerivedValue)(() => {
      return containerHeight.value + (fixedHeaderHeight.value - stickyHeaderHeight.value);
    }, []);
    const handleHeaderContainerLayout = (0, _react.useCallback)((key, layout, stickyHeight) => {
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
    const handleScrollToView = (0, _react.useCallback)((ref, animated) => {
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
    const context = (0, _react.useMemo)(() => {
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
    const internalContext = (0, _react.useMemo)(() => ({
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
    return /*#__PURE__*/_react.default.createElement(_useCollapsibleContext.CollapsibleContext.Provider, {
      value: context
    }, /*#__PURE__*/_react.default.createElement(_useInternalCollapsibleContext.InternalCollapsibleContext.Provider, {
      value: internalContext
    }, /*#__PURE__*/_react.default.createElement(Component, props)));
  };
}
//# sourceMappingURL=withCollapsibleContext.js.map