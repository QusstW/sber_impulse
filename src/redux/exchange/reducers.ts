import { createSlice } from "@reduxjs/toolkit";


type TExchangeType = {
    mySellItems: Array<TSellItem>,
    salesmanSellItems: Array<TSellItem>,
    saleItems: Array<TSellItem>
};

export type TSellItem = {
    Name: string,
    createdAt: string,
    id: string,
    price: number,
    quantity: number
}

const initialState: TExchangeType = {
    mySellItems: [],
    salesmanSellItems: [],
    saleItems: []
};

export const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setMySellItems: (state, action) => {
            state.mySellItems = action.payload;
        },
        setSalesmanItems: (state, action) => {
            state.salesmanSellItems = action.payload;
        }
    }
});

export const {
    setMySellItems,
    setSalesmanItems
} = exchangeSlice.actions;

export const exchangeReducer = exchangeSlice.reducer;