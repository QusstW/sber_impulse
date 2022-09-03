import { createSlice } from "@reduxjs/toolkit";


type TExchangeType = {
    test: number
};

const initialState: TExchangeType = {
    test: 2
};

export const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setTest: (state, action) => {
            state.test = action.payload;
        }
    }
});

export const {
    setTest
} = exchangeSlice.actions;

export const exchangeReducer = exchangeSlice.reducer;