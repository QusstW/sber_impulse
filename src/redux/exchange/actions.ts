import { Dispatch } from "redux";
import axios from 'axios';
import { setMySellItems, setSalesmanItems, TSellItem } from "./reducers";


export const getSellItems = () => async (dispatch: Dispatch) => {
    try {
        const response: Array<TSellItem> = await (await axios.get('https://62eb69e2ad295463259d5d99.mockapi.io/api/v1/goods')).data;

        const myItems = response.filter((item, index) => index < 10)
        const salesmanSellItems = response.filter((item, index) => index > 9 && index < 20)

        dispatch(setMySellItems(myItems));
        dispatch(setSalesmanItems(salesmanSellItems));

    }
    catch(err) {
        console.log(err);
    }
}