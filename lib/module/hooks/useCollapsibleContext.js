import { createContext, useContext } from 'react';
// @ts-ignore
export const CollapsibleContext = /*#__PURE__*/createContext({});
export default function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error('Component should be wrapped with withCollapsibleContext');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleContext.js.map