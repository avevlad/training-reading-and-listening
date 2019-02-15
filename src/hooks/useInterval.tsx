import React, { useState, useEffect, useRef } from 'react';

type CallbackFunction = () => void;

export default function useInterval(callback: CallbackFunction, delay: any) {
  const savedCallback = useRef<CallbackFunction>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
