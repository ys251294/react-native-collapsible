import React, { useEffect, useMemo } from 'react';
import useCollapsibleHeaderConsumerContext from '../../hooks/useCollapsibleHeaderConsumerContext';
import CollapsibleHeaderContainerProvider from './CollapsibleHeaderContainerProvider';
let key = 0;
export default function CollapsibleHeaderContainer(_ref) {
  let {
    children,
    containerStyle
  } = _ref;
  const originalKey = useMemo(() => key++, []);
  const contentKey = useMemo(() => `collapsible-header-${originalKey}`, [originalKey]);
  const {
    mount,
    unmount,
    update
  } = useCollapsibleHeaderConsumerContext();
  const internalStyle = useMemo(() => {
    return {
      zIndex: 100000 - key - originalKey
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, originalKey]);
  const content = useMemo(() => {
    return /*#__PURE__*/React.createElement(CollapsibleHeaderContainerProvider, {
      containerStyle: [internalStyle, containerStyle],
      contentKey: contentKey,
      key: contentKey
    }, children);
  }, [children, containerStyle, contentKey, internalStyle]);
  useEffect(() => {
    mount(contentKey, content);
    return () => {
      unmount(contentKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);
  useEffect(() => {
    update(contentKey, content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  return null;
}
//# sourceMappingURL=CollapsibleHeaderContainer.js.map