import axios from "axios";
import { TSellItem } from "../redux/exchange/types";


export const API = {
    getSellItems(url: string) {
        return axios.get<Array<TSellItem>>(url);
    }
}