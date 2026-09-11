import assert from 'node:assert/strict';
import test from 'node:test';
import {request} from './test-runtime.mjs';

const publicRoutes=['/es-co','/es-co/pet-owners','/es-co/professionals','/es-co/clinics','/es-co/businesses','/es-co/partners','/es-co/about','/es-co/join','/es-co/contact','/es-co/privacy','/es-co/terms'];

for(const path of publicRoutes)test(`public route renders ${path}`,async()=>{
  const response=await request(path);
  assert.equal(response.status,200);
  const html=await response.text();
  const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  assert.match(html,/<html[^>]*lang="es-CO"/);
  assert.equal((visible.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/noindex/i);
  assert.match(visible,/Chombly/);
  assert.doesNotMatch(visible,/\bChomby\b/);
  assert.doesNotMatch(visible,/US\$10|Seis servicios|veterinario online y servicios/i);
});

test('homepage renders the canonical V2 experience and public truth',async()=>{
  const html=await (await request('/es-co')).text();
  const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
  assert.ok((main.match(/<section\b/g)||[]).length>=9);
  assert.match(main,/Tu mascota cuenta contigo/);
  assert.match(main,/PRÓXIMAMENTE EN COLOMBIA/i);
  assert.match(main,/Aclara/);
  assert.match(main,/Encuentra/);
  assert.match(main,/Sigue cuidando/);
  assert.match(main,/Profesionales, clínicas y servicios/);
  assert.doesNotMatch(main,/Estamos validando|Hipótesis B|Participa en nuestra investigación|Lo que queremos aprender|Build with us/i);
});

for(const id of ['continuity','care-navigator','pet-passport'])test(`experiment ${id} is explicit and noindex`,async()=>{
  const response=await request('/es-co/e/'+id);
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/noindex/i);
  assert.match(html,/Esto es una prueba de concepto/);
  assert.match(html,/No es un producto clínico/);
});

test('legacy public product surfaces are not available in PRELAUNCH',async()=>{
  process.env.CHOMBLY_TEST_ONLY_ENABLE_LEGACY_PRODUCT='false';
  try{
    for(const path of ['/servicios/veterinario-online-colombia','/agendar/veterinario-online-colombia','/mis-reservas','/administracion','/en'])assert.equal((await request(path)).status,404,path);
  }finally{process.env.CHOMBLY_TEST_ONLY_ENABLE_LEGACY_PRODUCT='true'}
});

test('legacy informational paths redirect into the new architecture',async()=>{
  for(const [path,target] of [['/profesionales','/es-co/professionals'],['/privacidad','/es-co/privacy'],['/sobre-chomby','/es-co/about']]){
    const response=await request(path);
    assert.ok([301,302,307,308].includes(response.status));
    assert.equal(new URL(response.headers.get('location'),'https://chombly.invalid').pathname,target);
  }
});

test('prelaunch sitemap is empty and robots disallow crawling',async()=>{
  assert.doesNotMatch(await (await request('/sitemap.xml')).text(),/<loc>/);
  assert.match(await (await request('/robots.txt')).text(),/Disallow: \/$/m);
});
