import * as React from 'react';

// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from './useEventListener';

type Size = {
  width: number;
  height: number;
};

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, Size] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = React.useState<T | null>(null);
  const [size, setSize] = React.useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const handleSize = React.useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEventListener('resize', handleSize);

  React.useLayoutEffect(() => {
    handleSize();
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [setRef, size];
}

export default useElementSize;
