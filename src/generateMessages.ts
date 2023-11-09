import { Order } from "./order.js";

export function generateMessages(allCoolOrders: Array<Order>) {
    const messages: Array<string> = []
    for (const coolOrder of allCoolOrders) {
        messages.push(`/w ${coolOrder.user.ingame_name} Hello! You have WTS order: ${coolOrder.item.item_name} for ${coolOrder.platinum}. I would like to buy all ${coolOrder.quantity} for ${Math.min(3, coolOrder.platinum) * coolOrder.quantity} if you are interested :)`);
    }
    return messages
}