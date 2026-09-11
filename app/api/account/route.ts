import {identity,respond,admin} from '@/lib/server';
import {legacyProductEnabled} from '@/config/site';
export async function GET(){if(!legacyProductEnabled())return respond({error:'NOT_AVAILABLE'},404);const u=await identity();return respond({user:u?{name:u.displayName,email:u.email}:null,admin:u?admin(u.email):false})}
