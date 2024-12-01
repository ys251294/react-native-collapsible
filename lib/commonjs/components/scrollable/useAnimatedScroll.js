"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAnimatedScroll;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _useCollapsibleContext = _interopRequireDefault(require("../../hooks/useCollapsibleContext"));
var _useInternalCollapsibleContext = _interopRequireDefault(require("../../hooks/useInternalCollapsibleContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable react-hooks/exhaustive-deps */

const {
  height: wHeight
} = _reactNative.Dimensions.get('window');
function useAnimatedScroll(_ref) {
  let {
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  } = _ref;
  const scrollDirection = (0, _reactNativeReanimated.useSharedValue)('unknown');
  const {
    scrollY
  } = (0, _useCollapsibleContext.default)();
  const {
    setCollapsibleHandlers,
    fixedHeaderHeight
  } = (0, _useInternalCollapsibleContext.default)();
  (0, _react.useEffect)(() => {
    if (scrollY.value > 0) {
      requestAnimationFrame(() => scrollTo(scrollY.value, false));
    }
  }, []);
  const collapse = (0, _react.useCallback)(function () {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    scrollTo(fixedHeaderHeight.value, animated);
  }, [scrollTo]);
  const expand = (0, _react.useCallback)(() => scrollTo(0), [scrollTo]);
  (0, _react.useEffect)(() => {
    setCollapsibleHandlers({
      collapse,
      expand,
      scrollTo,
      scrollToIndex,
      scrollToLocation
    });
  }, [setCollapsibleHandlers, collapse, expand, scrollTo, scrollToIndex, scrollToLocation]);
  const scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
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
          (0, _reactNativeReanimated.runOnJS)(scrollTo)(yValue);
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