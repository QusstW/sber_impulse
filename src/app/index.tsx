import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";

import { Box, Button, Paper } from "@mui/material";

import css from "./app.module.css";
import ExchangeColumn from "../components/ExchangeColumn/ExchangeColumn";
import { getSellItems } from "../redux/exchange/actions";
import ExchangeModal from "../components/Modal/ExchangeModal";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type="My" />}
          />
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type="sale" />}
          />
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type="salesman" />}
          />
        </Box>
        <ExchangeModal />
      </div>
    </>
  );
};

export default App;
