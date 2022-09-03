import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setTest } from "../redux/exchange/reducers";

const App = () => {
  const { test } = useAppSelector((state) => state.exchange);

  const dispatch = useAppDispatch();


  const testClick = () => {
    dispatch(setTest(test + 1))
  }
  

  return (
    <>
      <div>Hello world, {test}</div>
      <div onClick={testClick} >инкримент</div>
    </>
  );
};

export default App;
