import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setCurrentSellingItem,
  setModal,
  setMySellItems,
  setSaleItems,
  setSalesmanItems,
} from "../../../redux/exchange/reducers";
import { saleStatus, TSellItem } from "../../../redux/exchange/types";
import css from "./content.module.css";

type TPropsType = {
  itemSell: TSellItem;
  type: string;
};

const ExchangeContent = (props: TPropsType) => {
  const SINGLE_VALUE_QUANTITY = 1;
  const { itemSell, type } = props;
  const { mySellItems, saleItems, salesmanSellItems } = useAppSelector((state) => state.exchange);
  const dispatch = useAppDispatch();
  const isPresentItem = saleItems.find((el) => el.id === itemSell.id);

  const addToSale = () => {
    if (type === saleStatus.SALE) return;
    if (itemSell.quantity > SINGLE_VALUE_QUANTITY) {
      const currentItemToSell = { ...itemSell, type };
      dispatch(setModal(true));
      dispatch(setCurrentSellingItem(currentItemToSell));
    } else if (itemSell.quantity === SINGLE_VALUE_QUANTITY) {
      addSingleItem();
    }
  };

  const addSingleItem = () => {
    const newMy = mySellItems.filter((myItem) => myItem.id !== itemSell.id);
    const newSalesMan = salesmanSellItems.filter(
      (salesManItem) => salesManItem.id !== itemSell.id
    );

    if (isPresentItem) {
      const newItemsForSale = getNewSaleItems(saleItems);

      dispatch(setSaleItems(newItemsForSale));
    } else {
      const newItemsForSale = [...saleItems, { ...itemSell, type }];

      dispatch(setSaleItems(newItemsForSale));
    }
    if (type === saleStatus.MY) {
      dispatch(setMySellItems(newMy));
    } else if (type === saleStatus.SALESMAN) {
      dispatch(setSalesmanItems(newSalesMan));
    }
  };

  const getNewSaleItems = (currentSalingItems: Array<TSellItem>) => {
    return currentSalingItems.map((el) => {
      if (el.id === itemSell.id) {
        return {
          ...el,
          quantity: el.quantity + SINGLE_VALUE_QUANTITY,
        };
      } else return el;
    });
  };

  return (
    <div className={css.content} onClick={addToSale}>
      <div className={css.contentItem}>
        <div>
          {itemSell.Name} ({itemSell.quantity})
        </div>
        <div>{itemSell.price}</div>
      </div>
    </div>
  );
};

export default ExchangeContent;
