import React,{useState} from 'react';
import {ROLES,validateTeam} from './team.js';

export default function TeamSetup({game,onChange,Icon}){
  const saved=validateTeam(game.teamMembers);
  const [editing,setEditing]=useState(!saved.members);
  const [members,setMembers]=useState(()=>saved.members||Array.from({length:4},()=>({name:'',role:''})));
  const [error,setError]=useState('');
  const [status,setStatus]=useState('');
  function edit(){setMembers(saved.members||members);setError('');setStatus('');setEditing(true);}
  function update(index,key,value){setMembers(current=>current.map((m,i)=>i===index?{...m,[key]:value}:m));setError('');}
  function save(e){
    e.preventDefault();
    const result=validateTeam(members);
    if(result.error){setError(result.error);return;}
    onChange(g=>({...g,teamMembers:result.members}));
    setMembers(result.members);setEditing(false);setError('');setStatus('Team saved. Select a player’s card below to use their role.');
  }
  return <div className="team-setup"><div className="team-setup-heading"><div><h3><Icon name="community" size={18}/>{saved.members?'Your team is ready':'Meet your team of four'}</h3><p>Enter each player’s name and choose one different expert role per person.</p></div>{!editing&&<button className="text-button" onClick={edit}>Edit team</button>}</div>
    {editing&&<form onSubmit={save} className="team-setup-form"><div className="team-player-fields">{members.map((member,i)=><fieldset key={i}><legend>PLAYER 0{i+1}</legend><label htmlFor={`player-name-${i}`}>Name</label><input id={`player-name-${i}`} name={`player-name-${i}`} value={member.name} onChange={e=>update(i,'name',e.target.value)} maxLength={40} required placeholder={`Player ${i+1}’s name`} autoComplete="off"/><label htmlFor={`player-role-${i}`}>Expert role</label><select id={`player-role-${i}`} name={`player-role-${i}`} required value={member.role} onChange={e=>update(i,'role',e.target.value)}><option value="">Choose a role</option>{ROLES.map(role=><option key={role.id} value={role.id} disabled={members.some((m,j)=>j!==i&&m.role===role.id)}>{role.name}{members.some((m,j)=>j!==i&&m.role===role.id)?' (chosen)':''}</option>)}</select></fieldset>)}</div>{error&&<p className="team-setup-error" role="alert">{error}</p>}<div className="team-setup-actions"><span>One housing, food, water, and trade & industry expert.</span><div>{saved.members&&<button type="button" className="secondary" onClick={()=>{setEditing(false);setError('')}}>Cancel</button>}<button type="submit" className="primary">Save team<Icon name="check" size={16}/></button></div></div></form>}
    <p className="team-setup-status" role="status">{status||(!editing?'Names and roles are saved with this city in your browser.':'')}</p>
  </div>;
}
