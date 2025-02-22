import { redis } from "../redis/client"

interface GetSubscriberRankingPositionParams {
    subscriberId: string
}

export async function getSubscriberRankingPosition({
    subscriberId
}: GetSubscriberRankingPositionParams) {
   const rank = await redis.zrevrank('referral:ranking', subscriberId)

   if (rank === null) {
    return { position: null }
   }

   return { position: rank + 1 }
}

//dica: selecionar o nome da função -> ctrl + shift + p -> procura por replace -> escreve a frase que deseja colocar no lugar -> seleciona o AB -> replace all