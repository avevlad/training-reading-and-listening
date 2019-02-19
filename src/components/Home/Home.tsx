import React, {useEffect} from "react";
import { Actions, useActions } from "easy-peasy";
import { IStore } from "../../store";

interface HomeProps {
  path: string,
}

export default function Home(props: HomeProps) {
  const {
    setIsOpenListModal,
  } = useActions((a: Actions<IStore>) => ({
    setIsOpenListModal: a.app.setIsOpenListModal,
  }));
  console.log("props = ", props);

  useEffect(()=> {
    setIsOpenListModal(true);
  }, []);
  return (
    <div>
      <h1>Home page!</h1>
    </div>
  )
}
