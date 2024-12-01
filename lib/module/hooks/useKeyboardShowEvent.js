import { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
export default function useKeyboardShowEvent(callback) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidShow', () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
}
//# sourceMappingURL=useKeyboardShowEvent.js.map