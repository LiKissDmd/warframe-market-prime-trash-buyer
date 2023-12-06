#!/usr/bin/env node

import { generateMessages } from "../generateMessages.js";
import { getAllCoolOrders } from "../getAllCoolOrders.js";

const allCoolOrders = await getAllCoolOrders()
const messages = generateMessages (allCoolOrders)
console.log(messages)