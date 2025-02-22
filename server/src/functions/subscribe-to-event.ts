import { eq } from 'drizzle-orm'
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"
import { redis } from '../redis/client'

interface SubscribeToEventParams {
    name: string
    email: string
    referrerId?: string | null  //id do usuário que convidou 
}

export async function subscribeToEvent({
    name, 
    email,
    referrerId
}: SubscribeToEventParams) {
    //verificando se a pessoa já se inscreveu, se o e-mail já foi cadastrado não retornará erro, apenas retornará seu id
    const subscribers = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.email, email))

        if(subscribers.length > 0) {
            return { subscriberId: subscribers[0].id }
        }

    const result = await db
        .insert(subscriptions)
        .values({
            name,
            email,
        })
        .returning()
    
    //se o usuário tiver sido convidado, o usuário que convidou recebe um ponto no ranking
    if (referrerId) {
        await redis.zincrby('referral:ranking', 1, referrerId)
    }
    
    const subscriber = result[0]

    return {
        subscriberId: subscriber.id,
    }
}