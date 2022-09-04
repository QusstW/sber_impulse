import { createSlice } from "@reduxjs/toolkit";
import { TCurrentSellingItem, TSellItem, TsellItemSelling } from "./types";

type TExchangeType = {
    mySellItems: Array<TSellItem>,
    salesmanSellItems: Array<TSellItem>,
    saleItems: Array<TsellItemSelling>,
    modal: boolean,
    currentSellingItem: TCurrentSellingItem | null,
    myMoney: number,
    salesManMoney: number,
    differenceSale: number | null,
};



const initialState: TExchangeType = {
    mySellItems: [],
    salesmanSellItems: [],
    saleItems: [],
    modal: false,
    currentSellingItem: null,
    myMoney: 15000,
    salesManMoney: 15000,
    differenceSale: null
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
        },
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        setCurrentSellingItem: (state, action) => {
            state.currentSellingItem = action.payload;
        },
        setSaleItems: (state, action) => {
            state.saleItems = action.payload;
        },
        setDifferenceSale: (state, action) => {
            state.differenceSale = action.payload;
        },
        setMyMoney: (state, action) => {
            state.myMoney = action.payload;
        },
        setSalesManMoney: (state, action) => {
            state.salesManMoney = action.payload;
        }

    }
});

export const {
    setMySellItems,
    setSalesmanItems,
    setModal,
    setCurrentSellingItem,
    setSaleItems,
    setDifferenceSale,
    setMyMoney,
    setSalesManMoney
} = exchangeSlice.actions;

export const exchangeReducer = exchangeSlice.reducer;