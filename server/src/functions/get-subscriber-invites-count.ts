import { redis } from "../redis/client"

interface GetSubscriberInvitesCountParams {
    subscriberId: string
}

export async function getSubscriberInvitesCount({
    subscriberId
}: GetSubscriberInvitesCountParams) {
   const count = await redis.zscore('referral:ranking', subscriberId)

   return { count: count ? Number.parseInt(count) : 0 }
}

//aqui eu pego a pontuação do usuário dentro do ranking, a quantidade de convites que ele fez