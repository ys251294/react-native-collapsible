"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleHeaderConsumerContext = void 0;
exports.default = useCollapsibleHeaderConsumerContext;
var _react = require("react");
const CollapsibleHeaderConsumerContext =
/*#__PURE__*/
// @ts-ignore
(0, _react.createContext)({});
exports.CollapsibleHeaderConsumerContext = CollapsibleHeaderConsumerContext;
function useCollapsibleHeaderConsumerContext() {
  const ctx = (0, _react.useContext)(CollapsibleHeaderConsumerContext);
  if (!ctx) {
    throw new Error('Component should be wrapped CollapsibleHeaderProvider');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleHeaderConsumerContext.js.map