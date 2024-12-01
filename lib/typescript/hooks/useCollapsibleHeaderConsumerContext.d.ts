import { ReactNode } from 'react';
export type HeaderItem = {
    key: string;
    children: ReactNode;
};
type CollapsibleContextHeaderConsumerType = {
    headers: HeaderItem[];
    mount: (key: string, header: ReactNode) => void;
    update: (key: string, header: ReactNode) => void;
    unmount: (key: string) => void;
};
export declare const CollapsibleHeaderConsumerContext: import("react").Context<CollapsibleContextHeaderConsumerType>;
export default function useCollapsibleHeaderConsumerContext(): CollapsibleContextHeaderConsumerType;
export {};
//# sourceMappingURL=useCollapsibleHeaderConsumerContext.d.ts.map