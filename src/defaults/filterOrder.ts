import { Order } from "../warframeMarket/index.js";

export function filterOrder(order:Order) {
    return order.platinum <= 3 &&
        order.order_type == 'sell' &&
        order.quantity >= 3 &&
        order.user.status == 'ingame';
}