"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleFlashList;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useAnimatedScroll = _interopRequireDefault(require("../components/scrollable/useAnimatedScroll"));
var _useInternalCollapsibleContext = _interopRequireDefault(require("../hooks/useInternalCollapsibleContext"));
var _AnimatedTopView = _interopRequireDefault(require("../components/header/AnimatedTopView"));
var _useCollapsibleContext = _interopRequireDefault(require("../hooks/useCollapsibleContext"));
var _flashList = require("@shopify/flash-list");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable react-hooks/exhaustive-deps */
const AnimatedFlashList = _reactNativeReanimated.default.createAnimatedComponent(_flashList.FlashList);
function CollapsibleFlashList(_ref) {
  let {
    headerSnappable = true,
    ...props
  } = _ref;
  const {
    headerHeight
  } = (0, _useCollapsibleContext.default)();
  const {
    scrollViewRef,
    fixedHeaderHeight
  } = (0, _useInternalCollapsibleContext.default)();
  const mounted = (0, _react.useRef)(true);
  const [internalProgressViewOffset, setInternalProgressViewOffset] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const scrollTo = (0, _react.useCallback)(function (yValue) {
    var _scrollViewRef$curren;
    let animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollToOffset({
      offset: yValue,
      animated
    });
  }, []);
  const scrollToIndex = (0, _react.useCallback)(params => {
    var _scrollViewRef$curren2;
    (_scrollViewRef$curren2 = scrollViewRef.current) === null || _scrollViewRef$curren2 === void 0 ? void 0 : _scrollViewRef$curren2.scrollToIndex(params);
  }, []);
  const scrollToLocation = (0, _react.useCallback)(() => {
    console.warn('CollapsibleFlatList does not support scrollToLocation');
  }, []);
  const {
    scrollHandler
  } = (0, _useAnimatedScroll.default)({
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  });
  const handleInternalProgressViewOffset = (0, _react.useCallback)(value => {
    if (mounted.current) {
      setInternalProgressViewOffset(value);
    }
  }, []);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return fixedHeaderHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      (0, _reactNativeReanimated.runOnJS)(handleInternalProgressViewOffset)(result);
    }
  });
  const handleScrollToIndexFailed = (0, _react.useCallback)(() => {}, []);
  function renderListHeader() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_AnimatedTopView.default, {
      height: headerHeight
    }), props.ListHeaderComponent);
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, props.style]
  }, /*#__PURE__*/_react.default.createElement(AnimatedFlashList, _extends({
    ref: scrollViewRef,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1,
    onScrollToIndexFailed: handleScrollToIndexFailed
  }, props, {
    // @ts-ignore
    onScroll: scrollHandler,
    ListHeaderComponent: renderListHeader()
    //@ts-ignore
    ,
    simultaneousHandlers: [],
    progressViewOffset: internalProgressViewOffset
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject
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