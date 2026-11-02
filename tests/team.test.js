import test from 'node:test';
import assert from 'node:assert/strict';
import {ROLES,createTeamChat,normaliseChat,postTeamMessage,roleOutcomes} from '../src/team.js';
import {INITIAL,TILES,stats,startRound,checkpointRound,endRound,ROUNDS} from '../src/game.js';
const city=stats(INITIAL.board,1,INITIAL.imports);
const message=(chat,extra={})=>postTeamMessage(chat,{room:'food',author:'housing',text:'Can you help with our food shortfall?',round:1,city,now:1000,...extra});
test('each role fails exactly when one of its own essential resources is unmet',()=>{
 const healthy={...city,unmet:{housing:0,food:0,water:0,commerce:0,industry:0}};
 assert.ok(roleOutcomes(healthy).every(r=>r.passed));
 for(const role of ROLES){for(const key of role.resources){
  const outcomes=roleOutcomes({...healthy,unmet:{...healthy.unmet,[key]:1}});
  assert.equal(outcomes.find(r=>r.id===role.id).passed,false);
  assert.ok(outcomes.filter(r=>r.id!==role.id).every(r=>r.passed));
 }}
});
test('permitted imports can pass food, water and goods while commercial services must remain local',()=>{
 const board=Object.fromEntries(TILES.slice(0,10).map((t,i)=>[t.id,i<4?'housing':'commercial']));
 const local=roleOutcomes(stats(board,2,{}));
 assert.equal(local.find(r=>r.id==='trade').passed,false);
 const supplied=roleOutcomes(stats(board,2,{food:true,water:true,industry:true}));
 assert.ok(supplied.every(r=>r.passed));
 assert.ok(roleOutcomes(stats(board,1,{food:true,water:true,industry:true})).some(r=>!r.passed));
});
test('sending creates a student message and a labelled reply only in the selected room',()=>{
 const initial=createTeamChat();const next=message(initial);
 assert.equal(initial.rooms.food.length,0);
 assert.equal(next.rooms.food.length,2);
 assert.equal(next.rooms.food[0].kind,'student');
 assert.equal(next.rooms.food[0].author,'housing');
 assert.equal(next.rooms.food[1].kind,'mock');
 assert.equal(next.rooms.food[1].author,'food');
 assert.match(next.rooms.food[1].text,/600 units short/);
 assert.equal(next.rooms.water.length,0);
 assert.equal(next.rooms.housing.length,0);
});
test('all rooms reply to questions and comments, including when posting in your own role room',()=>{
 for(const role of ROLES){for(const text of ['Can you help?','Thanks, I agree.','I suggest reserving land.']){
  const next=message(createTeamChat(),{room:role.id,author:role.id,text});
  assert.equal(next.rooms[role.id].length,2);
  assert.notEqual(next.rooms[role.id][1].author,role.id);
  assert.ok(next.rooms[role.id][1].text.length>30);
 }}
});
test('mock replies respect the round-one import ban and explain later import options',()=>{
 const first=message(createTeamChat(),{text:'Could we import food?'});
 assert.match(first.rooms.food[1].text,/Imports are unavailable this round/);
 const later=message(createTeamChat(),{text:'Could we import food?',round:2});
 assert.match(later.rooms.food[1].text,/Imports can fill/);
});
test('chat survives local-storage JSON roundtrips and keeps histories bounded',()=>{
 let chat=createTeamChat();for(let i=0;i<70;i++)chat=message(chat,{text:`Question ${i}`});
 const restored=normaliseChat(JSON.parse(JSON.stringify(chat)));
 assert.deepEqual(restored,chat);
 assert.equal(restored.rooms.food.length,100);
 assert.equal(new Set(restored.rooms.food.map(m=>m.id)).size,100);
 assert.equal(message(restored,{text:'x'.repeat(600)}).rooms.food.at(-2).text.length,500);
 assert.equal(message(chat,{text:'   '}),chat);
 assert.equal(message(chat,{room:'invalid'}),chat);
 assert.deepEqual(normaliseChat({rooms:{food:[null,{text:'bad'}]}}),createTeamChat());
});
test('checkpoints save all four role outcomes with the city and retain chat history',()=>{
 const game={...startRound(INITIAL,1000),activeRole:'food',chat:message(createTeamChat())};
 const next=endRound(checkpointRound(game),ROUNDS[0].choices[0],2000);
 assert.equal(next.snapshots[0].activeRole,'food');
 assert.equal(next.snapshots[0].roleResults.length,4);
 assert.ok(next.snapshots[0].roleResults.some(r=>!r.passed));
 assert.equal(next.chat.rooms.food.length,2);
});

test('curriculum replies explain supply risks without enabling imports in round one',()=>{
 const early=message(createTeamChat(),{text:'Can imports protect us from drought?',round:1}).rooms.food[1].text;
 assert.match(early,/Imports are unavailable/);
 const later=message(createTeamChat(),{text:'Could drought disrupt imports?',round:2}).rooms.food[1].text;
 assert.match(later,/diverse suppliers/);assert.match(later,/does not simulate/);
 const taps=message(createTeamChat(),{text:'What are the Four National Taps?'}).rooms.food[1].text;
 for(const term of ['NEWater','desalinated','no separate'])assert.ok(taps.includes(term));
 const baskets=message(createTeamChat(),{text:'Explain the food baskets',round:1}).rooms.food[1].text;
 assert.match(baskets,/grow overseas/);assert.match(baskets,/historical/);assert.match(baskets,/Imports remain unavailable/);
});
