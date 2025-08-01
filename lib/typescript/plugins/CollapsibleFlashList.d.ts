import React from 'react';
import type { CollapsibleProps } from '../types';
import { FlashListProps } from '@shopify/flash-list';
type Props<Data> = FlashListProps<Data> & CollapsibleProps;
export default function CollapsibleFlashList<Data>({ headerSnappable, ...props }: Props<Data>): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleFlashList.d.ts.map