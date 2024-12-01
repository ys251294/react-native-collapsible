import { useCallback, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';
export default function useSharedValueRef(defaultValue) {
  const sharedValue = useSharedValue(defaultValue);
  const savedValue = useRef(defaultValue);
  const appendValue = useCallback(value => {
    savedValue.current = {
      ...savedValue.current,
      ...value
    };
    sharedValue.value = savedValue.current;
  }, [sharedValue]);
  return [sharedValue, appendValue];
}
//# sourceMappingURL=useSharedValueRef.js.map