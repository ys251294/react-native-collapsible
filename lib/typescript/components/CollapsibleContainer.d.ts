import React from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, ViewProps } from 'react-native';
type Props = Omit<ViewProps, 'ref' | 'onLayout'> & {
    children: Element;
    KeyboardAvoidingViewComponent?: typeof KeyboardAvoidingView;
    keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
    textInputRefs?: any[];
};
export default function CollapsibleContainer({ children, KeyboardAvoidingViewComponent, keyboardAvoidingViewProps, textInputRefs, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=CollapsibleContainer.d.ts.map