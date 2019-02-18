import range from "lodash/range";
import React, { useState } from "react";
import { Button, Classes, Dialog, HTMLTable } from "@blueprintjs/core";
import { useActions, useStore, State, Actions } from "easy-peasy";
import useYoutube from "../../hooks/useYoutube";
import { IStore } from "../../store";
import { IAppActions, IAppStore } from "../../store/app.store";

export function Tasks() {
  const tasksState = useStore((s: State<IStore>) => s.tasks);
  const isOpenListModal = useStore((s: State<IStore>) => s.app.isOpenListModal);
  const {
    onTaskDelete,
    setIsOpenListModal,
  } = useActions((actions: Actions<IStore>) => ({
    onTaskDelete: actions.tasks.delete,
    setIsOpenListModal: actions.app.setIsOpenListModal,
  }));

  const [video, controls, state] = useYoutube("DyUU88FTmr8");

  function handleTableRowClick() {
    console.log("handleTableRowClick");
  }

  function handleDeleteRowClick(e: any, id: number) {
    onTaskDelete(id);
    e.stopPropagation();
  }

  function renderTableList() {
    return tasksState.items.map((item, i) => {
      return (
        <tr onClick={handleTableRowClick} key={i}>
          <td>
            <h4>Task # {item.id}</h4>
          </td>
          <td style={{width: 80, textAlign: 'center'}}>
            <Button intent="danger" icon="delete" onClick={(e: any) => handleDeleteRowClick(e, item.id)}/>
          </td>
        </tr>
      )
    });
  }

  function renderTable() {
    return (
      <HTMLTable style={{width: '100%'}} interactive={true} bordered={true}>
        <tbody>
        {renderTableList()}
        </tbody>
      </HTMLTable>
    );
  }

  function renderDialog() {
    return (
      <Dialog
        style={{width: '70%'}}
        icon="info-sign"
        title="List"
        isOpen={isOpenListModal}
        onClose={() => setIsOpenListModal(false)}
        usePortal={true}
        className={Classes.OVERLAY_SCROLL_CONTAINER}
      >
        <div style={{overflow: 'scroll', height: '70vh'}}>
          {renderTable()}
        </div>
      </Dialog>
    );
  }

  return (
    <div>
      {video}
      {renderDialog()}
    </div>
  );
}


