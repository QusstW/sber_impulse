import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setDifferenceSale } from "../../../redux/exchange/reducers";
import css from './header.module.css'


type TPropsType = {
  type: string
}

const ExchangeHeader = (props : TPropsType) => {
  const { type } = props;

  const { myMoney, salesManMoney, differenceSale, saleItems } = useAppSelector((state) => state.exchange)

  const dispatch = useAppDispatch();


  const titleHeader = () => {
    if(type === 'My') return 'Ваша корзина';
    else if(type === 'salesman') return 'Корзина продавца'
    else if(type === 'sale') {
      if(saleItems.every((el) => el.type === 'My')) return 'статус покупки/продажи: Продажа'
      else if(saleItems.every((el) => el.type === 'salesman')) return 'статус покупки/продажи: Покупка'
      else return 'статус покупки/продажи: Обмен с учётом разницы цены'

    }
  }

  const extraTitleHeader = () => {
    if(type === 'My') return `Деньги: ${myMoney}`;
    else if(type === 'salesman') return `Деньги: ${salesManMoney}`;
    else if(type === 'sale') {
      if(differenceSale && differenceSale >= 0) return `Вы получаете: ${differenceSale}`;
      else if (differenceSale && differenceSale <= 0) return `Вы расходуете: ${Math.abs(differenceSale)}`
      else return 'Сумма сделки..'
    }
  }

  useEffect(() => {
      const myCosts = saleItems.filter((el) => el.type === 'My').reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)
      const salesManCost = saleItems.filter((el) => el.type === 'salesman').reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)

      const difference = myCosts - salesManCost;

      dispatch(setDifferenceSale(difference));


  }, [saleItems]);

  return (
    <div className={css.header}>
      <div className={css.extraHeader}>{titleHeader()}</div>
      <div className={css.extraHeader} style={{ marginTop: '3px' }}>{extraTitleHeader()}</div>
    </div>
  );
};

export default ExchangeHeader;
