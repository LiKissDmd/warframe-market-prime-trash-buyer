import { Item } from "./item.js"
import { Order } from "../order.js"

export interface ItemsResponse {
    payload: {
        items:Item[]
    }
}


