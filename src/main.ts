import axios from 'axios';
import { ITEM_NAMES_TO_BUY } from './item-names-to-buy.js';
import { ItemsResponse } from './items-response.js';
import { OrdersResponse } from './orders-response.js';
import { Order } from './order.js';


const result = await axios.get<ItemsResponse>('https://api.warframe.market/v1/items');

const items = result.data.payload.items;

const itemsToBuy = items.filter((item) => {
    return ITEM_NAMES_TO_BUY.includes(item.item_name)
})
const allCoolOrders = []
for (const itemToBuy of itemsToBuy) {
    const ordersResponse = await axios.get<OrdersResponse>(`https://api.warframe.market/v1/items/${itemToBuy.url_name}/orders`);
    const orders = ordersResponse.data.payload.orders;
    const coolOrders = orders
        .filter((order) => {
            return order.platinum <= 3 &&
                order.order_type == 'sell' &&
                order.quantity >= 3 &&
                order.user.status == 'ingame';
        })
        .map((coolOrder) => {
            const newCoolOrder = {...coolOrder,item:itemToBuy}
            
            return newCoolOrder
        });
  

    allCoolOrders.push(...coolOrders);
}

// Sort allCoolOrders by seller's ingame name
allCoolOrders.sort((a, b) => {
    // Compare seller's ingame names
    const nameA = a.user.ingame_name.toLowerCase();
    const nameB = b.user.ingame_name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
});

console.log('');
console.log(`All cool orders across different items:`);
for (const coolOrder of allCoolOrders) {
    console.log(`/w ${coolOrder.user.ingame_name} Hello! You have WTS order: ${coolOrder.item.item_name} for ${coolOrder.platinum}. I would like to buy all ${coolOrder.quantity} for ${Math.min(3, coolOrder.platinum) * coolOrder.quantity} if you are interested :)`);
}
console.log('');
