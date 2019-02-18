import React from 'react';
import Player from "../Player/Player";
import { Tasks } from "../Tasks/Tasks";

function Main() {
  return (
    <div>
      {/*<Button text={"open"} onClick={() => setIsOpen(true)}/>*/}
      {/*<Button text={"close"} onClick={() => setIsOpen(false)}/>*/}
      <hr/>
      <Player/>
      <Tasks/>
    </div>
  )
}

export default Main;
