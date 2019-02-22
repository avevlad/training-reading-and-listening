import React from "react";
import { Actions, useActions } from "easy-peasy";
import { IStore } from "../../store";
import Tasks from "../Tasks/Tasks";
import useMultiKeyPressCallback from "../../hooks/useMultiKeyPressCallback";

export default function Common() {
  const {
    onTaskClear,
    toggleOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    toggleOpenListModal: a.app.toggleOpenListModal,
    onTaskClear: a.tasks.deleteAll,
  }));

  useMultiKeyPressCallback(['Shift', 'J'], () => {
    toggleOpenListModal();
  });
  useMultiKeyPressCallback(['Shift', 'R'], () => {
    const x = confirm("Clear LocalStorage?")
    if (x) {
      onTaskClear(undefined);
    }
  });

  return (
    <Tasks/>
  );
}
