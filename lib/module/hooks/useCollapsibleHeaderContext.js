import { createContext, useContext } from 'react';
export const CollapsibleHeaderContext =
/*#__PURE__*/
// @ts-ignore
createContext({});
export default function useCollapsibleHeaderContext() {
  const ctx = useContext(CollapsibleHeaderContext);
  if (!ctx) {
    throw new Error('Component should be wrapped CollapsibleHeaderProvider');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleHeaderContext.js.map