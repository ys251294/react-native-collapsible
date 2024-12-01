"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleHeaderContainer;
var _react = _interopRequireWildcard(require("react"));
var _useCollapsibleHeaderConsumerContext = _interopRequireDefault(require("../../hooks/useCollapsibleHeaderConsumerContext"));
var _CollapsibleHeaderContainerProvider = _interopRequireDefault(require("./CollapsibleHeaderContainerProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let key = 0;
function CollapsibleHeaderContainer(_ref) {
  let {
    children,
    containerStyle
  } = _ref;
  const originalKey = (0, _react.useMemo)(() => key++, []);
  const contentKey = (0, _react.useMemo)(() => `collapsible-header-${originalKey}`, [originalKey]);
  const {
    mount,
    unmount,
    update
  } = (0, _useCollapsibleHeaderConsumerContext.default)();
  const internalStyle = (0, _react.useMemo)(() => {
    return {
      zIndex: 100000 - key - originalKey
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, originalKey]);
  const content = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(_CollapsibleHeaderContainerProvider.default, {
      containerStyle: [internalStyle, containerStyle],
      contentKey: contentKey,
      key: contentKey
    }, children);
  }, [children, containerStyle, contentKey, internalStyle]);
  (0, _react.useEffect)(() => {
    mount(contentKey, content);
    return () => {
      unmount(contentKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);
  (0, _react.useEffect)(() => {
    update(contentKey, content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  return null;
}
//# sourceMappingURL=CollapsibleHeaderContainer.js.map