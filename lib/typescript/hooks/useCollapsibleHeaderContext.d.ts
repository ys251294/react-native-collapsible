/// <reference types="react" />
import { LayoutRectangle } from 'react-native';
import Animated from 'react-native-reanimated';
export type CollapsibleContextHeaderType = {
    handleStickyViewLayout: (key: string, layout?: LayoutRectangle) => void;
    animatedY: Animated.SharedValue<number>;
};
export declare const CollapsibleHeaderContext: import("react").Context<CollapsibleContextHeaderType>;
export default function useCollapsibleHeaderContext(): CollapsibleContextHeaderType;
//# sourceMappingURL=useCollapsibleHeaderContext.d.ts.map