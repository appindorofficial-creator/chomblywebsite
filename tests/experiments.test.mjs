import assert from 'node:assert/strict';
import test from 'node:test';
import {EXPERIMENTS} from '../config/experiments.ts';
import {assignVariant,safeAnonymousId} from '../lib/experiments/assign.ts';

test('experiments preserve A/B/C identities and B learning priority',()=>{
  assert.equal(EXPERIMENTS.continuity.priority,'A');
  assert.equal(EXPERIMENTS['care-navigator'].priority,'B');
  assert.equal(EXPERIMENTS['pet-passport'].priority,'C');
  assert.match(EXPERIMENTS['care-navigator'].downstream,/prueba/i);
});

test('server assignment is deterministic for a valid anonymous ID',()=>{
  const anonymousId='d1663f19-0a4d-4b64-8df0-3ce3283d5272';
  const first=assignVariant('care-navigator',anonymousId);
  assert.equal(assignVariant('care-navigator',anonymousId),first);
  assert.ok(['control','challenger'].includes(first));
});

test('anonymous identifiers are validated before assignment',()=>{
  assert.equal(safeAnonymousId('not safe'),'00000000-0000-4000-8000-000000000000');
  assert.equal(safeAnonymousId('d1663f19-0a4d-4b64-8df0-3ce3283d5272'),'d1663f19-0a4d-4b64-8df0-3ce3283d5272');
});
