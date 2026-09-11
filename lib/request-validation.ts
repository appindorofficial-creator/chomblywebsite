import {z} from 'zod';
import {bookingConfigs,colombiaToday,validDate,addDays,nights} from './booking';
import {districts} from './catalog';
export const requestSchema=z.object({idempotencyKey:z.string().uuid(),slug:z.string(),option:z.string(),pet:z.string().trim().min(1).max(80),animal:z.string(),age:z.string().trim().min(1).max(30),size:z.enum(['small','medium','large']),district:z.enum(districts as [string,...string[]]),address:z.string().trim().max(200).default(''),details:z.string().trim().min(8).max(1500),social:z.boolean(),date:z.string(),time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),endDate:z.string().default(''),endTime:z.string().default('11:00'),repeat:z.enum(['once','weekly4']),phone:z.string().regex(/^\+?[\d\s()-]{7,20}$/),consent:z.literal(true),lang:z.enum(['es','en'])});
export type RequestData=z.infer<typeof requestSchema>;
export function validateRequest(input:unknown, today=colombiaToday()){
 const parsed=requestSchema.safeParse(input);if(!parsed.success)return {ok:false as const,code:'fields'};
 const d=parsed.data,c=bookingConfigs.find(c=>c.slug===d.slug),o=c?.options.find(o=>o.id===d.option);
 if(!c||!o||!c.animalTypes.includes(d.animal))return {ok:false as const,code:'service'};
 if(!validDate(d.date)||d.date<=today||d.date>addDays(today,90))return {ok:false as const,code:'date'};
 if(d.repeat==='weekly4'&&(!['walking','daycare','training'].includes(c.kind)||addDays(d.date,21)>addDays(today,90)))return {ok:false as const,code:'repeat'};
 if(c.kind==='hotel'&&(!validDate(d.endDate)||nights(d.date,d.endDate)<1||d.endDate>addDays(today,90)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(d.endTime)))return {ok:false as const,code:'checkout'};
 if(o.mode.includes('domicilio')&&d.address.length<8)return {ok:false as const,code:'address'};
 if(d.option==='group'&&!d.social)return {ok:false as const,code:'social'};
 return {ok:true as const,data:d,config:c,option:o};
}
export function bookingIntervals(d:RequestData){const c=bookingConfigs.find(c=>c.slug===d.slug)!;const o=c.options.find(o=>o.id===d.option)!;return (d.repeat==='weekly4'?[0,7,14,21]:[0]).map(day=>{const start=Math.floor(Date.parse(`${addDays(d.date,day)}T${d.time}:00-05:00`)/1000);const end=c.kind==='hotel'?Math.floor(Date.parse(`${d.endDate}T${d.endTime}:00-05:00`)/1000):start+o.minutes*60;return {start,end}})}
