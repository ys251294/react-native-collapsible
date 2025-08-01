function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import useKeyboardShowEvent from '../hooks/useKeyboardShowEvent';
import useInternalCollapsibleContext from '../hooks/useInternalCollapsibleContext';
import useCollapsibleContext from '../hooks/useCollapsibleContext';
import CollapsibleHeaderConsumer from './header/CollapsibleHeaderConsumer';
export default function CollapsibleContainer(_ref) {
  let {
    children,
    KeyboardAvoidingViewComponent = KeyboardAvoidingView,
    keyboardAvoidingViewProps,
    textInputRefs = [],
    ...props
  } = _ref;
  const {
    containerHeight,
    containerRef
  } = useInternalCollapsibleContext();
  const {
    scrollY,
    scrollTo
  } = useCollapsibleContext();
  useKeyboardShowEvent(() => {
    textInputRefs.some(ref => {
      const isFocusedFunc = ref.current.isFocused;
      const isFocused = isFocusedFunc && typeof isFocusedFunc === 'function' ? isFocusedFunc() : isFocusedFunc;
      if (isFocused) {
        ref.current.measureLayout(
        // @ts-ignore
        containerRef.current, (_left, top, _width, height) => {
          if (top + height - scrollY.value > containerHeight.value) {
            const extraOffset = (keyboardAvoidingViewProps === null || keyboardAvoidingViewProps === void 0 ? void 0 : keyboardAvoidingViewProps.keyboardVerticalOffset) ?? 20;
            scrollTo(top + height + extraOffset - containerHeight.value);
          }
        }, () => {});
      }
      return isFocused;
    });
  });
  useLayoutEffect(() => {
    const {
      height
    } = containerRef.current.unstable_getBoundingClientRect();
    containerHeight.value = height;
  }, []);
  return /*#__PURE__*/React.createElement(KeyboardAvoidingViewComponent, _extends({
    style: styles.container,
    behavior: "padding"
  }, keyboardAvoidingViewProps), /*#__PURE__*/React.createElement(View, _extends({}, props, {
    ref: containerRef,
    style: [styles.container, props.style],
    collapsable: false
  }), /*#__PURE__*/React.createElement(CollapsibleHeaderConsumer, null, children)));
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=CollapsibleContainer.js.map