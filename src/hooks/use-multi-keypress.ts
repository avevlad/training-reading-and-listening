import Mousetrap from "mousetrap";
import { useEffect } from "react";

/**
 * https://codesandbox.io/s/y3qzyr3lrz
 * @param targetKeys
 * @param callback
 */
export default function useMultiKeyPress(
  targetKeys: string[],
  callback: (e: ExtendedKeyboardEvent, combo: string) => any,
) {
  useEffect(() => {
    const mt = new Mousetrap(document.body);

    mt.bind(targetKeys, callback);

    return () => {
      mt.unbind(targetKeys);
    };
  }, [targetKeys]);
}
