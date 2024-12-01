"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleHeaderConsumer;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useCollapsibleHeaderConsumerContext = require("../../hooks/useCollapsibleHeaderConsumerContext");
var _useInternalCollapsibleContext = _interopRequireDefault(require("../../hooks/useInternalCollapsibleContext"));
var _reactNativeReanimated = require("react-native-reanimated");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function CollapsibleHeaderConsumer(_ref) {
  let {
    children
  } = _ref;
  const [headers, setHeaders] = (0, _react.useState)([]);
  const mounted = (0, _react.useRef)(false);
  const {
    fixedHeaderHeight,
    headerHeight
  } = (0, _useInternalCollapsibleContext.default)();
  (0, _react.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const mount = (0, _react.useCallback)((key, children) => {
    setHeaders(prev => [...prev, {
      key,
      children
    }]);
  }, []);
  const unmount = (0, _react.useCallback)(key => {
    setHeaders(prev => prev.filter(h => h.key !== key));
  }, []);
  const update = (0, _react.useCallback)((key, children) => {
    if (!mounted.current) {
      return;
    }
    setHeaders(prev => prev.map(item => {
      if (item.key === key) {
        return {
          ...item,
          children
        };
      }
      return item;
    }));
  }, []);
  const context = (0, _react.useMemo)(() => ({
    headers,
    mount,
    unmount,
    update
  }), [headers, mount, unmount, update]);
  const handleLayout = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    const {
      height
    } = layout;
    headerHeight.value = (0, _reactNativeReanimated.withTiming)(height, {
      duration: fixedHeaderHeight.value === 0 ? 0 : 10
    });
    fixedHeaderHeight.value = height;
  }, [headerHeight, fixedHeaderHeight]);
  return /*#__PURE__*/_react.default.createElement(_useCollapsibleHeaderConsumerContext.CollapsibleHeaderConsumerContext.Provider, {
    value: context
  }, children, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    pointerEvents: "box-none",
    onLayout: handleLayout
  }, headers.map(item => item.children)));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0.2
  }
});
//# sourceMappingURL=CollapsibleHeaderConsumer.js.map