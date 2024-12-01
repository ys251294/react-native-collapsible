import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CollapsibleHeaderConsumerContext } from '../../hooks/useCollapsibleHeaderConsumerContext';
import useInternalCollapsibleContext from '../../hooks/useInternalCollapsibleContext';
import { withTiming } from 'react-native-reanimated';
export default function CollapsibleHeaderConsumer(_ref) {
  let {
    children
  } = _ref;
  const [headers, setHeaders] = useState([]);
  const mounted = useRef(false);
  const {
    fixedHeaderHeight,
    headerHeight
  } = useInternalCollapsibleContext();
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const mount = useCallback((key, children) => {
    setHeaders(prev => [...prev, {
      key,
      children
    }]);
  }, []);
  const unmount = useCallback(key => {
    setHeaders(prev => prev.filter(h => h.key !== key));
  }, []);
  const update = useCallback((key, children) => {
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
  const context = useMemo(() => ({
    headers,
    mount,
    unmount,
    update
  }), [headers, mount, unmount, update]);
  const handleLayout = useCallback(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    const {
      height
    } = layout;
    headerHeight.value = withTiming(height, {
      duration: fixedHeaderHeight.value === 0 ? 0 : 10
    });
    fixedHeaderHeight.value = height;
  }, [headerHeight, fixedHeaderHeight]);
  return /*#__PURE__*/React.createElement(CollapsibleHeaderConsumerContext.Provider, {
    value: context
  }, children, /*#__PURE__*/React.createElement(View, {
    style: styles.container,
    pointerEvents: "box-none",
    onLayout: handleLayout
  }, headers.map(item => item.children)));
}
const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0.2
  }
});
//# sourceMappingURL=CollapsibleHeaderConsumer.js.map