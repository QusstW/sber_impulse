import React from "react";
// import { useAppSelector, useAppDispatch } from "../hooks/hooks";
// import { setTest } from "../redux/exchange/reducers";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import css from "./app.module.css";
import ExchangeColumn from "../components/ExchangeColumn/ExchangeColumn";

const App = () => {
  // const { test } = useAppSelector((state) => state.exchange);

  // const dispatch = useAppDispatch();

  // const testClick = () => {
  //   dispatch(setTest(test + 1));
  // };

  
  return (
    <div className={css.container}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 280,
            height: 128,
          },
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn />} />
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn />}/>
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn />}/>
      </Box>
    </div>
  );
};

export default App;
