import { Button } from "@mui/material";
import React from "react";
import { makeADeal } from "../../helpers/makeADeal";
import { useAppSelector } from "../../hooks/hooks";
import ExchangeContent from "./ExchangeContent/ExchangeContent";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";

import css from './column.module.css'

type TPropsType = {
  type: string;
};

const ExchangeColumn = (props: TPropsType) => {
  const { type } = props;

  const { mySellItems, saleItems, salesmanSellItems } = useAppSelector(
    (state) => state.exchange
  );

  const getItemsToRender = () => {
    if (type === "My") return mySellItems;
    else if (type === "salesman") return salesmanSellItems;
    else if (type === "sale") return saleItems;
  };

  const itemsToRender = getItemsToRender();

  return (
    <>
      <ExchangeHeader type={type} />
      {itemsToRender?.map((el, index) => (
        <ExchangeContent key={el.Name + index} itemSell={el} type={type} />
      ))}
      {type === "sale" && (
        <Button variant="outlined" onClick={makeADeal} className={css.button_A}>
          Make a Deal
        </Button>
      )}
    </>
  );
};

export default ExchangeColumn;
