"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleHeaderContext = void 0;
exports.default = useCollapsibleHeaderContext;
var _react = require("react");
const CollapsibleHeaderContext =
/*#__PURE__*/
// @ts-ignore
(0, _react.createContext)({});
exports.CollapsibleHeaderContext = CollapsibleHeaderContext;
function useCollapsibleHeaderContext() {
  const ctx = (0, _react.useContext)(CollapsibleHeaderContext);
  if (!ctx) {
    throw new Error('Component should be wrapped CollapsibleHeaderProvider');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleHeaderContext.js.map