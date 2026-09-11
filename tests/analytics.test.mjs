import assert from 'node:assert/strict';
import test from 'node:test';
import {ANALYTICS_EVENTS,sanitizeProperties} from '../lib/analytics/events.ts';

test('canonical analytics contract contains the required Phase B events',()=>{
  for(const event of ['page_viewed','audience_selected','cta_clicked','experiment_exposed','sticky_story_entered','sticky_story_completed','sticky_story_skipped','form_started','form_submitted','form_submission_failed','app_store_clicked'])assert.ok(ANALYTICS_EVENTS.includes(event),event);
});

test('analytics accepts attribution and rejects PII or clinical fields',()=>{
  const safe=sanitizeProperties({locale:'es-co',market:'CO',route:'/es-co/join',source:'public_website',utm_source:'qa',utm_campaign:'phase-b',audience:'owner',thesis_id:'thesis.b.care-navigator',experiment_id:'care-navigator',variant_id:'control',cta_id:'join',form_id:'early_access',device_class:'mobile',reduced_motion:'false',consent_state:'research_only',email:'private@example.test',symptoms:'never send'});
  assert.equal(safe.utm_campaign,'phase-b');
  assert.equal(safe.form_id,'early_access');
  assert.equal('email' in safe,false);
  assert.equal('symptoms' in safe,false);
});
