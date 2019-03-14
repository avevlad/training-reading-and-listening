import React from 'react';
import { Classes, Dialog } from "@blueprintjs/core";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

interface Props {
  isOpen: boolean,
  setIsOpen: Function,
}

export function KeyboardShortcutsDialog(props: Props) {
  return (
    <Dialog
      style={{width: '70%', maxWidth: 600}}
      icon="info-sign"
      title="Keyboard Shortcuts"
      isOpen={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      usePortal={true}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
    >
      <div className="bp3-dialog-body">
          <KeyboardShortcuts/>
      </div>
    </Dialog>
  )
}
