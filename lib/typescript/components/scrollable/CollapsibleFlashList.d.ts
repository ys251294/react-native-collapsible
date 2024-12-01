import React from 'react';
import { FlashListProps } from '@shopify/flash-list';
import type { CollapsibleProps } from '../../types';
type Props<Data> = Omit<FlashListProps<Data>, 'scrollEnabled'> & CollapsibleProps;
export default function CollapsibleFlatList<Data>({ headerSnappable, ...props }: Props<Data>): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleFlashList.d.ts.map