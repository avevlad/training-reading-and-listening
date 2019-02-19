import React, { useState, useEffect } from "react";
import { Button, Classes, Dialog, HTMLTable } from "@blueprintjs/core";
import { useActions, useStore, State, Actions } from "easy-peasy";
import useYoutube from "../../hooks/useYoutube";
import { IStore } from "../../store";
import styles from "./Tasks.module.css";
import useRouter from "../../hooks/useReactRouter";

interface TasksProps {
}

export default function Tasks(props: TasksProps) {
  const tasksState = useStore((s: State<IStore>) => s.tasks);
  const isOpenListModal = useStore((s: State<IStore>) => s.app.isOpenListModal);
  const {history} = useRouter();

  const {
    onFetch,
    onDelete,
    setIsOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    onFetch: a.tasks.fetch,
    onDelete: a.tasks.delete,
    setIsOpenListModal: a.app.setIsOpenListModal,
  }));

  useEffect(() => {
    onFetch();
  }, []);

  function handleTableRowClick(id: number) {
    history.push(`/play/${id}`);
    console.log("handleTableRowClick");
  }

  function handleDeleteRowClick(e: any, id: number) {
    onDelete(id);
    e.stopPropagation();
  }

  function renderTableList() {
    return tasksState.items.map((item, i) => {
      const img = `https://i.ytimg.com/vi/${item.url}/hqdefault.jpg`;
      const link = `https://youtu.be/${item.url}`;

      return (
        <tr onClick={() => handleTableRowClick(item.id)} key={i}>
          <td style={{width: 120, textAlign: 'center'}}>
            <a href={link} target="_blank">
              <img className={styles.image} src={img} alt=""/>
            </a>
          </td>
          <td>
            <h4># {item.id}</h4>
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

  return renderDialog();
}


