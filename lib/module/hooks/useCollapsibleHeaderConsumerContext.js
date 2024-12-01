import { createContext, useContext } from 'react';
export const CollapsibleHeaderConsumerContext =
/*#__PURE__*/
// @ts-ignore
createContext({});
export default function useCollapsibleHeaderConsumerContext() {
  const ctx = useContext(CollapsibleHeaderConsumerContext);
  if (!ctx) {
    throw new Error('Component should be wrapped CollapsibleHeaderProvider');
  }
  return ctx;
}
//# sourceMappingURL=useCollapsibleHeaderConsumerContext.js.map