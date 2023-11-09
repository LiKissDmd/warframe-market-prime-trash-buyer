import { Order } from "./order.js"


export interface OrdersResponse {
    payload: {
        orders:Order[]
    }
}
