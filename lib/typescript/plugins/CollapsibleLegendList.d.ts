import React from 'react';
import { FlatListProps } from 'react-native';
import type { CollapsibleProps } from '../types';
type Props<Data> = FlatListProps<Data> & CollapsibleProps;
export default function CollapsibleLegendList<Data>({ headerSnappable, ...props }: Props<Data>): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleLegendList.d.ts.map