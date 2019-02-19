import React, { useEffect } from 'react';
import { Actions, State, useActions, useStore } from "easy-peasy";
import { IStore } from "../../store";
import useYoutube from "../../hooks/useYoutube";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { get } from 'lodash';

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

  const [video] = useYoutube(videoId);

  const tasksButton = tasksState.items.map((item) => {
    return (
      <li key={item.url}>
        <Link to={`/play/${item.url}`}>{item.url}</Link>
      </li>
    );
  });


  return (
    <div>
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
