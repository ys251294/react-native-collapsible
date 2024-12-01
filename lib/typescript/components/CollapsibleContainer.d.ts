import React from 'react';
import { KeyboardAvoidingViewProps, ViewProps } from 'react-native';
type Props = Omit<ViewProps, 'ref' | 'onLayout'> & {
    children: Element;
    keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
    textInputRefs?: any[];
};
export default function CollapsibleContainer({ children, keyboardAvoidingViewProps, textInputRefs, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleContainer.d.ts.map