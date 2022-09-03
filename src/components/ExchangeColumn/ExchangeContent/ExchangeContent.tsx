import React from "react";
import { TSellItem } from "../../../redux/exchange/reducers";
import css from "./content.module.css";

type TPropsType = {
  itemSell: TSellItem
}

const ExchangeContent = (props: TPropsType) => {

  const { itemSell } = props;
  

  return (
    <div className={css.content}>
      <div className={css.contentItem}>
        <div>{itemSell.Name} ({itemSell.quantity})</div>
        <div>{itemSell.price}</div>
      </div>
    </div>
  );
};

export default ExchangeContent;
