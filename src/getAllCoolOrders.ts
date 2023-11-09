import axios from 'axios';
import { ITEM_NAMES_TO_BUY } from './item-names-to-buy.js';
import { Order } from './order.js';
import * as WarframeMarket from './warframeMarket/index.js'
import * as Defaults from './defaults/index.js'




export async function getAllCoolOrders(
    options?: {
        filterOrder?: (order: WarframeMarket.Order) => boolean
    }
) {
    // const platinum = options?.platinum ?? 3
    // const quantity = options?.platinum ?? 3

    const { filterOrder = Defaults.filterOrder } = options ?? {}


    const result = await axios.get<WarframeMarket.ItemsResponse>('https://api.warframe.market/v1/items');

    const items = result.data.payload.items;

    const itemsToBuy = items.filter((item) => {
        return ITEM_NAMES_TO_BUY.includes(item.item_name)
    })
    const allCoolOrders = []
    for (const itemToBuy of itemsToBuy) {
        const ordersResponse = await axios.get<WarframeMarket.OrdersResponse>(`https://api.warframe.market/v1/items/${itemToBuy.url_name}/orders`);
        const orders = ordersResponse.data.payload.orders;
        const coolOrders = orders
            .filter(filterOrder)
            .map((coolOrder) => {
                const newCoolOrder = { ...coolOrder, item: itemToBuy }

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
    return allCoolOrders
}