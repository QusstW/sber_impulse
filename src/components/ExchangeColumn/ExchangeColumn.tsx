import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExchangeContent from "./ExchangeContent/ExchangeContent";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";

import css from "./column.module.css";
import {
  setMyMoney,
  setMySellItems,
  setSaleItems,
  setSalesmanItems,
  setSalesManMoney,
} from "../../redux/exchange/reducers";
import { saleStatus, TSellItem, TsellItemSelling } from "../../redux/exchange/types";
import { getSellItems } from "../../redux/exchange/actions";

type TPropsType = {
  type: string;
  setModalMessage?: React.Dispatch<React.SetStateAction<boolean>>
};

const ExchangeColumn = (props: TPropsType) => {
  const { type, setModalMessage } = props;

  const {
    mySellItems,
    saleItems,
    salesmanSellItems,
    differenceSale,
    myMoney,
    salesManMoney,
  } = useAppSelector((state) => state.exchange);

  const dispatch = useAppDispatch();

  const isNotEnoughMoney = differenceSale && (Math.abs(differenceSale) > myMoney || Math.abs(differenceSale) > salesManMoney);

  const getItemsToRender = () => {
    if (type === saleStatus.MY) return mySellItems;
    else if (type === saleStatus.SALESMAN) return salesmanSellItems;
    else if (type === saleStatus.SALE) return saleItems;
  };

  const itemsToRender = getItemsToRender();

  const makeADeal = () => {
    if (isNotEnoughMoney) {
      setModalMessage && setModalMessage(true);
      dispatch(getSellItems());
      return;
    }
    
    const filteredItemsToMe = saleItems.filter((el) => el.type === saleStatus.SALESMAN);
    const filteredItemsToSalesMan = saleItems.filter((el) => el.type === saleStatus.MY);

    const newMySellItems = getNewUpdateItems(filteredItemsToMe, mySellItems);
    const newSalesmanSellItems = getNewUpdateItems(filteredItemsToSalesMan, salesmanSellItems);

    if (filteredItemsToMe.length) {
      dispatch(setMySellItems(newMySellItems));
    }
    if (filteredItemsToSalesMan.length) {
      dispatch(setSalesmanItems(newSalesmanSellItems));
    }
    dispatch(setSaleItems([]));
    //поправить
    if (differenceSale) {
      if (differenceSale < 0) {
        dispatch(setMyMoney(myMoney + differenceSale));
        dispatch(setSalesManMoney(salesManMoney + Math.abs(differenceSale)));
      } else if (differenceSale > 0) {
        dispatch(setMyMoney(myMoney + differenceSale));
        dispatch(setSalesManMoney(salesManMoney + -differenceSale));
      }
    }
  };

  const getNewUpdateItems = (filtredArr: Array<TsellItemSelling>, comparableArr: Array<TSellItem>) => {
    let finalUpdatedArr;

    filtredArr.forEach((formedElement) => {
      if (comparableArr.find((originalElement) => originalElement.id === formedElement.id)) {
        finalUpdatedArr = comparableArr.map((comp) => {
          return {
            ...comp,
            quantity: comp.quantity + formedElement.quantity,
          };
        });
      } else {
        finalUpdatedArr = [...mySellItems, formedElement];
      }
    });
    return finalUpdatedArr;
  }

  return (
    <>
      <ExchangeHeader type={type} />
      {itemsToRender?.map((el, index) => (
        <ExchangeContent key={el.Name + index} itemSell={el} type={type} />
      ))}
      {type === saleStatus.SALE && (
        <Button variant="outlined" onClick={makeADeal} className={css.button_A}>
          Make a Deal
        </Button>
      )}
    </>
  );
};

export default ExchangeColumn;
