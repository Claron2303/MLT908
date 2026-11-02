import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSavedGame,readSavedGame} from '../src/saved-game.js';
import {INITIAL,startRound,build} from '../src/game.js';

test('existing three-minute planning rounds receive seven extra minutes exactly once',()=>{
 const old={...INITIAL,deadline:181000};
 const extended=parseSavedGame(JSON.stringify(old));
 assert.equal(extended.deadline,601000);
 assert.equal(extended.roundDurationSeconds,600);
 assert.equal(parseSavedGame(JSON.stringify(extended)).deadline,601000);
 const checkpoint=parseSavedGame(JSON.stringify({...old,checkpoint:true}));
 assert.equal(checkpoint.deadline,181000,'Completed checkpoints are not reopened');
});

test('teacher can read live student saves with roster, map, timer and timestamp intact',()=>{
 const game={...build(startRound(INITIAL,1000),'4-6','farm',2000),savedAt:2500,teamMembers:[{name:'Aisha',role:'food'}]};
 const result=parseSavedGame(JSON.stringify(game));
 assert.deepEqual(result,game);
 assert.equal(result.deadline,601000);
 assert.equal(result.board['4-6'],'farm');
 assert.equal(result.teamMembers[0].name,'Aisha');
});
test('missing, corrupt or incompatible saves do not render invalid teacher data',()=>{
 for(const value of [null,'','invalid','{}','null',JSON.stringify({...INITIAL,round:9}),JSON.stringify({...INITIAL,board:{bad:'farm'}}),JSON.stringify({...INITIAL,snapshots:[{}]})])assert.equal(parseSavedGame(value),null);
 assert.deepEqual(parseSavedGame(JSON.stringify(INITIAL)),INITIAL,'Existing saves without timestamps remain supported');
});
test('reading for teacher observation never writes to browser storage',()=>{
 let writes=0;let reads=0;
 const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>{reads++;return JSON.stringify(INITIAL)},setItem:()=>writes++}});
 try{
  assert.deepEqual(readSavedGame(),INITIAL);
  assert.equal(reads,1);assert.equal(writes,0);
  globalThis.localStorage.getItem=()=>{throw new Error('Storage unavailable')};
  assert.equal(readSavedGame(),null);
 }finally{if(original)Object.defineProperty(globalThis,'localStorage',original);else delete globalThis.localStorage;}
});
