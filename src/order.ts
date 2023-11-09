import { Item } from "./warframeMarket/item.js"
import { User } from "./user.js"
import * as WarframeMarket from './warframeMarket/index.js'

export type Order = WarframeMarket.Order & {
  item:Item
}
  
