import React from 'react'
import { useAppSelector } from '../../hooks/hooks';
import ExchangeContent from './ExchangeContent/ExchangeContent';
import ExchangeHeader from './ExchangeHeader/ExchangeHeader';

type TPropsType = {
    type: string,
}

const ExchangeColumn = (props: TPropsType) => {
    const { type } = props;

    const { mySellItems, saleItems, salesmanSellItems } = useAppSelector((state) => state.exchange)


    const getItemsToRender = () => {
        if(type === 'My') return mySellItems;
        else if(type === 'salesman') return salesmanSellItems;
        else if(type === 'sale') return saleItems
    }

    const itemsToRender = getItemsToRender();

    return (
        <>
            <ExchangeHeader type={type} />
            {
                itemsToRender?.map((el, index) => (
                    <ExchangeContent key={el.Name + index} itemSell={el}/>
                ))
            }
            
        </>
    )
}

export default ExchangeColumn;