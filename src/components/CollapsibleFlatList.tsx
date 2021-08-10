import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatListProps, FlatList, View, StyleSheet } from 'react-native';
import Animated, { runOnJS, useDerivedValue } from 'react-native-reanimated';
import AnimatedTopView from './AnimatedTopView';
import useAnimatedScroll from '../hooks/useAnimatedScroll';
import useCollapsibleContext from '../hooks/useCollapsibleContext';
import { useInternalCollapsibleContext } from '../hooks/useInternalCollapsibleContext';
import type { CollapsibleProps } from '../types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props<Data> = Omit<FlatListProps<Data>, 'scrollEnabled'> &
  CollapsibleProps;

export default function CollapsibleFlatList<Data>({
  headerSnappable = true,
  ...props
}: Props<Data>) {
  const scrollView = useRef<FlatList>(null);
  const { headerHeight } = useCollapsibleContext();
  const { contentMinHeight } = useInternalCollapsibleContext();
  const [internalContentMinHeight, setInternalContentMinHeight] = useState(
    contentMinHeight.value
  );
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const scrollTo = useCallback((yValue: number, animated = true) => {
    scrollView.current?.scrollToOffset({
      offset: yValue,
      animated,
    });
  }, []);

  const handleInternalContentHeight = useCallback((value: number) => {
    if (mounted.current) {
      setInternalContentMinHeight(value);
    }
  }, []);

  const { scrollHandler } = useAnimatedScroll({
    headerSnappable,
    scrollTo,
  });

  useDerivedValue(() => {
    if (contentMinHeight.value !== internalContentMinHeight) {
      runOnJS(handleInternalContentHeight)(contentMinHeight.value);
    }
  }, [internalContentMinHeight]);

  const contentContainerStyle = useMemo(
    () => [
      styles.contentContainer,
      { minHeight: internalContentMinHeight },
      props.contentContainerStyle,
    ],
    [props.contentContainerStyle, internalContentMinHeight]
  );

  const renderListHeader = () => (
    <View>
      <AnimatedTopView height={headerHeight} />
      {props.ListHeaderComponent}
    </View>
  );

  return (
    // @ts-ignore
    <AnimatedFlatList
      ref={scrollView}
      bounces={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      {...props}
      style={[styles.container, props.style]}
      contentContainerStyle={contentContainerStyle}
      onScroll={scrollHandler}
      ListHeaderComponent={renderListHeader()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flexGrow: 1,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
