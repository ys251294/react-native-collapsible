import React, { ReactNode } from 'react';
import { ScrollViewProps } from 'react-native';
import type { CollapsibleProps } from '../../types';
type Props = ScrollViewProps & CollapsibleProps & {
    children?: ReactNode;
    refreshing?: boolean;
    onRefresh?: () => void;
};
export default function CollapsibleScrollView({ headerSnappable, children, refreshing, onRefresh, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleScrollView.d.ts.map