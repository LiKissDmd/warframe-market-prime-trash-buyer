export interface User {
    reputation: number
    locale: string
    avatar: string
    last_seen: string
    ingame_name: string
    id: string
    region: string
    status: 'offline'|'online'|'ingame'
  }