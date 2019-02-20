import React from "react";
import { Actions, useActions } from "easy-peasy";
import { IStore } from "../../store";
import Tasks from "../Tasks/Tasks";
import useMultiKeyPressCallback from "../../hooks/useMultiKeyPressCallback";

export default function Common() {
  const {
    toggleOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    toggleOpenListModal: a.app.toggleOpenListModal,
  }));

  useMultiKeyPressCallback(['Shift', 'J'], () => {
    toggleOpenListModal();
  });

  return (
    <Tasks/>
  );
}
