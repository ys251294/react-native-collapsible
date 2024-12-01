import { SectionListScrollParams } from 'react-native';
import type { ScrollToIndexParams } from '../../types';
type Props = {
    headerSnappable: boolean;
    scrollTo: (yValue: number, animated?: boolean) => void;
    scrollToIndex: (params: ScrollToIndexParams) => void;
    scrollToLocation: (params: SectionListScrollParams) => void;
};
export default function useAnimatedScroll({ headerSnappable, scrollTo, scrollToIndex, scrollToLocation, }: Props): {
    scrollHandler: (event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void;
    collapse: (animated?: any) => void;
    expand: () => void;
};
export {};
//# sourceMappingURL=useAnimatedScroll.d.ts.map