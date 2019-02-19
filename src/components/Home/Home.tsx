import React, { useEffect } from "react";
import { Actions, useActions } from "easy-peasy";
import { IStore } from "../../store";

export default function Home() {
  const {
    setIsOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    setIsOpenListModal: a.app.setIsOpenListModal,
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsOpenListModal(true);
    }, 400);
  }, []);

  return null
}
