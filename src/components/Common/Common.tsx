import React from "react";
import { Actions, useActions } from "easy-peasy";
import { IStore } from "../../store";
import Tasks from "../Tasks/Tasks";
import useMultiKeyPress from "../../hooks/use-multi-keypress";

export default function Common() {
  const {
    onTaskClear,
    toggleOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    toggleOpenListModal: a.app.toggleOpenListModal,
    onTaskClear: a.tasks.deleteAll,
  }));

  useMultiKeyPress(['shift+j', 'ctrl+k'], () => {
    toggleOpenListModal();
  });

  useMultiKeyPress(['shift+r'], () => {
    const x = confirm("Clear LocalStorage?");
    if (x) {
      onTaskClear(undefined);
    }
  });

  return (
    <div>
      <Tasks/>
    </div>
  );
}
