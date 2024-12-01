import React from 'react';
import { FlatListProps } from 'react-native';
import type { CollapsibleProps } from '../../types';
type Props<Data> = Omit<FlatListProps<Data>, 'scrollEnabled'> & CollapsibleProps;
export default function CollapsibleFlatList<Data>({ headerSnappable, ...props }: Props<Data>): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleFlatList.d.ts.map