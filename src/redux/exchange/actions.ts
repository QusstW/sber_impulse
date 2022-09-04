import { Dispatch } from "redux";
import { setMySellItems, setSaleItems, setSalesmanItems} from "./reducers";
import { API } from "../../API";

export const getSellItems = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await API.getSellItems('https://62eb69e2ad295463259d5d99.mockapi.io/api/v1/goods');
       
        const myItems = data.filter((item, index) => index < 10)
        const salesmanSellItems = data.filter((item, index) => index > 9 && index < 20)

        dispatch(setMySellItems(myItems));
        dispatch(setSalesmanItems(salesmanSellItems));
        dispatch(setSaleItems([]));
    }
    catch(err) {
        console.log(err);
    };
};