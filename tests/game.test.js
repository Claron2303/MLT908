import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL,TILES,TYPES,ROUNDS,RESOURCES,ROUND_SECONDS,stats,build,endRound,startRound,checkpointRound,secondsRemaining,canEdit,setImport,undoBuild,acknowledgeTeacher,completeWaterLesson,completeRoundFourLesson} from '../src/game.js';
const NOW=1_000_000;
const active=()=>startRound(INITIAL,NOW);

test('removing a specific plot refunds paid credits and preserves every other plot and round state',async()=>{
 const {removePlot}=await import('../src/game.js');
 const game=build(build(active(),'4-6','housing',NOW+1000),'4-3','farm',NOW+2000);
 const removed=removePlot(game,'4-6',NOW+3000);
 assert.equal(removed.board['4-6'],undefined);
 assert.equal(removed.board['4-3'],'farm');
 assert.equal(removed.budget,game.budget+12);
 assert.equal(removed.plotCosts['4-6'],undefined);
 assert.equal(removed.plotCosts['4-3'],10);
 assert.equal(removed.deadline,game.deadline);
 assert.equal(removed.chat,game.chat);
 assert.equal(removed.snapshots,game.snapshots);
 const restored=undoBuild(removed,game,NOW+4000);
 assert.deepEqual(restored.board,game.board);
 assert.deepEqual(restored.plotCosts,game.plotCosts);
 assert.equal(restored.budget,game.budget);
});
test('starter plots are free to clear but cannot generate credits; removals respect timer and checkpoint locks',async()=>{
 const {removePlot}=await import('../src/game.js');
 const starter='1-3';const game={...active(),board:{[starter]:'housing'},plotCosts:{[starter]:0}};
 const cleared=removePlot(game,starter,NOW+1000);
 assert.equal(cleared.budget,game.budget);
 const rebuilt=build(cleared,starter,'housing',NOW+2000);
 assert.equal(removePlot(rebuilt,starter,NOW+3000).budget,cleared.budget);
 assert.equal(removePlot(game,starter,game.deadline),game);
 assert.equal(removePlot(game,'99-99',NOW+1000),game);
 assert.equal(removePlot(game,'4-6',NOW+1000),game);
 for(const locked of [INITIAL,{...game,checkpoint:true},{...game,complete:true},{...game,teacherPause:true}])assert.equal(removePlot(locked,starter,NOW+1000),locked);
});

test('map reset clears every plot and restores credits without changing the timer, chat or saved iterations',async()=>{
 const {resetMap}=await import('../src/game.js');
 const game=build(active(),'4-6','housing',NOW+1000);
 const cleared=resetMap(game,NOW+2000);
 assert.deepEqual(cleared.board,{});
 assert.equal(cleared.budget,INITIAL.budget);
 assert.equal(cleared.deadline,game.deadline);
 assert.equal(cleared.chat,game.chat);
 assert.equal(cleared.snapshots,game.snapshots);
 assert.equal(cleared.imports,game.imports);
 assert.equal(cleared.round,game.round);
 assert.deepEqual(undoBuild(cleared,game,NOW+3000).board,game.board);
 assert.equal(resetMap({...game,round:3},NOW+2000).budget,730);
 assert.deepEqual(resetMap(INITIAL,NOW).board,{});
});
test('map reset cannot bypass expired timers, checkpoints or teacher pauses',async()=>{
 const {resetMap}=await import('../src/game.js');
 const game=active();
 assert.equal(resetMap(game,game.deadline),game);
 for(const locked of [{...game,checkpoint:true},{...game,teacherPause:true},{...game,complete:true}])assert.equal(resetMap(locked,NOW),locked);
});

test('the catalogue contains exactly the requested eight types and five essentials',()=>{
 assert.deepEqual(TYPES.map(t=>t.name),['HDB neighbourhood','Commercial building','Factory','Shopping Centre','Sports & Recreational Hub','Nature Reserve','Farm','Water Catchment']);
 assert.equal(TYPES.filter(t=>t.essential).length,5);
 assert.equal(RESOURCES.length,5);
});
test('all possible first-round plans must leave at least one essential unmet, regardless of credits',()=>{
 // Each essential has exactly one producer, with no cross-resource output.
 // Minimum plots needed is a lower bound for every possible allocation.
 const demand=stats({},1,{}).demand;
 const minimumPlots=RESOURCES.reduce((sum,{id})=>{
  const producers=TYPES.filter(t=>t[id]>0);
  assert.equal(producers.length,1);
  return sum+Math.ceil(demand/producers[0][id]);
 },0);
 assert.equal(minimumPlots,50);
 assert.equal(TILES.length,36);
 assert.ok(minimumPlots>TILES.length);
 assert.ok(INITIAL.budget>=TILES.length*Math.max(...TYPES.map(t=>t.cost)),'Budget must not be the reason the round is impossible');
 // Even spending the whole island on either scarce resource cannot also meet other essentials.
 for(const type of TYPES){
  const board=Object.fromEntries(TILES.map(t=>[t.id,type.id]));
  assert.equal(stats(board,1,{food:true,water:true,industry:true}).allEssentialsMet,false);
 }
});
test('the timer lasts 600 seconds and persists its absolute deadline through reloads',()=>{
 assert.equal(secondsRemaining(INITIAL,NOW),ROUND_SECONDS);
 assert.equal(canEdit(INITIAL,NOW),false);
 const game=active();
 assert.equal(game.deadline,NOW+600000);
 assert.equal(secondsRemaining(game,NOW+1000),599);
 const reloaded=JSON.parse(JSON.stringify(game));
 assert.equal(secondsRemaining(reloaded,NOW+599001),1);
 assert.equal(secondsRemaining(reloaded,NOW+600000),0);
 assert.equal(startRound(reloaded,NOW+30000),reloaded,'Starting again cannot reset the deadline');
});
test('building consumes credits, preserves other plots, and respects start and timeout',()=>{
 assert.equal(build(INITIAL,'4-6','housing',NOW),INITIAL);
 const game=active();
 const next=build(game,'4-6','housing',NOW+1000);
 assert.equal(next.budget,588);
 assert.equal(next.board['4-6'],'housing');
 assert.equal(INITIAL.board['4-6'],undefined);
 assert.equal(build(next,'4-6','water',NOW+2000),next);
 assert.equal(build(game,'4-6','housing',game.deadline),game);
 assert.equal(build({...game,budget:0},'4-6','farm',NOW).budget,0);
 assert.equal(build(game,'99-99','housing',NOW),game);
});
test('round one rejects imports in both game actions and calculations',()=>{
 const game=active();
 for(const {id} of RESOURCES)assert.equal(setImport(game,id,true,NOW),game);
 const s=stats(game.board,1,{water:true,food:true,industry:true});
 assert.deepEqual(Object.values(s.imported),[0,0,0,0,0]);
});
test('round two unlocks imports; imports cover gaps without adding local output or resilience',()=>{
 let game=endRound(checkpointRound(active()),ROUNDS[0].choices[0],NOW+5000);
 assert.equal(game.round,2);
 assert.equal(game.deadline,null);
 assert.equal(canEdit(game,NOW),false);
 game=startRound(acknowledgeTeacher(game),NOW+5000);
 const before=stats(game.board,2,game.imports);
 const imported=setImport(game,'food',true,NOW+6000);
 const after=stats(imported.board,2,imported.imports);
 assert.equal(after.imported.food,after.demand-after.supply.food);
 assert.equal(after.unmet.food,0);
 assert.equal(after.totalCoverage.food,100);
 assert.equal(after.score,before.score);
 assert.equal(after.supply.food,before.supply.food);
 assert.equal(setImport(game,'housing',true,NOW+6000),game);
 assert.equal(setImport(game,'commerce',true,NOW+6000),game);
 assert.equal(setImport(game,'water',true,game.deadline),game);
});
test('checkpoint and timeout freeze all edits; undo never rewinds the timer or import policy',()=>{
 const game=active();
 const placed=build(game,'4-6','farm',NOW+1000);
 const undone=undoBuild(placed,game,NOW+2000);
 assert.deepEqual(undone.board,game.board);
 assert.equal(undone.deadline,game.deadline);
 assert.equal(undoBuild(placed,game,placed.deadline),placed);
 const checkpoint=checkpointRound(placed);
 assert.equal(canEdit(checkpoint,NOW+1000),false);
 assert.equal(build(checkpoint,'4-7','water',NOW+1000),checkpoint);
 assert.equal(undoBuild(checkpoint,game,NOW+1000),checkpoint);
});
test('four checkpoints preserve independent snapshots, timers, and resource data',()=>{
 let game=INITIAL;
 let now=NOW;
 for(let round=1;round<=4;round++){
  game=startRound(completeRoundFourLesson(completeWaterLesson(acknowledgeTeacher(game))),now);
  const tile=TILES.find(t=>!game.board[t.id]);
  game=build(game,tile.id,'farm',now+1000);
  const previous=game;
  game=endRound(checkpointRound(game),ROUNDS[round-1].choices[0],game.deadline);
  assert.equal(game.snapshots.length,round);
  assert.equal(game.snapshots[round-1].timedOut,true);
  assert.notEqual(game.snapshots[round-1].board,game.board);
  assert.equal(game.snapshots[round-1].board[tile.id],'farm');
  assert.equal(game.deadline,null);
  if(round<4){assert.equal(game.budget,INITIAL.budget+round*65);assert.deepEqual(game.board,{});assert.deepEqual(game.plotCosts,{});}assert.deepEqual(previous.board,game.snapshots[round-1].board);
  now+=620000;
 }
 assert.equal(game.complete,true);
 assert.equal(Object.keys(game.snapshots[0].board).length,1);
 assert.equal(Object.keys(game.snapshots[3].board).length,1);
 assert.equal(build(game,TILES[0].id,'housing',now),game);
 assert.equal(endRound(game,ROUNDS[3].choices[0],now),game);
});
test('later-round upgrades apply to the same eight land types',()=>{
 const board={'4-6':'farm','4-7':'factory','4-8':'water'};
 const base=stats(board,2,{}),upgraded=stats(board,3,{});
 for(const key of ['food','industry','water'])assert.equal(upgraded.supply[key],base.supply[key]*1.5);
 assert.equal(stats(board,4,{}).liveability,upgraded.liveability+10);
});
test('reflection requires a started round, checkpoint, and valid answer',()=>{
 assert.equal(endRound(INITIAL,ROUNDS[0].choices[0],NOW),INITIAL);
 const game=active();
 assert.equal(endRound(game,ROUNDS[0].choices[0],NOW),game);
 const checkpoint=checkpointRound(game);
 assert.equal(endRound(checkpoint,'',NOW),checkpoint);
 assert.equal(endRound(checkpoint,'invalid',NOW),checkpoint);
});

test('stage-one reflection blocks the next round until the teacher pause is acknowledged',()=>{
 const paused=endRound(checkpointRound(active()),ROUNDS[0].choices[0],NOW+5000);
 assert.equal(paused.teacherPause,true);
 assert.equal(paused.round,2);
 assert.equal(paused.snapshots.length,1);
 assert.equal(paused.deadline,null);
 const reloaded=JSON.parse(JSON.stringify(paused));
 assert.equal(reloaded.teacherPause,true);
 assert.equal(startRound(reloaded,NOW+6000),reloaded);
 assert.equal(canEdit(reloaded,NOW+6000),false);
 const resumed=acknowledgeTeacher(reloaded);
 assert.equal(resumed.teacherPause,false);
 assert.equal(resumed.deadline,null,'Acknowledgement opens briefing without starting the timer');
 const next=startRound(resumed,NOW+6000);
 assert.equal(secondsRemaining(next,NOW+6000),600);
 const afterSecond=endRound(checkpointRound(next),ROUNDS[1].choices[0],NOW+7000);
 assert.equal(afterSecond.teacherPause,false,'Teacher pause applies only after stage one');
});

test('every round starts empty with restored credits, without erasing snapshots or restarting an active timer',()=>{
 assert.deepEqual(INITIAL.board,{});
 for(let round=1;round<=4;round++){
 const snapshots=[{board:{'1-3':'farm'}}];
 const waiting={...INITIAL,round,board:{'1-3':'housing'},plotCosts:{'1-3':12},budget:15,snapshots};
 const started=startRound(waiting,NOW);
 assert.deepEqual(started.board,{});assert.deepEqual(started.plotCosts,{});assert.equal(started.budget,600+(round-1)*65);assert.equal(started.snapshots,snapshots);
 const built=build(started,'1-3','farm',NOW+1000);
 assert.equal(startRound(built,NOW+2000),built);
 assert.equal(built.snapshots[0].board['1-3'],'farm');
 }
});

test('round two opens a persistent water lesson before round three can start',()=>{
 let game=endRound(checkpointRound(active()),ROUNDS[0].choices[0],NOW+1000);
 assert.equal(game.waterLessonPending,false);
 game=startRound(acknowledgeTeacher(game),NOW+2000);
 game=endRound(checkpointRound(game),ROUNDS[1].choices[0],NOW+3000);
 const restored=JSON.parse(JSON.stringify(game));
 assert.equal(restored.round,3);assert.equal(restored.waterLessonPending,true);assert.equal(restored.deadline,null);
 assert.equal(startRound(restored,NOW+4000),restored);assert.equal(canEdit(restored,NOW+4000),false);
 const ready=completeWaterLesson(restored);assert.equal(ready.waterLessonPending,false);assert.equal(ready.deadline,null);
 assert.equal(startRound(ready,NOW+5000).deadline,NOW+5000+ROUND_SECONDS*1000);
 assert.deepEqual(ready.snapshots,restored.snapshots);
});

test('round three saves a paused video lesson before round four starts',()=>{
 let game=startRound({...INITIAL,round:3},NOW);
 game=endRound(checkpointRound(game),ROUNDS[2].choices[0],NOW+1000);
 const restored=JSON.parse(JSON.stringify(game));
 assert.equal(restored.round,4);assert.equal(restored.roundFourLessonPending,true);assert.equal(restored.deadline,null);
 assert.equal(startRound(restored,NOW+2000),restored);assert.equal(canEdit(restored,NOW+2000),false);
 const ready=completeRoundFourLesson(restored);
 assert.equal(ready.roundFourLessonPending,false);assert.equal(ready.deadline,null);assert.deepEqual(ready.snapshots,restored.snapshots);
 const started=startRound(ready,NOW+3000);assert.equal(started.deadline,NOW+3000+ROUND_SECONDS*1000);assert.deepEqual(started.board,{});
 const complete=endRound(checkpointRound(started),ROUNDS[3].choices[0],NOW+4000);assert.equal(complete.roundFourLessonPending,false);assert.equal(complete.complete,true);
});
