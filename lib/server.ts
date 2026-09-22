import {getChatGPTUser} from '@/app/chatgpt-auth';
import {database,settings} from '@/db/raw';
export const now=()=>Math.floor(Date.now()/1000);
export const respond=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export function admin(email:string){return (settings().CHOMBY_ADMIN_EMAILS||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase())}
export async function identity(){return getChatGPTUser()}
export async function input(req:Request){if(req.headers.get('origin')!==new URL(req.url).origin)throw new Error('ORIGIN');if(!req.headers.get('content-type')?.includes('application/json'))throw new Error('CONTENT_TYPE');const raw=await req.text();if(raw.length>15000)throw new Error('BODY_SIZE');return JSON.parse(raw)}
export async function guarded(fn:()=>Promise<Response>){try{return await fn()}catch(e){const code=e instanceof Error?e.message:'';if(['ORIGIN','CONTENT_TYPE','BODY_SIZE'].includes(code))return respond({error:code},400);console.error('[guarded]',e);return respond({error:'SERVICE_UNAVAILABLE'},503)}}
export const db=database;
export function publicBooking<T extends Record<string,unknown>>(b:T):Omit<T,'data'>&{data:Record<string,unknown>}{
 const parsed=typeof b.data==='string'?JSON.parse(b.data) as unknown:b.data;
 const data=parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed as Record<string,unknown>:{};
 return {...b,data};
}
