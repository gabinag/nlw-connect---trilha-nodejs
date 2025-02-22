import { redis } from "../redis/client"

interface GetSubscriberInviteClicksParams {
    subscriberId: string
}

export async function getSubscriberInviteClicks({
    subscriberId
}: GetSubscriberInviteClicksParams) {
   const count = await redis.hget('referral:access-count', subscriberId)
   //se existir um count retornará um número, no caso, a quantidade de cliques no invite do usuário
   return { count: count ? Number.parseInt(count) : 0 }
}