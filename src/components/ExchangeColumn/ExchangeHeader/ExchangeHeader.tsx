import React from "react";
import css from './header.module.css'


const ExchangeHeader = () => {
  return (
    <div className={css.header}>
      <div className={css.extraHeader}>Ваша корзина</div>
      <div className={css.extraHeader} style={{ marginTop: '3px' }}>Деньги</div>
    </div>
  );
};

export default ExchangeHeader;
