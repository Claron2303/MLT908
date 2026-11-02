import React from 'react';
import {GROUPS} from './saved-game.js';
import {stats,secondsRemaining,TILES,ROUND_SECONDS} from './game.js';
import {roleOutcomes} from './team.js';
import './groups.css';

export default function TeacherGroups({groups,selected,onSelect,now,Icon}){
  const savedCount=GROUPS.filter(g=>groups[g.id]).length;
  const planning=GROUPS.filter(g=>{const s=groups[g.id];return s&&!s.complete&&!s.checkpoint&&!s.teacherPause&&s.deadline!==null&&secondsRemaining(s,now)>0;}).length;
  const complete=GROUPS.filter(g=>groups[g.id]?.complete).length;
  return <section className="teacher-class-overview"><div className="teacher-class-heading"><div><h2><Icon name="community" size={21}/>Your classroom · 10 groups</h2><p>Select a group to inspect its city, experts, conversations and reflections below.</p></div><div className="class-summary"><span><strong>{savedCount}/10</strong>workspaces saved</span><span><strong>{planning}</strong>planning now</span><span><strong>{complete}</strong>completed</span></div></div><div className="teacher-group-grid">{GROUPS.map(group=>{
    const game=groups[group.id];
    const city=game?stats(game.board,game.round,game.imports):null;
    const passes=city?roleOutcomes(city).filter(r=>r.passed).length:0;
    const seconds=game?secondsRemaining(game,now):ROUND_SECONDS;
    const phase=!game?'Not started':game.complete?'Complete':game.teacherPause?'Teacher / lesson time':game.checkpoint?'Reflecting':game.deadline===null?'Ready to start':seconds===0?'Time up':'Planning';
    return <button key={group.id} className={`teacher-group-tile ${selected===group.id?'selected':''} ${game?'has-work':'unstarted'}`} aria-pressed={selected===group.id} onClick={()=>onSelect(group.id)}><div><strong>{group.name}</strong><span>{phase}</span></div><p>{game?`Round ${game.round} of 4`:'Waiting for the group'}<b>{game&&!game.complete&&game.deadline!==null?`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`:'—'}</b></p><div className="class-progress" role="progressbar" aria-label={`${group.name} completed rounds`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={game?game.snapshots.length*25:0}><span style={{width:`${game?game.snapshots.length*25:0}%`}}/></div><small>{city?`${city.plots}/${TILES.length} plots · ${passes}/4 expert targets met`:'No saved map or activity yet'}</small><footer>{game?.teamMembers?.length===4?game.teamMembers.map(m=>m.name).join(', '):'Team not registered'}<Icon name="chevron" size={13}/></footer></button>;
  })}</div></section>;
}
