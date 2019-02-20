import React, { useEffect } from 'react';
import { Actions, State, useActions, useStore } from "easy-peasy";
import { IStore } from "../../store";
import useYoutube from "../../hooks/useYoutube";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { get } from 'lodash';
import { Button } from '@blueprintjs/core';

interface PlayerProps {
  [key: string]: any;
}

/**
 * TODO: autoplay
 * @param props
 * @constructor
 */
function Player(props: PlayerProps) {
  const id = props.match.params.id;
  const {
    onFetchSubtitlesFromTasksStore,
  } = useActions((a: Actions<IStore>) => ({
    setIsOpenListModal: a.app.setIsOpenListModal,
    onFetchSubtitlesFromTasksStore: a.player.fetchSubtitlesFromTasksStore,
  }));
  const currentTask = useStore((s: State<IStore>) => s.getTaskById(Number(id)), [id]);
  const tasksState = useStore((s: State<IStore>) => s.tasks, [id]);
  const playerState = useStore((s: State<IStore>) => s.player, [id]);

  useEffect(() => {
    if (tasksState.isFetching) {
      return;
    }
    onFetchSubtitlesFromTasksStore(id);
  }, [id, tasksState.isFetching]);

  if (!id) {
    return <Redirect to="/"/>;
  }

  const videoId = get(currentTask, 'url');

  const {video, player} = useYoutube(videoId, {
    playerVars: {
      controls: 1,
      start: 1,
      fs: 0,
      rel: 0,
      showinfo: 0,
      // @ts-ignore
      ecver: 0,
      disablekb: 1,
    },
    events: {
      onReady: ({target}) => {
        console.log("player || ", target);
        target.setVolume(10);
        // console.log("READY");
      }
    },
  });

  const tasksButton = tasksState.items.map((item) => {
    return (
      <li key={item.url}>
        <Link to={`/play/${item.id}`}>{item.url}</Link>
      </li>
    );
  });

  console.log("Player render");


  return (
    <div>
      <Button onClick={() => player!.setVolume(70)} text="set vol"/>
      <Button onClick={() => player!.playVideo()} text="play"/>
      <Button onClick={() => player!.pauseVideo()} text="pause"/>
      <hr/>
      {video}
      <hr/>
      <ul>
        {tasksButton}
      </ul>
    </div>
  )
}

export default Player;
