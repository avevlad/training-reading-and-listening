import React from 'react';
import { useActions, useStore, Actions, State } from 'easy-peasy';
import { IStore } from '../../store';
import useInterval from '../../hooks/useInterval';

function Subtitles() {
  const items = useStore((state: State<IStore>) => state.subtitles.items);
  const add = useActions((state: Actions<IStore>) => state.subtitles.add);

  useInterval(()=> {
    add(String(new Date()));
  }, 1000);

  return (
    <div><pre>{JSON.stringify(items, null, 2)}</pre></div>
  )
}

export default Subtitles;
