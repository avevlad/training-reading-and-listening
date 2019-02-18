import React, { useState, useEffect } from "react";
import { Button, Classes, Dialog, HTMLTable } from "@blueprintjs/core";
import { useActions, useStore, State, Actions } from "easy-peasy";
import useYoutube from "../../hooks/useYoutube";
import { IStore } from "../../store";
import styles from "./Tasks.module.css";

export function Tasks() {
  const tasksState = useStore((s: State<IStore>) => s.tasks);
  const isOpenListModal = useStore((s: State<IStore>) => s.app.isOpenListModal);
  const {
    onFetch,
    onDelete,
    setIsOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    onFetch: a.tasks.fetch,
    onDelete: a.tasks.delete,
    setIsOpenListModal: a.app.setIsOpenListModal,
  }));

  const [video, controls, state] = useYoutube("DyUU88FTmr8");

  useEffect(() => {
    onFetch();
  }, []);

  function handleTableRowClick() {
    console.log("handleTableRowClick");
  }

  function handleDeleteRowClick(e: any, id: number) {
    onDelete(id);
    e.stopPropagation();
  }

  function renderTableList() {
    return tasksState.items.map((item, i) => {
      return (
        <tr onClick={handleTableRowClick} key={i}>
          <td style={{width: 120, textAlign: 'center'}}>
            <a href="https://i.ytimg.com/vi/r-EiyrDgLks/hqdefault.jpg" target="_blank">
              <img className={styles.image} src="https://i.ytimg.com/vi/r-EiyrDgLks/hqdefault.jpg" alt=""/>
            </a>
          </td>
          <td>
            <h4>Task # {item.id}</h4>
          </td>
          <td style={{width: 80, textAlign: 'center', verticalAlign: 'middle'}}>
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


