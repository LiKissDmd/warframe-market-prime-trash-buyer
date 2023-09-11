import axios from 'axios'
import { ITEM_NAMES_TO_BUY } from './item-names-to-buy.js';
import { ItemsResponse } from './items-response.js';
import { OrdersResponse } from './orders-response.js';

const itemIWantToBuy = "Reaper Prime Blueprint";

const result = await axios.get<ItemsResponse>('https://api.warframe.market/v1/items')

const items = result.data.payload.items

const itemsToBuy = items.filter((item: any) => {
    return ITEM_NAMES_TO_BUY.includes(item.item_name)
})

for (const itemToBuy of itemsToBuy) {
   
    const ordersResponse = await axios.get<OrdersResponse>(`https://api.warframe.market/v1/items/${itemToBuy.url_name}/orders`)

    const orders = ordersResponse.data.payload.orders
    const coolOrders = orders.filter((order) => {
        return order.platinum <= 3 &&
            order.order_type == 'sell' &&
            order.quantity >= 3 &&
            order.user.status == 'ingame'
    })

    // console.log('')
    // console.log(`Классные ордеры для предмета ${itemToBuy.item_name}`)
    for (const coolOrder of coolOrders) {
        // console.log(coolOrder)
        console.log(`/w ${coolOrder.user.ingame_name} Hello! You have WTS order: ${itemToBuy.item_name} for ${coolOrder.platinum}. I would like to buy all ${coolOrder.quantity} for ${Math.min(3, coolOrder.platinum) * coolOrder.quantity} if you are interested :)`)
    }
    // console.log('')
}





