import React from 'react';
import { useActions, useStore, Actions, State } from 'easy-peasy';
import { IStore } from '../../store';
import useInterval from '../../hooks/useInterval';
import youtube from '../../hooks/youtube';

function Subtitles() {
  const items = useStore((state: State<IStore>) => state.subtitles.items);
  const add = useActions((state: Actions<IStore>) => state.subtitles.add);
  const [video, controls, state] = youtube("DyUU88FTmr8");

  const [video2] = youtube("D2qO5nMOM5U");

  useInterval(() => {
    add(String(new Date()));
    if (state === 1) {
      // controls!.pauseVideo();
    } else {
      // controls!.playVideo();
    }
    // console.log("state = ", state === 1);
    // console.log("controls = ", controls);

    // console.log("controls = ", controls.playVideo());
  }, 3000);

  return (
    <div>
      {video}
      {video2}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default Subtitles;
