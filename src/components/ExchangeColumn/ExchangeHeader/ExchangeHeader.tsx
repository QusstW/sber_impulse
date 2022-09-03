import React from "react";
import css from './header.module.css'


type TPropsType = {
  type: string
}

const ExchangeHeader = (props : TPropsType) => {

  const { type } = props;

  const titleHeader = () => {
    if(type === 'My') return 'Ваша корзина';
    else if(type === 'salesman') return 'Корзина продавца'
    else if(type === 'sale') return 'статус покупки/продажи:'
  }

  const extraTitleHeader = () => {
    if(type === 'My' || type === 'salesman') return 'Деньги:';
    else if(type === 'sale') return 'Вы получаете:';
  }

  return (
    <div className={css.header}>
      <div className={css.extraHeader}>{titleHeader()}</div>
      <div className={css.extraHeader} style={{ marginTop: '3px' }}>{extraTitleHeader()}</div>
    </div>
  );
};

export default ExchangeHeader;
