import { createContext, useContext } from 'react';
export const InternalCollapsibleContext =
/*#__PURE__*/
// @ts-ignore
createContext();
export default function useInternalCollapsibleContext() {
  const ctx = useContext(InternalCollapsibleContext);
  if (!ctx) {
    throw new Error('Component should be wrapped with withCollapsibleContext');
  }
  return ctx;
}
//# sourceMappingURL=useInternalCollapsibleContext.js.map