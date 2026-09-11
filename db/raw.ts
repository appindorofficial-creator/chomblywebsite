import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('STORAGE_UNAVAILABLE');return env.DB}
export function settings(){return env as unknown as Record<string,string|undefined>}
