import React from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { setCurrentSellingItem, setModal, TSellItem } from "../../../redux/exchange/reducers";
import css from "./content.module.css";

type TPropsType = {
  itemSell: TSellItem,
  type: string
}

const ExchangeContent = (props: TPropsType) => {
  const { itemSell, type } = props;
  const dispatch = useAppDispatch()
  

  const addToSale = () => {
    if(itemSell.quantity > 1) {
      const currentItemToSell = {...itemSell, type};
      
      dispatch(setModal(true));
      dispatch(setCurrentSellingItem(currentItemToSell));
    }
  };

  return (
    <div className={css.content} onClick={addToSale}>
      <div className={css.contentItem}>
        <div>{itemSell.Name} ({itemSell.quantity})</div>
        <div>{itemSell.price}</div>
      </div>
    </div>
  );
};

export default ExchangeContent;
