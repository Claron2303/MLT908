import React from 'react';
import {RESOURCES,TILES,ROUND_SECONDS} from './game.js';

export function RoundTimer({game,remaining,Icon,onStart,onReflect}){
  if(game.complete)return null;
  const started=game.deadline!==null;
  const expired=started&&remaining===0;
  return <section className={`round-timer ${expired?'expired':remaining<=30?'urgent':''}`} aria-label="Round countdown">
    <div className="timer-symbol"><Icon name="clock" size={23}/></div>
    <div className="timer-copy"><strong>{expired?'Time’s up. Let’s reflect.':game.checkpoint?'Your city is at a checkpoint':started?'Make every plot count.':'Ready to plan your island?'}</strong><p>{game.round===1?'Round one · Local production only · Imports unavailable':`Round ${game.round} · ${game.round===2?'Imports available':game.round===3?'Efficient production unlocked':'Plan for long-term resilience'}`}</p></div>
    <div className="countdown" role="timer" aria-label={`${Math.floor(remaining/60)} minutes ${remaining%60} seconds remaining`}><span>{String(Math.floor(remaining/60)).padStart(2,'0')}:{String(remaining%60).padStart(2,'0')}</span><small>{expired?'building locked':started?'remaining':'planning time'}</small><div className="countdown-track"><i style={{width:`${remaining/ROUND_SECONDS*100}%`}}/></div></div>
    {!started?<button className="primary" onClick={onStart}>Start 10-minute round<Icon name="arrow" size={16}/></button>:game.checkpoint||expired?<button className="primary" onClick={onReflect}>Review & reflect<Icon name="arrow" size={16}/></button>:null}
  </section>;
}

export function EssentialMetrics({s,Icon,onOpen}){
  return <section className="metrics essential-metrics" aria-label="Local essential resource coverage">{RESOURCES.map(({id,label,icon})=><button className={`metric ${id}`} key={id} onClick={onOpen}><span className="metric-icon"><Icon name={icon} size={20}/></span><div><span className="metric-label">{label}</span><div className="metric-value">{s.coverage[id]}<span>%</span><span className="mini-bar"><i style={{width:`${s.coverage[id]}%`}}/></span></div><small>{s.supply[id]} / {s.demand} local units</small></div><Icon name="chevron" size={13}/></button>)}</section>;
}

export function ResourceInsights({game,s,editable,Icon,onImport,onBack}){
  return <section className="insights-page"><div className="insights-back-bar"><button className="primary back-to-map" onClick={onBack}><Icon name="grid" size={20}/>Back to map<Icon name="arrow" size={18}/></button></div><div className="section-heading"><div><div className="eyebrow">THE ESSENTIALS YOUR ISLAND NEEDS</div><h2>One island. Many needs.</h2><p>{game.round===1?'Meet essential needs using only your island’s land and local production.':'Balance local production with imports, housing and commercial services.'}</p></div><div className="score-ring" style={{'--score':`${s.score}%`}}><span>{s.score}<small>local resilience / 100</small></span></div></div>
    {game.round===1&&<div className="imports-locked"><Icon name="lock" size={18}/><span>Imports are unavailable in round one. All essential supply must come from local land use.</span></div>}
    <div className="insights-grid essential-insights">{RESOURCES.map(({id,label,icon,importable})=><div className={`resource-card ${id}`} key={id}><div className="resource-head"><span className="metric-icon"><Icon name={icon}/></span><h3>{label}</h3></div><div className="supply-number">{s.totalCoverage[id]}%<small> of essential demand covered</small></div><div className="resource-bar"><i style={{width:`${s.totalCoverage[id]}%`}}/></div><div className="supply-rows"><span>Required<strong>{s.demand} units</strong></span><span>Locally provided<strong>{s.supply[id]} units</strong></span><span>Imported<strong>{s.imported[id]} units</strong></span><span className={s.unmet[id]>0?'unmet-supply':''}>Unmet demand<strong>{s.unmet[id]} units</strong></span></div>
    {importable?<label className="import-toggle"><span><Icon name={game.round===1?'lock':'globe'} size={16}/>{game.round===1?'Imports unavailable':'Allow imports'}</span><input type="checkbox" aria-label={`Allow ${label.toLowerCase()} imports`} checked={game.round>1&&!!game.imports[id]} disabled={game.round===1||!editable} onChange={e=>onImport(id,e.target.checked)}/></label>:<div className="local-only-note"><Icon name="pin" size={15}/>Provided by local land only</div>}
    <p className="resource-note">{s.unmet[id]===0?'This essential need is covered.':game.round===1?'Local production leaves a shortfall. How will you balance this need with the rest of your island?':!importable?'Reserve enough land for this essential local function.':!editable?'Start or resume the round to adjust your supply plan.':'Add local capacity or allow imports to fill the gap.'}</p></div>)}</div>
    <div className="insights-bottom"><div className="wellbeing"><Icon name="grid" size={30}/><div><h3>{s.plots} / {TILES.length} plots developed</h3><p>One land type per plot. Every choice makes space for one need.</p></div></div><div className="wellbeing"><Icon name="nature" size={30}/><div><h3>{s.liveability}% liveability</h3><p>Shopping centres, sports hubs and nature reserves support wellbeing.</p></div></div></div>
    <div className="insights-back-bar insights-back-bottom"><button className="primary back-to-map" onClick={onBack}><Icon name="grid" size={20}/>Back to map<Icon name="arrow" size={18}/></button></div>
    <div className="model-note"><Icon name="info" size={17}/><p>Illustrative classroom simulation. Each essential requires 600 units in round one, rising by 120 per round. Local resilience averages five local coverage values and liveability. Imports fill shortages but do not raise local resilience. Later rounds improve factory, farm and water output by 50%, then add 10 liveability points. Values are teaching parameters, not Singapore planning data.</p></div>
  </section>;
}

export function LearningDebrief({game,s,remaining,Icon}){
  return <div className="checkpoint-summary"><div className="checkpoint-summary-heading"><Icon name={remaining===0?'clock':'chart'} size={17}/><strong>{remaining===0?'10 minutes completed':'Your city at this checkpoint'}</strong></div><div className="checkpoint-essential-list">{RESOURCES.map(({id,label})=><div key={id}><span>{label}</span><strong className={s.unmet[id]>0?'shortfall':'covered'}>{s.unmet[id]>0?`${s.unmet[id]} units short`:'Covered'}</strong></div>)}</div>{game.round===1&&<p>Your city used local production only. Which needs did you prioritise, and what could your island still not provide?</p>}</div>;
}
