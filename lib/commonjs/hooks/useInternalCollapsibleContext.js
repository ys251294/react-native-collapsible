"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalCollapsibleContext = void 0;
exports.default = useInternalCollapsibleContext;
var _react = require("react");
const InternalCollapsibleContext =
/*#__PURE__*/
// @ts-ignore
(0, _react.createContext)();
exports.InternalCollapsibleContext = InternalCollapsibleContext;
function useInternalCollapsibleContext() {
  const ctx = (0, _react.useContext)(InternalCollapsibleContext);
  if (!ctx) {
    throw new Error('Component should be wrapped with withCollapsibleContext');
  }
  return ctx;
}
//# sourceMappingURL=useInternalCollapsibleContext.js.map