import React,{useState,useRef,useEffect} from 'react';
import {createPortal} from 'react-dom';
import {ROLES,roleOutcomes,normaliseChat,postTeamMessage,expertName} from './team.js';
import './team-room.css';
import TeamSetup from './TeamSetup.jsx';

export function ExpertOutcomes({city,activeRole='housing',members=[]}){
  return <div className="expert-outcomes"><strong>Expert round results</strong><p>Each expert passes only when all essentials in their expertise are met, including permitted imports.</p>{roleOutcomes(city).map(role=><div className={role.id===activeRole?'your-outcome':''} key={role.id}><span>{expertName(members,role.id)}{expertName(members,role.id)!==role.name?` · ${role.name}`:''}{role.id===activeRole?' (you)':''}<small>{role.resources.map(r=>r.shortfall>0?`${r.label}: ${r.shortfall} short`:`${r.label}: covered`).join(' · ')}</small></span><b className={role.passed?'expert-passed':'expert-failed'}>{role.passed?'Passed':'Failed'}</b></div>)}</div>;
}

export default function TeamRoom({game,city,onChange,Icon,chatTarget}){
  const activeRole=ROLES.some(r=>r.id===game.activeRole)?game.activeRole:'housing';
  const [open,setOpen]=useState(false);
  const [room,setRoom]=useState(activeRole);
  const [drafts,setDrafts]=useState({});
  const scrollRef=useRef(null),composeRef=useRef(null),toggleRef=useRef(null);
  const chat=normaliseChat(game.chat);
  const messages=chat.rooms[room];
  const draftKey=`${activeRole}:${room}`;
  const draft=drafts[draftKey]||'';
  const finished=game.checkpoint||game.complete||game.teacherPause;
  const outcomes=roleOutcomes(city);
  useEffect(()=>{if(open)scrollRef.current?.scrollTo({top:scrollRef.current.scrollHeight});},[open,room,messages.length]);
  const setDraft=value=>setDrafts(d=>({...d,[draftKey]:value}));
  function send(e){
    e.preventDefault();
    if(!draft.trim())return;
    onChange(g=>({...g,chat:postTeamMessage(g.chat,{room,author:activeRole,text:draft,round:g.round,city,members:g.teamMembers})}));
    setDraft('');composeRef.current?.focus();
  }
  function close(){setOpen(false);toggleRef.current?.focus();}
  const chatToggle=<button ref={toggleRef} className="team-chat-toggle" aria-expanded={open} aria-controls="expert-chat-panel" onClick={()=>setOpen(!open)}><span className="chat-launch-icon"><Icon name="chat" size={29}/></span><span className="chat-launch-copy"><strong>{open?'Close Expert Chatroom':'Open Expert Chatroom'}</strong><small>Ask your fellow experts for help</small></span><span className="chat-launch-badge">4 rooms</span><Icon name={open?'close':'arrow'} size={19}/></button>;
  return <section className="team-section" aria-label="Your team of four experts">
    <div className="team-heading"><div><span className="eyebrow">FOUR EXPERTS · ONE SHARED ISLAND</span><h2>{game.round===1?'Your names. Your roles. One team.':'Your team. Working together.'}</h2><p>{game.round===1?'Set up your team, then select a player below to plan and chat as their expert.':'Your Round 1 names and roles carry through every round. Select a player below to plan and chat as their expert.'}</p></div>{chatTarget?createPortal(chatToggle,chatTarget):chatToggle}</div>
    {game.round===1&&<TeamSetup game={game} onChange={onChange} Icon={Icon}/>}
    <div className="expert-role-grid">{outcomes.map(role=><button key={role.id} className={`expert-role-card ${activeRole===role.id?'selected':''}`} aria-pressed={activeRole===role.id} onClick={()=>onChange(g=>({...g,activeRole:role.id}))}><span className={`expert-avatar ${role.id}`}><Icon name={role.icon} size={20}/></span><span className="expert-role-copy"><strong>{expertName(game.teamMembers,role.id)}</strong>{expertName(game.teamMembers,role.id)!==role.name&&<span className="player-role-label">{role.name}</span>}<small>{ROLES.find(r=>r.id===role.id).responsibility}</small><span className={role.passed?'expert-passed':finished?'expert-failed':'expert-at-risk'}>{role.passed?(finished?'Passed':'Target met'):(finished?'Failed':'At risk')}<span className="expert-resource-detail"> · {role.resources.map(r=>`${r.label}: ${r.shortfall>0?`${r.shortfall} short`:'met'}`).join(' · ')}</span></span></span><span className="expert-selected-dot"/></button>)}</div>
    <p className="team-rule">Your expert fails the round if any essential under their expertise remains unmet at the checkpoint. The group continues to reflect and learn together.</p>
    {open&&<aside className="expert-chat-panel" id="expert-chat-panel" aria-label="Expert chatroom"><div className="chat-panel-header"><div><h2><Icon name="chat" size={19}/>Expert chatrooms</h2><p>Local demo · simulated teammate replies</p></div><button className="chat-close" aria-label="Close expert chat" onClick={close}><Icon name="close" size={18}/></button></div>
      <div className="chat-identity"><span>Posting as <strong>{expertName(game.teamMembers,activeRole)} · {ROLES.find(r=>r.id===activeRole).short}</strong></span><span>Round {game.round}</span></div>
      <div className="chat-room-tabs" role="tablist" aria-label="Select expert room">{ROLES.map(role=><button key={role.id} id={`room-tab-${role.id}`} role="tab" aria-selected={room===role.id} aria-controls="expert-room-messages" tabIndex={room===role.id?0:-1} className={room===role.id?'active':''} onClick={()=>setRoom(role.id)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const index=ROLES.findIndex(r=>r.id===room);const next=e.key==='Home'?0:e.key==='End'?3:(index+(e.key==='ArrowRight'?1:3))%4;setRoom(ROLES[next].id);document.getElementById(`room-tab-${ROLES[next].id}`)?.focus();}}}><Icon name={role.icon} size={16}/>{role.short}</button>)}</div>
      <div className="chat-room-description"><strong>{ROLES.find(r=>r.id===room).room}</strong><span>Ask this expert for help, share a shortfall, or suggest a trade-off.</span></div>
      <div className="chat-message-list" ref={scrollRef} role="tabpanel" id="expert-room-messages" aria-labelledby={`room-tab-${room}`} tabIndex={0}><div role="log" aria-live="polite" aria-relevant="additions" aria-label={`${ROLES.find(r=>r.id===room).room} messages`}>{messages.length===0?<div className="chat-empty"><Icon name="chat" size={29}/><strong>Start the conversation.</strong><p>Your message and a mock expert reply will appear here. Each room keeps its own history.</p></div>:messages.map(m=>{const role=ROLES.find(r=>r.id===m.author);return <article key={m.id} className={`chat-message ${m.kind==='student'&&m.author===activeRole?'mine':''}`}><div className="chat-message-meta"><strong>{m.authorName||expertName(game.teamMembers,m.author)}<small className="chat-author-role">{role.short}</small></strong><span>{m.kind==='mock'?'Mock reply':m.author===activeRole?'You':'Local participant'}</span></div><p>{m.text}</p><small>Round {m.round} · {new Date(m.timestamp).toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Singapore'})}</small></article>})}</div></div>
      <form onSubmit={send} className="chat-compose"><div className="chat-suggestions">{['Can you help with my shortfall?','Can we reserve more land?','How can we balance our needs?'].map(text=><button type="button" key={text} onClick={()=>{setDraft(text);composeRef.current?.focus();}}>{text}</button>)}</div><label htmlFor="expert-chat-message">Message the {ROLES.find(r=>r.id===room).short.toLowerCase()} room</label><div className="chat-input-row"><textarea id="expert-chat-message" ref={composeRef} value={draft} onChange={e=>setDraft(e.target.value)} maxLength={500} rows={2} placeholder="Ask a fellow expert for help…" onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();send(e);}}}/><button className="primary" type="submit" disabled={!draft.trim()} aria-label="Send expert message"><Icon name="arrow" size={18}/></button></div><div className="chat-compose-footer"><span>Enter to send · Shift+Enter for a new line</span><span>{draft.length}/500</span></div><p className="chat-local-note">Messages stay in this browser. Teammate replies are scripted for this demo.</p></form>
    </aside>}
  </section>;
}
