import { useCallback, useEffect, useRef } from 'react';

export default function useMount() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  return isMounted;
}
