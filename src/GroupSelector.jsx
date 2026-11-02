import React from 'react';
import {GROUPS} from './saved-game.js';
import './groups.css';

export default function GroupSelector({groupId,Icon}){
  return <section className="group-workspace"><div className="group-workspace-icon"><Icon name="community" size={23}/></div><div><span className="eyebrow">YOUR GROUP WORKSPACE</span><strong>{GROUPS.find(g=>g.id===groupId).name}</strong><p>Your map, team, chat and timer belong to this group.</p></div><label>Switch group<select value={groupId} onChange={e=>window.location.assign(`?group=${e.target.value}`)}>{GROUPS.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></label><a className="secondary" href={`?group=${groupId}`} target="_blank" rel="noreferrer">Open group tab<Icon name="arrow" size={14}/></a></section>;
}
