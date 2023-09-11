import axios from 'axios';

interface ItemsResponse {
    payload: {
        items: any[]
    }
}

const result = await axios.get<ItemsResponse>("https://api.warframe.market/v1/items")

console.log(result.data.payload.items[20])