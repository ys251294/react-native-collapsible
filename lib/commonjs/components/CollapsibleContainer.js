"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleContainer;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useKeyboardShowEvent = _interopRequireDefault(require("../hooks/useKeyboardShowEvent"));
var _useInternalCollapsibleContext = _interopRequireDefault(require("../hooks/useInternalCollapsibleContext"));
var _useCollapsibleContext = _interopRequireDefault(require("../hooks/useCollapsibleContext"));
var _CollapsibleHeaderConsumer = _interopRequireDefault(require("./header/CollapsibleHeaderConsumer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable react-hooks/exhaustive-deps */
function CollapsibleContainer(_ref) {
  let {
    children,
    keyboardAvoidingViewProps,
    textInputRefs = [],
    ...props
  } = _ref;
  const {
    handleContainerHeight,
    containerRef
  } = (0, _useInternalCollapsibleContext.default)();
  const {
    scrollY,
    scrollTo
  } = (0, _useCollapsibleContext.default)();
  const containerHeight = (0, _react.useRef)(0);
  (0, _useKeyboardShowEvent.default)(() => {
    textInputRefs.some(ref => {
      const isFocusedFunc = ref.current.isFocused;
      const isFocused = isFocusedFunc && typeof isFocusedFunc === 'function' ? isFocusedFunc() : isFocusedFunc;
      if (isFocused) {
        ref.current.measureLayout(
        // @ts-ignore
        containerRef.current, (_left, top, _width, height) => {
          if (top + height - scrollY.value > containerHeight.current) {
            const extraOffset = (keyboardAvoidingViewProps === null || keyboardAvoidingViewProps === void 0 ? void 0 : keyboardAvoidingViewProps.keyboardVerticalOffset) ?? 20;
            scrollTo(top + height + extraOffset - containerHeight.current);
          }
        }, () => {});
      }
      return isFocused;
    });
  });
  const handleContainerLayout = (0, _react.useCallback)(layout => {
    const height = layout.nativeEvent.layout.height;
    containerHeight.current = height;
    handleContainerHeight(height);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, _extends({
    style: styles.container,
    behavior: "padding"
  }, keyboardAvoidingViewProps), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, props, {
    ref: containerRef,
    style: [styles.container, props.style],
    onLayout: handleContainerLayout,
    collapsable: false
  }), /*#__PURE__*/_react.default.createElement(_CollapsibleHeaderConsumer.default, null, children)));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=CollapsibleContainer.js.map