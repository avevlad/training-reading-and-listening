import React, { useEffect } from 'react';
import { Actions, State, useActions, useStore } from "easy-peasy";
import { IStore } from "../../store";
import useYoutube from "../../hooks/useYoutube";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

interface PlayerProps {
  [key: string]: any;
}

/**
 * TODO: autoplay
 * @param props
 * @constructor
 */
function Player(props: PlayerProps) {
  const {
    setIsOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    setIsOpenListModal: a.app.setIsOpenListModal,
  }));
  const tasksState = useStore((s: State<IStore>) => s.tasks);
  const id = props.match.params.id;

  // useEffect(() => {
  //   if (!id) {
  //     console.log("useEffect id = ", id);
  //   }
  // }, []);

  if (!id) {
    return <Redirect to="/"/>;
  }

  const tasksButton = tasksState.items.map((item) => {
    return (
      <li key={item.url}>
        <Link to={`/play/${item.url}`}>{item.url}</Link>
      </li>
    );
  });

  const [video] = useYoutube(id);
  const [video2] = useYoutube('jAhjPd4uNFY');

  return (
    <div>
      {video}
      <hr/>
      <ul>
        {tasksButton}
      </ul>
      <hr/>
      {video2}
    </div>
  )
}

export default Player;
