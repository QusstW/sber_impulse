import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";

import { Box, Paper } from "@mui/material";

import css from "./app.module.css";
import ExchangeColumn from "../components/ExchangeColumn/ExchangeColumn";
import { getSellItems } from "../redux/exchange/actions";
import ExchangeModal from "../components/ExchangeModal/ExchangeModal";
import { saleStatus } from "../redux/exchange/types";
import { BOX_STYLES } from "../constants/styles";
import MessageModal from "../components/MessageModal/MessageModal";
import { NEED_MORE_MONEY } from "../constants/messages";

const App = () => {
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={css.container}>
        <Box sx={BOX_STYLES}>
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type={saleStatus.MY} />}
          />
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type={saleStatus.SALE} setModalMessage={setModalMessage} />}
          />
          <Paper
            elevation={3}
            className={css.paper}
            children={<ExchangeColumn type={saleStatus.SALESMAN} />}
          />
        </Box>
        <ExchangeModal />
        <MessageModal open={modalMessage} setOpen={setModalMessage} message={NEED_MORE_MONEY} />
      </div>
    </>
  );
};

export default App;
