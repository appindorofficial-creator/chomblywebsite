import assert from 'node:assert/strict';
import test from 'node:test';
import {randomUUID} from 'node:crypto';
import {request,env} from './test-runtime.mjs';

const sample=(extra={})=>({idempotencyKey:randomUUID(),audience:'owner',name:'Persona de prueba',email:'persona@example.test',phone:'',contactPreference:'email',city:'Bogotá',market:'Colombia',ownerTrigger:'continuity',petStage:'adult',source:'public_website',route:'/es-co/join',consentResearch:true,consentUpdates:false,website:'',...extra});

test('lead endpoint rejects cross-origin writes and unknown clinical text',async()=>{
  assert.equal((await request('/api/leads',{method:'POST',body:sample(),originHeader:'https://other.example'})).status,400);
  assert.equal((await request('/api/leads',{method:'POST',body:sample({symptoms:'clinical free text'})})).status,422);
});

test('lead is persisted once with structured attributes and consent',async()=>{
  const body=sample({utmSource:'newsletter',utmCampaign:'early-access'});
  const first=await request('/api/leads',{method:'POST',body});
  assert.equal(first.status,201);
  const firstData=await first.json();
  const again=await request('/api/leads',{method:'POST',body});
  assert.equal(again.status,200);
  assert.equal((await again.json()).id,firstData.id);
  const row=env.DB.sqlite.prepare('SELECT * FROM leads WHERE id=?').get(firstData.id);
  assert.equal(row.audience,'owner');
  assert.equal(row.consent_research,1);
  assert.deepEqual(JSON.parse(row.payload),{contactPreference:'email',ownerTrigger:'continuity',petStage:'adult',utmSource:'newsletter',utmCampaign:'early-access'});
});

test('audience-specific fields are enforced',async()=>{
  assert.equal((await request('/api/leads',{method:'POST',body:sample({audience:'clinic',ownerTrigger:undefined,petStage:undefined})})).status,422);
  const clinic=sample({audience:'clinic',ownerTrigger:undefined,petStage:undefined,organization:'Clínica prueba',clinicRole:'operations',teamSize:'6-20',interest:'pilot'});
  assert.equal((await request('/api/leads',{method:'POST',body:clinic})).status,201);
});

test('all four audience payloads pass the shared client/server schema',async()=>{
  const cases=[
    sample({email:'owner-audience@example.test'}),
    sample({audience:'professional',email:'professional-audience@example.test',ownerTrigger:undefined,petStage:undefined,professionalRole:'veterinarian',experience:'4-10',interest:'guided-test'}),
    sample({audience:'clinic',email:'clinic-audience@example.test',ownerTrigger:undefined,petStage:undefined,organization:'Clínica de prueba',clinicRole:'director',teamSize:'6-20',interest:'pilot'}),
    sample({audience:'partner',email:'partner-audience@example.test',ownerTrigger:undefined,petStage:undefined,organization:'Fundación de prueba',organizationType:'foundation',interest:'community-learning'}),
  ];
  for(const body of cases)assert.equal((await request('/api/leads',{method:'POST',body})).status,201,body.audience);
});
