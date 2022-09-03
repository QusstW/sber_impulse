import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
// import { setTest } from "../redux/exchange/reducers";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import css from "./app.module.css";
import ExchangeColumn from "../components/ExchangeColumn/ExchangeColumn";
import { getSellItems } from "../redux/exchange/actions";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellItems())
  }, [])

  
  return (
    <div className={css.container}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 340,
          },
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn type="My" />} />
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn type="sale"/>}/>
        <Paper elevation={3} className={css.paper} children={<ExchangeColumn type="salesman"/>}/>
      </Box>
    </div>
  );
};

export default App;
