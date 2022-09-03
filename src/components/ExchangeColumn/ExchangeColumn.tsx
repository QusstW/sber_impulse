import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExchangeContent from "./ExchangeContent/ExchangeContent";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";

import css from './column.module.css'
import { setMyMoney, setMySellItems, setSaleItems, setSalesmanItems, setSalesManMoney } from "../../redux/exchange/reducers";

type TPropsType = {
  type: string;
};

const ExchangeColumn = (props: TPropsType) => {
  const { type } = props;

  const { mySellItems, saleItems, salesmanSellItems, differenceSale, myMoney, salesManMoney } = useAppSelector(
    (state) => state.exchange
  );

  const dispatch = useAppDispatch();

  const getItemsToRender = () => {
    if (type === "My") return mySellItems;
    else if (type === "salesman") return salesmanSellItems;
    else if (type === "sale") return saleItems;
  };

  const itemsToRender = getItemsToRender();

  const makeADeal = () => {
    const purchased = saleItems.filter((el) => el.type === 'salesman');
    const sold = saleItems.filter((el) => el.type === 'My');

    let newMySellItems;
    let newSalesmanSellItems;

    purchased.forEach((pur) => {
      if(mySellItems.find((mi) => mi.id === pur.id)) {
        newMySellItems = mySellItems.map((nmi) => {
          return{
            ...nmi,
            quantity: nmi.quantity + pur.quantity
          }
        })
      } else {
        newMySellItems = [...mySellItems, pur]
      }
    })

    sold.forEach((s) => {
      if(salesmanSellItems.find((ssi) => ssi.id === s.id)) {
        newSalesmanSellItems = salesmanSellItems.map((nwss) => {
          return {
            ...nwss,
            quantity: nwss.quantity + s.quantity
          }
        });
      } else {
        newSalesmanSellItems = [...salesmanSellItems, s]
      }
    })
    
    if(purchased.length) {
      dispatch(setMySellItems(newMySellItems));
    }
    if(sold.length) {
      dispatch(setSalesmanItems(newSalesmanSellItems));
    }
    dispatch(setSaleItems([]));
    if(differenceSale) {
      dispatch(setMyMoney(myMoney + differenceSale));
      dispatch(setSalesManMoney(salesManMoney + Math.abs(differenceSale)));
    }
  }

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
