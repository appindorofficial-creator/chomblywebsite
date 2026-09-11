import {registerHooks} from 'node:module';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
registerHooks({resolve(specifier,context,next){if(specifier==='cloudflare:workers')return {url:'data:text/javascript,export const env = new Proxy({}, {get(_,key){return globalThis.__chombyTestEnv?.[key]}});',shortCircuit:true};return next(specifier,context)},load(url,context,next){return next(url,context)}});
export function createDatabase(){const sqlite=new DatabaseSync(':memory:');const directory=new URL('../drizzle/',import.meta.url);for(const file of fs.readdirSync(directory).filter(file=>file.endsWith('.sql')).sort())sqlite.exec(fs.readFileSync(new URL(file,directory),'utf8'));const bind=(sql,values=[])=>({bind(...v){return bind(sql,v)},async first(){return sqlite.prepare(sql).get(...values)||null},async all(){return {results:sqlite.prepare(sql).all(...values),success:true}},async run(){const r=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:r.changes}}}});return {prepare:bind,async batch(statements){sqlite.exec('BEGIN');try{const out=[];for(const s of statements)out.push(await s.run());sqlite.exec('COMMIT');return out}catch(e){sqlite.exec('ROLLBACK');throw e}},sqlite}}
export const origin='https://chombly.invalid';
export const env={ASSETS:{fetch:async()=>new Response('',{status:404})},DB:createDatabase(),CHOMBY_ADMIN_EMAILS:'owner@example.test'};
globalThis.__chombyTestEnv=env;
process.env.CHOMBLY_TEST_ONLY_ENABLE_LEGACY_PRODUCT='true';
process.env.CHOMBLY_TEST_ONLY_ENABLE_PAYMENTS='true';
const {default:worker}=await import('../dist/server/index.js');
export async function request(path,{user,method='GET',body,originHeader=origin}={}){const headers={accept:'text/html'};if(user){headers['oai-authenticated-user-id']=user;headers['oai-authenticated-user-email']=user+'@example.test'}if(body){headers['Content-Type']='application/json';headers.origin=originHeader}return worker.fetch(new Request(origin+path,{method,headers,body:body?JSON.stringify(body):undefined}),env,{waitUntil(){},passThroughOnException(){}})}
