import React from "react";
import { Actions, useActions, useStore, State } from "easy-peasy";
import { IStore } from "../../store";
import Tasks from "../Tasks/Tasks";
import useMultiKeyPress from "../../hooks/useMultiKeyPress";
import { KeyboardShortcutsDialog } from "../KeyboardShortcuts/KeyboardShortcutsDialog";
import { useTheme } from "../../themes/context";

export default function Common() {
  const {
    onTaskClear,
    toggleOpenListModal,
    keyboardShortcutsActions,
  } = useActions((a: Actions<IStore>) => ({
    keyboardShortcutsActions: a.app.keyboardShortcuts,
    toggleOpenListModal: a.app.toggleOpenListModal,
    onTaskClear: a.tasks.deleteAll,
  }));

  const theme = useTheme();

  const isOpenKeyboardShortcutsDialog = useStore((s: State<IStore>) => s.app.keyboardShortcuts.isOpen);

  useMultiKeyPress(['shift+d'], () => {
    theme.toggle();
  });

  useMultiKeyPress(['shift+j', 'ctrl+k'], () => {
    toggleOpenListModal();
  });

  useMultiKeyPress(['command+/', 'ctrl+/'], () => {
    keyboardShortcutsActions.toggle();
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
      <KeyboardShortcutsDialog
        isOpen={isOpenKeyboardShortcutsDialog}
        setIsOpen={keyboardShortcutsActions.set}
      />
    </div>
  );
}
