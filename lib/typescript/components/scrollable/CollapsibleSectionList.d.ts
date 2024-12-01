import React from 'react';
import { SectionListProps } from 'react-native';
import type { CollapsibleProps } from '../../types';
type Props<Data> = Omit<SectionListProps<Data>, 'scrollEnabled'> & CollapsibleProps;
export default function CollapsibleSectionList<Data>({ headerSnappable, ...props }: Props<Data>): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleSectionList.d.ts.map