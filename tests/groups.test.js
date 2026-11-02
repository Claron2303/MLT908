import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL,STORAGE_KEY,startRound,build} from '../src/game.js';
import {GROUPS,groupStorageKey,currentGroupId,readSavedGame,readGroupGames,saveGroupGame} from '../src/saved-game.js';
const memory=()=>{const map=new Map();return {map,getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value)};};

test('ten group links resolve to distinct storage keys; invalid groups cannot create arbitrary workspaces',()=>{
 assert.equal(GROUPS.length,10);
 assert.equal(new Set(GROUPS.map(g=>groupStorageKey(g.id))).size,10);
 assert.equal(currentGroupId('?group=10'),'10');
 assert.equal(currentGroupId('?view=teacher&group=7'),'7');
 for(const query of ['','?group=0','?group=11','?group=abc'])assert.equal(currentGroupId(query),'1');
 assert.throws(()=>groupStorageKey('11'));
});
test('ten concurrently saved workspaces retain independent maps, rosters, budgets and timers',()=>{
 const store=memory();
 for(const group of GROUPS){
  const n=Number(group.id);
  const game={...build(startRound(INITIAL,1000*n),'4-6',n%2?'farm':'water',1000*n+500),budget:600-n,teamMembers:[{name:`Player ${n}`,role:'housing'}]};
  saveGroupGame(group.id,game,store,100000+n);
 }
 const groups=readGroupGames(store);
 assert.equal(Object.keys(groups).length,10);
 for(const group of GROUPS){
  const n=Number(group.id),saved=groups[group.id];
  assert.equal(saved.groupId,group.id);
  assert.equal(saved.budget,600-n);
  assert.equal(saved.deadline,600000+1000*n);
  assert.equal(saved.teamMembers[0].name,`Player ${n}`);
  assert.equal(saved.board['4-6'],n%2?'farm':'water');
 }
 const before=GROUPS.filter(g=>g.id!=='4').map(g=>store.getItem(groupStorageKey(g.id)));
 saveGroupGame('4',INITIAL,store,200000);
 assert.deepEqual(GROUPS.filter(g=>g.id!=='4').map(g=>store.getItem(groupStorageKey(g.id))),before);
 assert.equal(readSavedGame('4',store).board['4-6'],undefined);
});
test('the original save migrates read-only to Group 01 and cannot leak into other groups',()=>{
 const store=memory();const legacy=JSON.stringify({...INITIAL,budget:321});
 store.setItem(STORAGE_KEY,legacy);
 assert.equal(readSavedGame('1',store).budget,321);
 assert.equal(readSavedGame('2',store),null);
 assert.equal(store.getItem(STORAGE_KEY),legacy);
 assert.equal(store.map.size,1,'Teacher reads never migrate or write records');
 saveGroupGame('1',{...INITIAL,budget:456},store,5000);
 assert.equal(readSavedGame('1',store).budget,456);
 assert.equal(store.getItem(STORAGE_KEY),legacy);
});
test('teacher overview isolates malformed or wrongly addressed group saves',()=>{
 const store=memory();
 saveGroupGame('1',INITIAL,store,1000);
 store.setItem(groupStorageKey('2'),'bad JSON');
 store.setItem(groupStorageKey('3'),JSON.stringify({...INITIAL,groupId:'4'}));
 const groups=readGroupGames(store);
 assert.ok(groups['1']);assert.equal(groups['2'],null);assert.equal(groups['3'],null);
 assert.equal(store.map.size,3);
});
