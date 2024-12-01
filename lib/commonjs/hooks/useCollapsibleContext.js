"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleContext = void 0;
exports.default = useCollapsibleContext;
var _react = require("react");
// @ts-ignore
const CollapsibleContext = /*#__PURE__*/(0, _react.createContext)({});
exports.CollapsibleContext = CollapsibleContext;
function useCollapsibleContext() {
  const ctx = (0, _react.useContext)(CollapsibleContext);
  if (!ctx) {
    throw new Error('Component should be wrapped with withCollapsibleContext');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleContext.js.map