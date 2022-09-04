import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setDifferenceSale } from "../../../redux/exchange/reducers";
import { saleStatus } from "../../../redux/exchange/types";
import {
  DEFAULT_ZERO_VALUE,
  MONEY,
  PURCHASE_STATUS,
  SALESMAN_BASKET,
  SALE_STATUS,
  TRADE_STATUS,
  TRANSACTION_AMOUNT,
  YOUR_BASKET,
  YOU_GET,
  YOU_WILL_SPEND,
} from "./constants";
import css from "./header.module.css";

type TPropsType = {
  type: string;
};

const ExchangeHeader = (props: TPropsType) => {
  const { type } = props;

  const { myMoney, salesManMoney, differenceSale, saleItems } = useAppSelector(
    (state) => state.exchange
  );

  const dispatch = useAppDispatch();

  const titleHeader = () => {
    if (type === saleStatus.MY) return YOUR_BASKET;
    else if (type === saleStatus.SALESMAN) return SALESMAN_BASKET;
    else if (type === saleStatus.SALE) {
      if (saleItems.every((el) => el.type === saleStatus.MY))
        return SALE_STATUS;
      else if (saleItems.every((el) => el.type === saleStatus.SALESMAN))
        return PURCHASE_STATUS;
      else return TRADE_STATUS;
    }
  };

  const extraTitleHeader = () => {
    if (type === saleStatus.MY) return MONEY + ": " + myMoney;
    else if (type === saleStatus.SALESMAN) return MONEY + ": " + salesManMoney;
    else if (type === saleStatus.SALE) {
      if (differenceSale && differenceSale >= DEFAULT_ZERO_VALUE)
        return YOU_GET + ": " + differenceSale;
      else if (differenceSale && differenceSale <= DEFAULT_ZERO_VALUE)
        return YOU_WILL_SPEND + ": " + Math.abs(differenceSale);
      else return TRANSACTION_AMOUNT;
    }
  };

  useEffect(() => {
    const myCosts = saleItems
      .filter((el) => el.type === saleStatus.MY)
      .reduce((prev, curr) => prev + curr.price * curr.quantity, DEFAULT_ZERO_VALUE);
    const salesManCost = saleItems
      .filter((el) => el.type === saleStatus.SALESMAN)
      .reduce((prev, curr) => prev + curr.price * curr.quantity, DEFAULT_ZERO_VALUE);

    const difference = myCosts - salesManCost;
    dispatch(setDifferenceSale(difference));
  }, [saleItems, dispatch]);

  return (
    <div className={css.header}>
      <div className={css.extraHeader}>{titleHeader()}</div>
      <div className={css.extraHeader} style={{ marginTop: "3px" }}>
        {extraTitleHeader()}
      </div>
    </div>
  );
};

export default ExchangeHeader;
