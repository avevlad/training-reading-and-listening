import { useCallback, useEffect, useRef } from 'react'

export default function useMultiKeyPressCallback(
  targetKeys: string[],
  callback: () => void,
  preventDefault = true,
) {
  const pressedKeysRef = useRef(new Set<string>([]));
  const params = useRef({
    targetKeys: [] as string[],
    callback: (() => undefined) as () => void,
    preventDefault: true,
  });

  useEffect(
    () => {
      params.current = { targetKeys, callback, preventDefault }
    },
    [...targetKeys, callback, preventDefault],
  );

  const downHandler = useCallback((e: KeyboardEvent) => {
    pressedKeysRef.current.add(e.key);
    const hasPressedCombo = areKeysPressed(
      params.current.targetKeys,
      Array.from(pressedKeysRef.current),
    );

    if (hasPressedCombo && params.current.preventDefault) {
      e.preventDefault();
      params.current.callback()
    }
  }, []);

  const upHandler = useCallback((e: KeyboardEvent) => {
    pressedKeysRef.current.delete(e.key)
  }, []);

  useEffect(
    () => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      }
    },
    [downHandler, upHandler],
  )
}

function areKeysPressed(keys: string[] = [], pressedKeys: string[] = []) {
  if (keys.length !== pressedKeys.length) {
    return false;
  }

  const keysToCheck = new Set(keys);
  pressedKeys.forEach(key => {
    keysToCheck.delete(key)
  });

  return keysToCheck.size === 0
}
