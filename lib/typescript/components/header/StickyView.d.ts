import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    style?: StyleProp<ViewStyle>;
    children: Element;
    stickyRef?: React.MutableRefObject<any>;
};
export default function StickyView({ children, style, stickyRef }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=StickyView.d.ts.map