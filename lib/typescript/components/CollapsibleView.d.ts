import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
export type CollapsibleHeaderProps = {
    onToggle: () => void;
    collapsed: Animated.SharedValue<number>;
};
type Props = {
    initialState?: 'collapsed' | 'expanded';
    collapseState?: Animated.SharedValue<number>;
    renderHeader: (props: CollapsibleHeaderProps) => ReactNode;
    children: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    collapsedBackgroundColor?: string;
    expandedBackgroundColor?: string;
    useDynamicLayout?: boolean;
    onToggle?: (isExpand: boolean) => void;
};
export default function CollapsibleView({ initialState, collapseState, renderHeader, children, containerStyle, collapsedBackgroundColor, expandedBackgroundColor, onToggle, }: Props): React.JSX.Element;
export declare function CollapsibleHeaderText({ title, collapsed, onToggle, style, titleStyle, icon, iconInitialAngle, children, }: {
    title: string | ReactNode;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    icon?: ReactNode;
    iconInitialAngle?: number;
    children?: ReactNode;
} & CollapsibleHeaderProps): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleView.d.ts.map