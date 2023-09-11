import { Order } from "./order"

export interface OrdersResponse {
    payload: {
        orders:Order[]
    }
}