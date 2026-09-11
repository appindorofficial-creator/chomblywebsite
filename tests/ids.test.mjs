import assert from 'node:assert/strict';
import test from 'node:test';
import {secureUuidV4} from '../lib/ids.ts';

const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test('secure identifier strategy emits RFC 4122 version 4 IDs',()=>{
  const source={getRandomValues(bytes){bytes.fill(0xff);return bytes}};
  assert.equal(secureUuidV4(source),'ffffffff-ffff-4fff-bfff-ffffffffffff');
});

test('secure identifier strategy uses Web Crypto entropy',()=>{
  const ids=new Set(Array.from({length:100},()=>secureUuidV4()));
  assert.equal(ids.size,100);
  for(const id of ids)assert.match(id,uuidV4);
});

test('secure identifier strategy rejects missing cryptographic entropy',()=>{
  assert.throws(()=>secureUuidV4({getRandomValues:null}),/SECURE_RANDOM_UNAVAILABLE/);
});
