import {STORAGE_KEY,TILES,TYPES,ROUND_SECONDS} from './game.js';

export function parseSavedGame(value){
  try{
    const s=JSON.parse(value);
    if(s?.version===2&&Number.isInteger(s.round)&&s.round>=1&&s.round<=4&&s.board&&s.imports&&Array.isArray(s.snapshots)&&s.snapshots.length===(s.complete?4:s.round-1)&&Number.isFinite(s.budget)&&(s.deadline===null||Number.isFinite(s.deadline))&&Object.entries(s.board).every(([tile,type])=>TILES.some(t=>t.id===tile)&&TYPES.some(t=>t.id===type))){
      if(s.deadline!==null&&!s.complete&&!s.checkpoint&&!s.teacherPause){
        const previous=Number.isFinite(s.roundDurationSeconds)?s.roundDurationSeconds:180;
        s.deadline+=(ROUND_SECONDS-previous)*1000;
        s.roundDurationSeconds=ROUND_SECONDS;
      }
      return s;
    }
  }catch{}
  return null;
}
export const GROUPS=Array.from({length:10},(_,i)=>({id:String(i+1),name:`Group ${String(i+1).padStart(2,'0')}`}));
export function groupStorageKey(groupId='1'){
  if(!GROUPS.some(g=>g.id===String(groupId)))throw new Error('Choose a group from 1 to 10.');
  return `${STORAGE_KEY}-group-${groupId}`;
}
export function currentGroupId(search=window.location.search){
  const id=new URLSearchParams(search).get('group');
  return GROUPS.some(g=>g.id===id)?id:'1';
}
export function readSavedGame(groupId='1',storage){
  try{
    const store=storage||localStorage;
    const key=groupStorageKey(groupId);
    const raw=store.getItem(key);
    const value=raw===null&&String(groupId)==='1'?store.getItem(STORAGE_KEY):raw;
    const game=parseSavedGame(value);
    return game&&(!game.groupId||String(game.groupId)===String(groupId))?game:null;
  }catch{return null;}
}
export function readGroupGames(storage){
  return Object.fromEntries(GROUPS.map(g=>[g.id,readSavedGame(g.id,storage)]));
}
export function saveGroupGame(groupId,game,storage,now=Date.now()){
  const store=storage||localStorage;
  store.setItem(groupStorageKey(groupId),JSON.stringify({...game,groupId:String(groupId),savedAt:now}));
}
