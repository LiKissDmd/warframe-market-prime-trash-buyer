import { User } from "../user.js";

export type Order = {
    quantity: number
    visible: boolean
    order_type: 'buy'|'sell'
    platinum: number
    user: User
    platform: string
    creation_date: string
    last_update: string
    id: string
    region: string
  }


